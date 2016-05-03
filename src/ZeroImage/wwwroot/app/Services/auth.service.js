System.register(["angular2/core", "angular2/http", "rxjs/Observable", "./acc.service", "rxjs/add/operator/map", "rxjs/add/operator/catch", "rxjs/add/operator/share"], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, acc_service_1;
    var AuthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (acc_service_1_1) {
                acc_service_1 = acc_service_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {}],
        execute: function() {
            AuthService = (function () {
                function AuthService(http, accService) {
                    var _this = this;
                    this.http = http;
                    this.accService = accService;
                    this.authenticated$ = new Observable_1.Observable(function (observer) {
                        _this.authObserver = observer;
                        _this.http.get("/api/authenticate/loggedon").map(function (res) { return res.json(); }).subscribe(function (res) { return _this.authObserver.next(res.result); }); //get initial auth status
                    }).share();
                }
                AuthService.prototype.signOut = function () {
                    var _this = this;
                    return this.http.get("/api/authenticate/signout").map(function (res) { return res.json(); }).subscribe(function (res) { return _this.authObserver.next(!res.result); });
                };
                AuthService.prototype.authenticate = function (userName, password) {
                    var _this = this;
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    var body = { Name: userName, Identifier: password };
                    return Promise.resolve(this.http.post("/api/authenticate", JSON.stringify(body), { headers: headers }).map(function (res) {
                        var jsonResult = res.json();
                        if (jsonResult.result === true) {
                            _this.accService.setCredentials(userName, password); //set credentials of logged in user
                            _this.accService.loadKeys(jsonResult.keyStore); //load all keys for the user and friends
                            _this.authObserver.next(true); //change observer value to true (authenticated)
                        }
                        return jsonResult;
                    }));
                };
                AuthService.prototype.exists = function (userName) {
                    return Promise.resolve(this.http.get("/api/account/exists/" + userName).map(function (res) { return res.json(); }));
                };
                AuthService.prototype.register = function (userName, password) {
                    // Generate symmetric key
                    var symKey = this.generateSymKey(20);
                    // Generate RSA-key
                    var rsaKey = this.generateRSAKey(symKey, 2048);
                    // Create key store
                    var keyStore = [];
                    // Add sym-key to key store
                    keyStore.push({ ".": symKey });
                    // Encrypt key store
                    var encKeyStore = CryptoJS.AES.encrypt(JSON.stringify(keyStore), userName + password);
                    // Get public key
                    var publicKey = this.getPublicKeyFromRsaKey(rsaKey);
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    var body = { Name: userName, Identifier: password, PublicKey: publicKey, KeyStore: encKeyStore.toString() };
                    return Promise.resolve(this.http.post("/api/account", JSON.stringify(body), { headers: headers }).map(function (res) { return res.json(); }));
                };
                AuthService.prototype.handleError = function (error) {
                    console.error(error.message);
                };
                AuthService.prototype.generateSymKey = function (wordCount) {
                    // Try to use a built-in CSPRNG
                    if (window.crypto && window.crypto.getRandomValues) {
                        var randomWords = new Int32Array(wordCount);
                        window.crypto.getRandomValues(randomWords);
                        var str = "";
                        for (var i = 0; i < randomWords.length; i++) {
                            str += randomWords[i];
                        }
                        return str;
                    }
                    else {
                        window.alert("Window.crypto not supported!");
                    }
                };
                AuthService.prototype.generateRSAKey = function (symKey, bits) {
                    return cryptico.generateRSAKey(symKey, bits);
                };
                AuthService.prototype.getPublicKeyFromRsaKey = function (rsaKey) {
                    return cryptico.publicKeyString(rsaKey);
                };
                AuthService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, acc_service_1.AccountService])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
        }
    }
});
//# sourceMappingURL=auth.service.js.map