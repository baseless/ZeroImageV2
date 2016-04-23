import { Injectable }                   from "angular2/core";
import { Http, Response, Headers }      from "angular2/http"
import { Observable }                   from "rxjs/Observable";
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"

@Injectable()
export class AuthService {

    private authenticated: boolean;

    constructor(private http: Http) { this.authenticated = false; }

    isAuthenticated() {
        return this.authenticated;
    }

    setAuthenticated(auth: boolean) {
        this.authenticated = auth;
    }

    authenticate(userName: string, password: string) {
        return Promise.resolve(this.http.get(`/api/authenticate/${userName}/${password}`)
            .map(res => res.json())
        );
    }

    exists(userName: string) {
        return Promise.resolve(this.http.get(`/api/account/exists/${userName}`)
            .map(res => res.json())
        );
    }

    register(userName: string, password: string) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var body = { name: "TESTNAMN!!" };
        console.log(JSON.stringify(body));
        return Promise.resolve(this.http.post(`/api/account`, JSON.stringify(body), { headers: headers }).map(res => res.json()));
    }

    handleError(error: Response) {
        //error handling
    }
}