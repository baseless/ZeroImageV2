/// <reference path="../Components/Typings/crypto-js.d.ts" />
import { Injectable }                   from "angular2/core";
import { Http, Response, Headers }      from "angular2/http"
import { Observable }                   from "rxjs/Observable";
import { Observer }                     from "rxjs/Observer";
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"
import "rxjs/add/operator/share"
declare var cryptico: any;

@Injectable()
export class AccountService { //Keeps keys, account maintenance and other stuff

    private userName = null;
    private password = null;
    private keys; //The main key store, holds user / friend keys during runtime

    constructor(private http: Http) {
        
    }

    generateUserRSAKey() {
        return cryptico.generateRSAKey(this.getMyKey(), 2048);
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

        console.log(`Authed which symkey: ${this.getMyKey()}`);
    }

    getKey(name: string) { //gets the key for a specific username
        return this.keys[name];
    }

    getMyKey() { //gets the key for a specific username
        return this.keys["."];
    }

    // FRIEND REQUEST METHODS

    sendNewFriendRequest(userName: string, question: string, answer: string, callback) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        Promise.resolve(this.http.get(`/api/account/key/${userName}`, { headers: headers }).map(res => res.json()))
            .then(res => res.subscribe(data => {
                var publicKey = data.key;
                if (publicKey.length > 0) { //Send request

                    let payload = CryptoJS.AES.encrypt(this.getMyKey(), answer); //Step1: encrypt using answer
                    //payload = cryptico.encrypt(payload, publicKey).cipher; //Step 2: encrypt using targets RSA public key
                    let requestBody = { UserName: userName, Question: question, Payload: payload.toString() };

                    console.log(JSON.stringify(requestBody));
                    Promise.resolve(this.http.post(`/api/request/new`, JSON.stringify(requestBody), { headers: headers }).map(innerRes => innerRes.json())).then(res => res.subscribe(data => {
                        callback(data.result);
                    }, error => { console.log(error); }));

                } else {
                    callback("could not locate user!");
                }
            },
            error => { console.log(error); }
            ));
    }

    getFriendRequests() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return Promise.resolve(this.http.get(`/api/request/incoming`, { headers: headers }).map(res => res.json()));
    }
    getSingleRequest(id: string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return Promise.resolve(this.http.get(`/api/request/single/${id}`, { headers: headers }).map(res => res.json()));
    }

    answerFriendRequest(answer: string, payload: string, callback) {
        console.log("answering for " + answer + ", payload: " + payload);

        //S0: generate RSA instance (incl the private key)
        let rsa = this.generateUserRSAKey();

        //S1: Decrypt payload using answer (should contain the requesting users symmetric key!)
        //console.log("Decrypting using my symkey: " + this.getMyKey());
        //let rsaDecrypted = rsa.decrypt(payload, this.getMyKey());
        //console.log("RSA decryption status: " + rsaDecrypted.status);
        let symKey = CryptoJS.AES.decrypt(payload, answer).toString(CryptoJS.enc.Utf8);
        console.log(`Decrypted key: ${symKey}`);

        //S2: Add the payload key to keychain and upload it

        //S3: Create a new payload with own symmtric key and encrypt using public key of requester

        //S4: send the new payload to the server

        return "";
    }
}