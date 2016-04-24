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

    getGallery(name: string) {
        var url = `/api/file`;
        if (name !== ".") {
            url = url + `/${name}`;
        }
        return Promise.resolve(this.http.get(url).map(res => res.json()));
    }

    upload(fileData: string, meta: string) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var body = { FileData: fileData, Meta: meta, FileName: this.generateUUID() };

        return Promise.resolve(this.http.post(`/api/file`, JSON.stringify(body), { headers: headers }).map(res => res.json()));
    }

    private generateUUID() { //Borrowed from: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}