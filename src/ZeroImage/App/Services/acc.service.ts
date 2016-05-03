/// <reference path="../Components/Typings/crypto-js.d.ts" />
import { Injectable }                   from "angular2/core";
import { Http, Response, Headers }      from "angular2/http"
import { Observable }                   from "rxjs/Observable";
import { Observer }                     from "rxjs/Observer";
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"
import "rxjs/add/operator/share"

@Injectable()
export class AccountService { //Keeps keys, account maintenance and other stuff

    private userName = null;
    private password = null;
    private keys; //The main key store, holds user / friend keys during runtime

    constructor(private http: Http) {
        
    }

    setCredentials(userName, password) {
        this.userName = userName;
        this.password = password;
    }

    loadKeys(keyStore) { //load userName, password, keys at logon

        // Decrypt keystore
        let decKeyStore = CryptoJS.AES.decrypt(keyStore, this.userName + this.password);

        // Decode and convert into proper JSON
        var jsonString = decKeyStore.toString(CryptoJS.enc.Utf8);

        // Remove starting / ending square brackets for proper JSON parsing.
        jsonString = jsonString.substring(1, jsonString.length - 1);

        // Parse into object
        this.keys = JSON.parse(jsonString);

    }

    getKey(name: string) { //gets the key for a specific username
        return this.keys[name];
    }

    getMyKey() { //gets the key for a specific username
        return this.keys["."];
    }
}