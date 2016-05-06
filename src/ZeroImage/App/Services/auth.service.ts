/// <reference path="../Components/Typings/crypto-js.d.ts" />
import { Injectable }                   from "angular2/core";
import { Http, Response, Headers }      from "angular2/http"
import { Observable }                   from "rxjs/Observable";
import { Observer }                     from "rxjs/Observer";
import { AccountService }               from "./acc.service";
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"
import "rxjs/add/operator/share"

declare var cryptico: any;

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
        return Promise.resolve(this.http.post(`/api/authenticate`, JSON.stringify(body), { headers: headers }).map(res => {
            var jsonResult = res.json();
            if (jsonResult.result === true) { //if authentication succeeded
                this.accService.setCredentials(userName, password); //set credentials of logged in user
                this.accService.loadKeys(jsonResult.keyStore); //load all keys for the user and friends
                this.authObserver.next(true); //change observer value to true (authenticated)
                this.accService.handleAnsweredRequests();
            }
            return jsonResult;
        }));
    }

    exists(userName: string) {
        return Promise.resolve(this.http.get(`/api/account/exists/${userName}`).map(res => res.json()));
    }

    register(userName: string, password: string) {    

        // Generate symmetric key
        let symKey = this.generateSymKey(20);

        // Generate RSA-key
        let rsaKey = this.generateRSAKey(symKey, 2048);

        // Create key store
        let keyStore = [];

        // Add sym-key to key store
        keyStore.push({ ".": symKey });

        // Encrypt key store
        let encKeyStore = CryptoJS.AES.encrypt(JSON.stringify(keyStore), userName + password);

        // Get public key
        var publicKey = this.getPublicKeyFromRsaKey(rsaKey);

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let body = { Name: userName, Identifier: password, PublicKey: publicKey, KeyStore: encKeyStore.toString() };

        return Promise.resolve(this.http.post(`/api/account`, JSON.stringify(body), { headers: headers }).map(res => res.json()));
    }

    private handleError(error: any) {
        console.error(error.message);
    }

    private generateSymKey(wordCount) {
        // Try to use a built-in CSPRNG
        if (window.crypto && window.crypto.getRandomValues) {
            let randomWords = new Int32Array(wordCount);
            window.crypto.getRandomValues(randomWords);
            var str = "";
            
            for (var i = 0; i < randomWords.length; i++) {
                str += randomWords[i];
            }
            return str;

        } else {
            window.alert("Window.crypto not supported!");
        }          
    }

    generateRSAKey(symKey, bits) {
        return cryptico.generateRSAKey(symKey, bits);
    }

    getPublicKeyFromRsaKey(rsaKey) {
        return cryptico.publicKeyString(rsaKey);
    }
}