System.register(["angular2/core", "angular2/http", "rxjs/Observable", "rxjs/add/operator/map", "rxjs/add/operator/catch", "rxjs/add/operator/share"], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
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
            function (_1) {},
            function (_2) {},
            function (_3) {}],
        execute: function() {
            AuthService = (function () {
                function AuthService(http) {
                    var _this = this;
                    this.http = http;
                    this.auth$ = new Observable_1.Observable(function (observer) {
                        _this.authObserver = observer;
                        _this.authObserver.next(false);
                    }).share();
                }
                AuthService.prototype.authenticate = function (userName, password) {
                    var _this = this;
                    return Promise.resolve(this.http.get("/api/authenticate/" + userName + "/" + password)
                        .map(function (res) {
                        var resJson = res.json();
                        if (resJson.result === true) {
                            _this.authObserver.next(true);
                        }
                        return resJson;
                    }));
                };
                AuthService.prototype.exists = function (userName) {
                    return Promise.resolve(this.http.get("/api/account/exists/" + userName)
                        .map(function (res) { return res.json(); }));
                };
                AuthService.prototype.register = function (userName, password) {
                    var headers = new http_1.Headers();
                    headers.append("Content-Type", "application/json");
                    var body = { Name: userName, Identifier: password };
                    console.log(JSON.stringify(body));
                    return Promise.resolve(this.http.post("/api/account", JSON.stringify(body), { headers: headers }).map(function (res) { return res.json(); }));
                };
                AuthService.prototype.handleError = function (error) {
                    //error handling
                };
                AuthService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
        }
    }
});
//# sourceMappingURL=auth.service.js.map