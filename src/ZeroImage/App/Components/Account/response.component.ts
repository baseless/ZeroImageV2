import { Component, OnInit }                            from "angular2/core";
import { ROUTER_DIRECTIVES, Router }                    from "angular2/router";
import { ControlGroup, FormBuilder, Validators }        from "angular2/common";
import { AppValidators }                                from "../../app-validators";
import { AccountService }                                  from "../../Services/acc.service";

@Component({
    selector: "friend-response",
    templateUrl: "app/components/account/response.component.html",
    directives: [ROUTER_DIRECTIVES]
})

export class ResponseComponent implements OnInit {
    requestForm: ControlGroup;
    processing = false;
    errorMessage = null;

    private requests: JSON[];

    constructor(private fb: FormBuilder, private accService: AccountService, private router: Router) { this.requests = new Array(); }

    ngOnInit() {
        this.loadRequests();
        this.requestForm = this.fb.group({
        });
    }

    loadRequests() {
        this.accService.getFriendRequests().then(res => res.subscribe(data => {
            console.log("Received: " + JSON.stringify(data));
            for (let i = 0; i < data.length; i++) {
                this.requests.push(data[i]);
            }
        }));
    }
}