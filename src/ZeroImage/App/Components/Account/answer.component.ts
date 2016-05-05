import { Component, OnInit }                            from "angular2/core";
import { ROUTER_DIRECTIVES, Router, RouteParams }                    from "angular2/router";
import { ControlGroup, FormBuilder, Validators }        from "angular2/common";
import { AppValidators }                                from "../../app-validators";
import { AccountService }                                  from "../../Services/acc.service";

@Component({
    selector: "friend-answer",
    templateUrl: "app/components/account/answer.component.html",
    directives: [ROUTER_DIRECTIVES]
})

export class AnswerComponent implements OnInit {
    answerForm: ControlGroup;
    processing = false;
    errorMessage = null;

    private request: JSON;
    private payload = "";
    private id: string;

    constructor(private fb: FormBuilder, private accService: AccountService, private router: Router, private routeParams: RouteParams) { this.request = JSON.parse("{}"); }

    ngOnInit() {
        this.id = this.routeParams.get("id");
        this.getRequest();

        this.answerForm = this.fb.group({
            answer: ['', Validators.compose([Validators.required])]
        });
    }

    getRequest() {
        this.accService.getSingleRequest(this.id).then(res => res.subscribe(data => {
            console.log(JSON.stringify(data));
            if (data.length === 0) {
                this.errorMessage = "Request not found";
            } else {
                this.request = data;
                this.payload = data.Payload;
            }
        }));
    }

    doAnswer() {
        this.processing = true;
        this.accService.answerFriendRequest(this.answerForm.value.answer, this.payload, result => {
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
    }


}