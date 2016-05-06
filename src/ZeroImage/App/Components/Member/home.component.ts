import { Component, OnInit }                            from "angular2/core";
import { ROUTER_DIRECTIVES }                            from "angular2/router";
import { Router, RouteParams }                          from "angular2/router";
import { AccountService }                               from "../../Services/acc.service";

@Component({
    selector: "home",
    templateUrl: "app/components/member/home.component.html",
    directives: [ROUTER_DIRECTIVES]
})
export class HomeComponent {
    private friends = new Array();
    private userName: string;
    constructor(private accService: AccountService) { }

    ngOnInit() {
        this.userName = this.accService.getUserName();
        this.friends = this.accService.getFriends();
    }
}