System.register(["angular2/core", "angular2/router", "angular2/common", "../../Services/acc.service"], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, acc_service_1;
    var ResponseComponent;
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
            function (acc_service_1_1) {
                acc_service_1 = acc_service_1_1;
            }],
        execute: function() {
            ResponseComponent = (function () {
                function ResponseComponent(fb, accService, router) {
                    this.fb = fb;
                    this.accService = accService;
                    this.router = router;
                    this.processing = false;
                    this.errorMessage = null;
                    this.requests = new Array();
                }
                ResponseComponent.prototype.ngOnInit = function () {
                    this.loadRequests();
                    this.requestForm = this.fb.group({});
                };
                ResponseComponent.prototype.loadRequests = function () {
                    var _this = this;
                    this.accService.getFriendRequests().then(function (res) { return res.subscribe(function (data) {
                        console.log("Received: " + JSON.stringify(data));
                        for (var i = 0; i < data.length; i++) {
                            _this.requests.push(data[i]);
                        }
                    }); });
                };
                ResponseComponent = __decorate([
                    core_1.Component({
                        selector: "friend-response",
                        templateUrl: "app/components/account/response.component.html",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, acc_service_1.AccountService, router_1.Router])
                ], ResponseComponent);
                return ResponseComponent;
            }());
            exports_1("ResponseComponent", ResponseComponent);
        }
    }
});
//# sourceMappingURL=response.component.js.map