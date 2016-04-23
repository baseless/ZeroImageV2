import { Injectable }                   from "angular2/core";
import { Http, Response, Headers }      from "angular2/http"
import { Observable }                   from "rxjs/Observable";
import { Observer }                     from "rxjs/Observer";
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"
import "rxjs/add/operator/share"

@Injectable()
export class AuthService {
    auth$: Observable<boolean>;
    private authObserver: Observer<boolean>;

    constructor(private http: Http) {
        this.auth$ = new Observable(observer => { this.authObserver = observer; this.authObserver.next(false); }).share();
    }

    authenticate(userName: string, password: string) {
        return Promise.resolve(this.http.get(`/api/authenticate/${userName}/${password}`)
            .map(res => {
                let resJson = res.json();
                if (resJson.result === true) {
                    this.authObserver.next(true);
                }
                return resJson;
            })
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
        var body = { Name: userName, Identifier: password };
        console.log(JSON.stringify(body));
        return Promise.resolve(this.http.post(`/api/account`, JSON.stringify(body), { headers: headers }).map(res => res.json()));
    }

    handleError(error: Response) {
        //error handling
    }
}