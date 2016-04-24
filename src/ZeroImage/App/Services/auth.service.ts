import { Injectable }                   from "angular2/core";
import { Http, Response, Headers }      from "angular2/http"
import { Observable }                   from "rxjs/Observable";
import { Observer }                     from "rxjs/Observer";
import { AccountService }               from "./acc.service";
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"
import "rxjs/add/operator/share"

@Injectable()
export class AuthService {
    authenticated$: Observable<boolean>; //observable used to control auth state (for example which menu buttons to show)
    private authObserver: Observer<boolean>;

    constructor(private http: Http, private accService: AccountService) {
        this.authenticated$ = new Observable(observer => { //initializes the observable and sets the observer
            this.authObserver = observer;
            this.http.get("/api/authenticate/loggedon").map(res => res.json()).subscribe(res => this.authObserver.next(res.result)); //get initial auth status
        }).share();
    }

    signOut() {
        return this.http.get("/api/authenticate/signout").map(res => res.json()).subscribe(res => this.authObserver.next(!res.result));
    }

    authenticate(userName: string, password: string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let body = { Name: userName, Identifier: password };
        console.log(JSON.stringify(body));
        return Promise.resolve(this.http.post(`/api/authenticate`, JSON.stringify(body), { headers: headers }).map(res => {
            var jsonResult = res.json();
            if (jsonResult.result === true) { //if authentication succeeded
                this.accService.loadKeys(); //load all keys for the user and friends
                this.authObserver.next(true); //change observer value to true (authenticated)
            }
            return jsonResult;
        }));
    }

    exists(userName: string) {
        return Promise.resolve(this.http.get(`/api/account/exists/${userName}`).map(res => res.json()));
    }

    register(userName: string, password: string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let body = { Name: userName, Identifier: password };
        return Promise.resolve(this.http.post(`/api/account`, JSON.stringify(body), { headers: headers }).map(res => res.json()));
    }

    private handleError(error: any) {
        console.error(error.message);
    }
}