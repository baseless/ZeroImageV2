import { Component, OnInit }                            from "angular2/core";
import { ROUTER_DIRECTIVES, Router }                    from "angular2/router";
import { ControlGroup, FormBuilder, Validators }        from "angular2/common";
import { AppValidators }                                from "../../app-validators";
import { AccountService }                                  from "../../Services/acc.service";

@Component({
    selector: "friend-request",
    templateUrl: "app/components/account/request.component.html",
    directives: [ROUTER_DIRECTIVES]
})

export class RequestComponent implements OnInit {
    requestForm: ControlGroup;
    processing = false;
    errorMessage = null;
    successMessage = null;


    constructor(private fb: FormBuilder, private accService: AccountService, private router: Router) { }

    ngOnInit() {
        this.createForm();
    }

    doRequest() {
        this.errorMessage = null;
        this.successMessage = null;
        this.processing = true;
        if (this.requestForm.valid) {
            console.log("form was valid!");
            this.accService.sendNewFriendRequest(this.requestForm.value.userName, this.requestForm.value.question, this.requestForm.value.answer,
                result => {
                    this.processing = false;
                    if (result.length === 0) {
                        this.router.navigate(["Response"]);
                        this.successMessage = `Request sent to ${this.requestForm.value.userName}!`;
                    } else {
                        this.errorMessage = "Request failed";
                    }
                });
        } else {
            this.errorMessage = "Request failed";
            this.processing = false;
        }
    }

    createForm() {
        this.requestForm = this.fb.group({
            userName: ['', Validators.compose([Validators.required])],
            question: ['', Validators.compose([Validators.required])],
            answer: ['', Validators.compose([Validators.required])]
        });
    }

}