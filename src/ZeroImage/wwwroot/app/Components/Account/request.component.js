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
    var RequestComponent;
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
            RequestComponent = (function () {
                function RequestComponent(fb, accService, router) {
                    this.fb = fb;
                    this.accService = accService;
                    this.router = router;
                    this.processing = false;
                    this.errorMessage = null;
                }
                RequestComponent.prototype.ngOnInit = function () {
                    this.requestForm = this.fb.group({
                        userName: ['', common_1.Validators.compose([common_1.Validators.required])],
                        question: ['', common_1.Validators.compose([common_1.Validators.required])],
                        answer: ['', common_1.Validators.compose([common_1.Validators.required])]
                    });
                };
                RequestComponent.prototype.doRequest = function () {
                    var _this = this;
                    this.processing = true;
                    if (this.requestForm.valid) {
                        this.accService.sendNewFriendRequest(this.requestForm.value.userName, this.requestForm.value.question, this.requestForm.value.answer, function (result) {
                            alert(result);
                            _this.processing = false;
                        });
                    }
                    else {
                        this.errorMessage = "Request failed";
                        this.processing = false;
                    }
                };
                RequestComponent = __decorate([
                    core_1.Component({
                        selector: "friend-request",
                        templateUrl: "app/components/account/request.component.html",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, acc_service_1.AccountService, router_1.Router])
                ], RequestComponent);
                return RequestComponent;
            }());
            exports_1("RequestComponent", RequestComponent);
        }
    }
});
//# sourceMappingURL=request.component.js.map