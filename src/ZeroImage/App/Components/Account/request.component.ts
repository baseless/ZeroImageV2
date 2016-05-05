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



    constructor(private fb: FormBuilder, private accService: AccountService, private router: Router) { }

    ngOnInit() {

        this.requestForm = this.fb.group({
            userName: ['', Validators.compose([Validators.required])],
            question: ['', Validators.compose([Validators.required])],
            answer: ['', Validators.compose([Validators.required])]
        });
    }

    doRequest() {
        this.processing = true;
        if (this.requestForm.valid) {
            this.accService.sendNewFriendRequest(this.requestForm.value.userName, this.requestForm.value.question, this.requestForm.value.answer,
                result => {
                    alert(result);
                    this.processing = false;
                });
        } else {
            this.errorMessage = "Request failed";
            this.processing = false;
        }
    }


}