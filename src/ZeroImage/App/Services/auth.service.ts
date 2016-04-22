import { Injectable }       from "angular2/core";
import {Http, Response}     from "angular2/http"
import { Observable }       from "rxjs/Observable";
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"

@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    authenticate() {
        
    }

    exists(userName: string) {
        return Promise.resolve(this.http.get(`/api/account/exists/${userName}`)
            .map(res => res.json())
        );
    }

    handleError(error: Response) {
        //error handling
    }
}