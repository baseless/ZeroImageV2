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

    private payload = "";
    private requester = "";
    private requesterPublicKey = "";
    private question = "";
    private id: string;

    constructor(private fb: FormBuilder, private accService: AccountService, private router: Router, private routeParams: RouteParams) { }

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
                this.requester = data.UserName;
                this.payload = data.Payload;
                this.question = data.Question;
                this.requesterPublicKey = data.PublicKey;
            }
        }));
    }

    doAnswer() {
        this.processing = true;
        this.accService.answerFriendRequest(this.answerForm.value.answer, this.payload, this.requester, this.requesterPublicKey, this.id, result => {
            alert(result);
            this.processing = false;
        });
    }


}