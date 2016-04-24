import { Injectable }                   from "angular2/core";
import { Http, Response, Headers }      from "angular2/http"
import { Observable }                   from "rxjs/Observable";
import { Observer }                     from "rxjs/Observer";
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"
import "rxjs/add/operator/share"

@Injectable()
export class FileService {

    constructor(private http: Http) { }

    upload(fileData: string, name: string) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var body = { FileData: fileData, Name: name };

        return Promise.resolve(this.http.post(`/api/file`, JSON.stringify(body), { headers: headers }).map(res => res.json()));
    }
}