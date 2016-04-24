import { Injectable }                   from "angular2/core";
import { Http, Response, Headers }      from "angular2/http"
import { Observable }                   from "rxjs/Observable";
import { Observer }                     from "rxjs/Observer";
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"
import "rxjs/add/operator/share"

@Injectable()
export class AccountService { //Keeps keys, account maintenance and other stuff

    private keys = new Array(); //The main key store, holds user / friend keys during runtime

    constructor(private http: Http) {
        this.keys["."] = "abc123"; //temporary
    }

    loadKeys() { //load keys at logon
        
    }

    getKey(name: string) { //gets the key for a specific username
        return this.keys[name];
    }

    getMyKey() { //gets the key for a specific username
        return this.keys["."];
    }
}