System.register(["angular2/core", "angular2/http", "rxjs/add/operator/map", "rxjs/add/operator/catch", "rxjs/add/operator/share"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var AccountService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {}],
        execute: function() {
            AccountService = (function () {
                function AccountService(http) {
                    this.http = http;
                    this.userName = null;
                    this.password = null;
                }
                AccountService.prototype.generateUserRSAKey = function () {
                    return cryptico.generateRSAKey(this.getMyKey(), 2048);
                };
                AccountService.prototype.setCredentials = function (userName, password) {
                    this.userName = userName;
                    this.password = password;
                };
                AccountService.prototype.loadKeys = function (keyStore) {
                    // Decrypt keystore
                    var decKeyStore = CryptoJS.AES.decrypt(keyStore, this.userName + this.password);
                    // Decode and convert into proper JSON
                    var jsonString = decKeyStore.toString(CryptoJS.enc.Utf8);
                    console.log("Jsonifying keystore: " + jsonString);
                    if (jsonString[0] === "[") {
                        // Remove starting / ending square brackets for proper JSON parsing.
                        jsonString = jsonString.substring(1, jsonString.length - 1);
                    }
                    // Parse into object
                    this.keys = JSON.parse(jsonString);
                    console.log("Authed which symkey: " + this.getMyKey());
                };
                AccountService.prototype.getKey = function (name) {
                    return this.keys[name];
                };
                AccountService.prototype.getMyKey = function () {
                    return this.keys["."];
                };
                // FRIEND REQUEST METHODS
                AccountService.prototype.sendNewFriendRequest = function (userName, question, answer, callback) {
                    var _this = this;
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    Promise.resolve(this.http.get("/api/account/key/" + userName, { headers: headers }).map(function (res) { return res.json(); }))
                        .then(function (res) { return res.subscribe(function (data) {
                        var publicKey = data.key;
                        if (publicKey.length > 0) {
                            var payload = CryptoJS.AES.encrypt(_this.getMyKey(), answer); //Step1: encrypt using answer
                            //todo: ENCRYPT HERE USING TARGETUSERS RSA PUBLIC KEY
                            var requestBody = { UserName: userName, Question: question, Payload: payload.toString() };
                            console.log(JSON.stringify(requestBody));
                            Promise.resolve(_this.http.post("/api/request/new", JSON.stringify(requestBody), { headers: headers }).map(function (innerRes) { return innerRes.json(); })).then(function (res) { return res.subscribe(function (data) {
                                callback(data.result);
                            }, function (error) { console.log(error); }); });
                        }
                        else {
                            callback("could not locate user!");
                        }
                    }, function (error) { console.log(error); }); });
                };
                AccountService.prototype.handleAnsweredRequests = function () {
                    var _this = this;
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    var requestIds = new Array();
                    //1: Load answered requests
                    Promise.resolve(this.http.get("/api/request/answered", { headers: headers }).map(function (res) { return res.json(); }))
                        .then(function (res) { return res.subscribe(function (data) {
                        //2: Add keys to keystore
                        for (var i = 0; i < data.length; i++) {
                            //todo: DECRYPT PAYLOAD HERE WITH RSA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            _this.keys[data[i].UserName] = data[i].Payload;
                            requestIds.push(data[i].RequestId);
                        }
                        //3: Encrypt and upload keystore. include all request that was completed
                        if (requestIds.length > 0) {
                            var encKeyStore = CryptoJS.AES.encrypt(JSON.stringify(_this.keys), _this.userName + _this.password).toString();
                            var body = { KeyStore: encKeyStore.toString(), RequestIds: requestIds };
                            Promise.resolve(_this.http.post("/api/request/finalize", JSON.stringify(body), { headers: headers })
                                .map(function (res) { return res.json(); }))
                                .then(function (resp) { return resp.subscribe(function (data) {
                                console.log("response to finalizing answered requests: " + JSON.stringify(data));
                            }, function (error) { console.log(error); }); });
                        }
                    }, function (error) { console.log(error); }); });
                };
                AccountService.prototype.getFriendRequests = function () {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    return Promise.resolve(this.http.get("/api/request/incoming", { headers: headers }).map(function (res) { return res.json(); }));
                };
                AccountService.prototype.getSingleRequest = function (id) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    return Promise.resolve(this.http.get("/api/request/single/" + id, { headers: headers }).map(function (res) { return res.json(); }));
                };
                AccountService.prototype.answerFriendRequest = function (answer, payload, originUser, originPublicKey, requestId, callback) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    //console.log("answering for " + answer + ", payload: " + payload);
                    //S0: generate RSA instance (incl the private key)
                    var rsa = this.generateUserRSAKey();
                    //S1: Decrypt payload using answer (should contain the requesting users symmetric key!)
                    //todo: DECRYPT USING RSA HERE USING YOUR OWN PRIVATE KEY
                    var symKey = CryptoJS.AES.decrypt(payload, answer).toString(CryptoJS.enc.Utf8);
                    //console.log(`Decrypted key: ${symKey}`);
                    //S2: Add the payload key to keychain and encrypt / prepare keychain for upload
                    this.keys[originUser] = symKey;
                    //console.log("Encrypting keystore: " + JSON.stringify(this.keys));
                    var encKeyStore = CryptoJS.AES.encrypt(JSON.stringify(this.keys), this.userName + this.password).toString();
                    //S3: Create a new payload with own symmtric key and encrypt using public key of requester
                    //todo: ENCRYPT USING RSA HERE WITH TARGETUSERS PUBLIC KEY
                    var newPayload = this.getMyKey(); //TEMP, SKA KRYPTERAS FÖRST
                    //S4: send the new payload to the server
                    var body = { KeyStore: encKeyStore.toString(), RequestId: requestId, Payload: newPayload };
                    Promise.resolve(this.http.post("/api/request/answer", JSON.stringify(body), { headers: headers }).map(function (res) { return res.json(); }))
                        .then(function (resp) { return resp.subscribe(function (data) {
                        callback(data);
                    }, function (error) { console.log(error); }); });
                };
                AccountService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AccountService);
                return AccountService;
            }());
            exports_1("AccountService", AccountService);
        }
    }
});
//# sourceMappingURL=acc.service.js.map