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

    getUserName() {
        return this.userName;
    }

    getFriends() {
        const friends = new Array();
        for (let name in this.keys) {
            if(name !== ".") {
                friends.push(name);
            }
        }
        return friends;
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
        console.log("Jsonifying keystore: " + jsonString);
        if (jsonString[0] === "[") {
            // Remove starting / ending square brackets for proper JSON parsing.
            jsonString = jsonString.substring(1, jsonString.length - 1);
        }
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

                    //todo: ENCRYPT HERE USING TARGETUSERS RSA PUBLIC KEY
                    var payloadEncWithPk = cryptico.encrypt(payload.toString(), publicKey);

                    console.log("The sym key sent is: " + this.getMyKey());
                    console.log("Cryptico trying to encrypt : " + payload + " : PublicKey = " + publicKey);
                    console.log("Cryptico result is: " + payloadEncWithPk.cipher);


                    let requestBody = { UserName: userName, Question: question, Payload: payloadEncWithPk.cipher };

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

    handleAnsweredRequests() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let requestIds = new Array();
        //1: Load answered requests
        Promise.resolve(this.http.get(`/api/request/answered`, { headers: headers }).map(res => res.json()))
            .then(res => res.subscribe(data => {
                //2: Add keys to keystore
                for (let i = 0; i < data.length; i++) {

                    //todo: DECRYPT PAYLOAD HERE WITH RSA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    let rsa = this.generateUserRSAKey();
                    var decryptResult = cryptico.decrypt(data[i].Payload, rsa);
                    this.keys[data[i].UserName] = decryptResult.plaintext;
                    requestIds.push(data[i].RequestId);
                }
                //3: Encrypt and upload keystore. include all request that was completed
                if (requestIds.length > 0) {
                    const encKeyStore = CryptoJS.AES.encrypt(JSON.stringify(this.keys), this.userName + this.password).toString();
                    var body = { KeyStore: encKeyStore.toString(), RequestIds: requestIds };

                    Promise.resolve(this.http.post(`/api/request/finalize`, JSON.stringify(body), { headers: headers })
                            .map(res => res.json()))
                        .then(resp => resp.subscribe(data => {
                                console.log(`response to finalizing answered requests: ${JSON.stringify(data)}`);
                            },
                            error => { console.log(error); }));
                }
            }, error => { console.log(error); }));

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

    answerFriendRequest(answer: string, payload: string, originUser: string, originPublicKey: string, requestId: string, callback) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        //console.log("answering for " + answer + ", payload: " + payload);

        //S0: generate RSA instance (incl the private key)
        let rsa = this.generateUserRSAKey();

        //S1: Decrypt payload using answer (should contain the requesting users symmetric key!)
        //todo: DECRYPT USING RSA HERE USING YOUR OWN PRIVATE KEY
        var decryptResult = cryptico.decrypt(payload, rsa);
        console.log("Cryptico trying to decrypt message : " + payload + " : Result is : " + decryptResult.plaintext);
        const symKey = CryptoJS.AES.decrypt(decryptResult.plaintext, answer).toString(CryptoJS.enc.Utf8);
        console.log(`Decrypted key: ${symKey}`);


        //S2: Add the payload key to keychain and encrypt / prepare keychain for upload
        this.keys[originUser] = symKey;
        const encKeyStore = CryptoJS.AES.encrypt(JSON.stringify(this.keys), this.userName + this.password).toString();

        //S3: Create a new payload with own symmtric key and encrypt using public key of requester
        //todo: ENCRYPT USING RSA HERE WITH TARGETUSERS PUBLIC KEY
        let newPayloadEncWithPk = cryptico.encrypt(this.getMyKey(), originPublicKey);

        //S4: send the new payload to the server
        const body = { KeyStore: encKeyStore.toString(), RequestId: requestId, Payload: newPayloadEncWithPk.cipher };
        Promise.resolve(this.http.post(`/api/request/answer`, JSON.stringify(body), { headers: headers }).map(res => res.json()))
            .then(resp => resp.subscribe(data => {
                callback(data);
            }, error => { console.log(error); }));
    }
}