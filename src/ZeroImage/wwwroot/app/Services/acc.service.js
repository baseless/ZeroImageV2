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
                AccountService.prototype.setCredentials = function (userName, password) {
                    this.userName = userName;
                    this.password = password;
                };
                AccountService.prototype.loadKeys = function (keyStore) {
                    // Decrypt keystore
                    var decKeyStore = CryptoJS.AES.decrypt(keyStore, this.userName + this.password);
                    // Decode and convert into proper JSON
                    var jsonString = decKeyStore.toString(CryptoJS.enc.Utf8);
                    // Remove starting / ending square brackets for proper JSON parsing.
                    jsonString = jsonString.substring(1, jsonString.length - 1);
                    // Parse into object
                    this.keys = JSON.parse(jsonString);
                };
                AccountService.prototype.getKey = function (name) {
                    return this.keys[name];
                };
                AccountService.prototype.getMyKey = function () {
                    return this.keys["."];
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