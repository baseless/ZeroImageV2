System.register(["angular2/core", "angular2/router", "angular2/common", "../../Services/auth.service"], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, auth_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(fb, authService) {
                    this.fb = fb;
                    this.authService = authService;
                    this.processing = false;
                    this.errorMessage = null;
                }
                LoginComponent.prototype.ngOnInit = function () {
                    this.loginForm = this.fb.group({
                        userName: ['', common_1.Validators.compose([common_1.Validators.required])],
                        password: ['', common_1.Validators.compose([common_1.Validators.required])]
                    });
                };
                LoginComponent.prototype.doLogin = function () {
                    var _this = this;
                    this.processing = true;
                    var status = false;
                    if (this.loginForm.valid) {
                        this.authService.exists(this.loginForm.value.userName)
                            .then(function (result) { return result.subscribe(function (data) {
                            if (!data.result) {
                                _this.errorMessage = "Login failed";
                            }
                            else {
                                _this.errorMessage = "Login succeeded";
                            }
                            console.log("[AuthService.exists] response for '" + _this.loginForm.value.userName + "': " + JSON.stringify(data));
                            _this.processing = false;
                        }, function (error) {
                            console.log(error);
                            _this.processing = false;
                        }, function () { }); });
                    }
                    else {
                        this.errorMessage = "Login failed";
                        this.processing = false;
                    }
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: "login",
                        templateUrl: "app/components/account/login.component.html",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, auth_service_1.AuthService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map