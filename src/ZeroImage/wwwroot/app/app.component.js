System.register(["angular2/core", "angular2/http", "./Components/Account/login.component", "./Components/Account/register.component", "./Components/Status/not-found.component", "./Components/Member/home.component", "angular2/router", "./Services/auth.service"], function(exports_1, context_1) {
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
    var core_1, http_1, login_component_1, register_component_1, not_found_component_1, home_component_1, router_1, auth_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (register_component_1_1) {
                register_component_1 = register_component_1_1;
            },
            function (not_found_component_1_1) {
                not_found_component_1 = not_found_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router) {
                    this.router = router;
                }
                AppComponent.prototype.isRouteActive = function (route) {
                    return this.router.isRouteActive(this.router.generate(route));
                };
                AppComponent = __decorate([
                    router_1.RouteConfig([
                        { path: "/", name: "Login", component: login_component_1.LoginComponent, useAsDefault: true },
                        { path: "/register", name: "Register", component: register_component_1.RegisterComponent },
                        { path: "/home", name: "Home", component: home_component_1.HomeComponent },
                        { path: "/**", name: "NotFound", component: not_found_component_1.NotFoundComponent }
                    ]),
                    core_1.Component({
                        selector: "zero-image",
                        templateUrl: "app/app.component.html",
                        directives: [router_1.ROUTER_DIRECTIVES, register_component_1.RegisterComponent, login_component_1.LoginComponent, not_found_component_1.NotFoundComponent],
                        providers: [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, auth_service_1.AuthService, core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map