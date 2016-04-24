/// <reference path="crypto-js.d.ts" />
import { Component, OnInit }                            from "angular2/core";
import { ROUTER_DIRECTIVES }                            from "angular2/router";
import { ControlGroup, FormBuilder, Validators }        from "angular2/common";
import { Router, RouteParams }                          from "angular2/router";
import { AccountService }                               from "../../Services/acc.service";
import { FileService }                                  from "../../Services/file.service";

@Component({
    selector: "gallery",
    templateUrl: "app/components/member/gallery.component.html",
    directives: [ROUTER_DIRECTIVES]
})
export class GalleryComponent {

    private path: string;
    private items: GalleryItem[];
    private key: string;

    constructor(private fb: FormBuilder,
        private router: Router,
        private accService: AccountService,
        private fileService: FileService,
        private routeParams: RouteParams) {
        this.items = new Array();
    }

    ngOnInit() {
        let name = this.routeParams.get("name");
        if (name === ".") {
            this.key = this.accService.getMyKey();
        } else { //try get key for another user
            this.key = this.accService.getKey(name);
        }

        if (this.key == null || this.key.length === 0) {
            console.log(`Unable to locate valid key for user: ${name}`);
            return;
        }
        this.loadGallery(name);
    }

    private loadGallery(name: string) {
        this.fileService.getGallery(name)
            .then(result => result.subscribe(response => {
                this.path = response.Path;
                console.log(`GetGallery response data: ${JSON.stringify(response)}`);
                if (response.FileNames.length > 0) {
                    this.loadGalleryItems(response.FileNames);
                }
            }));
    }

    private loadGalleryItems(names: string[]) {
        const name = names.shift();
        const item = new GalleryItem();
        this.getData(this.path + "/" + name + ".meta.txt", "plain/text", res => { //get meta
            item.meta = JSON.parse(CryptoJS.AES.decrypt(res, this.key).toString(CryptoJS.enc.Latin1));
            this.getData(this.path + "/" + name + ".txt", "plain/text", res => { //get image
                item.imageData = CryptoJS.AES.decrypt(res, this.key).toString(CryptoJS.enc.Latin1);
                console.log(JSON.stringify(item.meta));
                this.items.push(item);
            });
        });
        if (names.length > 0) {
            this.loadGalleryItems(names);
        }
    }

    private getData(url: string, fileType: string, callback) {
        console.log(`Running getdata, url: ${url}`);
        var reader = new FileReader();
        reader.onloadend = e => { callback(reader.result); };

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";

        xhr.onload = function (e) {
            if (this.status === 200) {
                const blobResult = new Blob([this.response], { type: fileType });
                reader.readAsText(blobResult);
            } else {
                console.log(`Unable to fetch file from url '${url}'`);
            }
        };
        xhr.send();
    }
}

export class GalleryItem {
    imageData: string;
    meta = JSON;
}