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
    var AnswerComponent;
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
            AnswerComponent = (function () {
                function AnswerComponent(fb, accService, router, routeParams) {
                    this.fb = fb;
                    this.accService = accService;
                    this.router = router;
                    this.routeParams = routeParams;
                    this.processing = false;
                    this.errorMessage = null;
                    this.payload = "";
                    this.request = JSON.parse("{}");
                }
                AnswerComponent.prototype.ngOnInit = function () {
                    this.id = this.routeParams.get("id");
                    this.getRequest();
                    this.answerForm = this.fb.group({
                        answer: ['', common_1.Validators.compose([common_1.Validators.required])]
                    });
                };
                AnswerComponent.prototype.getRequest = function () {
                    var _this = this;
                    this.accService.getSingleRequest(this.id).then(function (res) { return res.subscribe(function (data) {
                        console.log(JSON.stringify(data));
                        if (data.length === 0) {
                            _this.errorMessage = "Request not found";
                        }
                        else {
                            _this.request = data;
                            _this.payload = data.Payload;
                        }
                    }); });
                };
                AnswerComponent.prototype.doAnswer = function () {
                    this.processing = true;
                    this.accService.answerFriendRequest(this.answerForm.value.answer, this.payload, function (result) {
                        alert(result);
                    });
                    //S0: generate RSA instance (incl the private key)
                    //S1: Decrypt payload using answer
                    //S2: Add the payload key to keychain and upload it
                    //S3: Create a new payload with own symmtric key and encrypt using public key of requester
                    //S4: send the new payload to the server
                    /*
                    if (this.requestForm.valid) {
                        this.accService.sendNewFriendRequest(this.requestForm.value.userName, this.requestForm.value.question, this.requestForm.value.answer,
                            result => {
                                alert(result);
                                this.processing = false;
                            });
                    } else {
                        this.errorMessage = "Request failed";
                        this.processing = false;
                    } */
                };
                AnswerComponent = __decorate([
                    core_1.Component({
                        selector: "friend-answer",
                        templateUrl: "app/components/account/answer.component.html",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, acc_service_1.AccountService, router_1.Router, router_1.RouteParams])
                ], AnswerComponent);
                return AnswerComponent;
            }());
            exports_1("AnswerComponent", AnswerComponent);
        }
    }
});
//# sourceMappingURL=answer.component.js.map