/// <reference path="crypto-js.d.ts" />
import { Component, OnInit }                            from "angular2/core";
import { ROUTER_DIRECTIVES }                            from "angular2/router";
import { ControlGroup, FormBuilder, Validators }        from "angular2/common";
import { Router }                                       from "angular2/router";
import { AccountService }                               from "../../Services/acc.service";

@Component({
    selector: "upload",
    templateUrl: "app/components/member/upload.component.html",
    directives: [ROUTER_DIRECTIVES]
})

export class UploadComponent {
    private maxFileSize = 1024*1024;
    uploadForm: ControlGroup;
    processing = false;
    errorMessage: string = null;

    private imageData: string = null;

    constructor(private fb: FormBuilder, private router: Router, private accService: AccountService) { }

    ngOnInit() {
        this.uploadForm = this.fb.group({
            file: ['', Validators.required]
        });
    }

    fetchAndPreview(event) {
        if (event.target.files.length !== 1) {
            this.errorMessage = "Please select an image!";
            return;
        }
        let file = event.target.files[0];
        if (file.size > this.maxFileSize) {
            this.errorMessage = "Image to large! (max 1MB)";
            return;
        }
        //check that the file is a valid image format
        this.loadImageData(file);
    }

    private loadImageData(file: File) {
        this.processing = true;
        let reader = new FileReader();
        reader.onloadend = e => {
            this.imageData = reader.result;
            console.log(this.imageData);
            this.processing = false;
        }
        reader.readAsDataURL(file);
    }

    upload() {
        console.log("KEY: " + this.accService.getMyKey());
        var encFileData = CryptoJS.AES.encrypt(this.imageData, this.accService.getMyKey());
        console.log(encFileData.toString());
        //encrypt and upload
    }
}