/// <reference path="../Typings/crypto-js.d.ts" />
import { Component, OnInit }                            from "angular2/core";
import { ROUTER_DIRECTIVES }                            from "angular2/router";
import { ControlGroup, FormBuilder, Validators }        from "angular2/common";
import { Router }                                       from "angular2/router";
import { AccountService }                               from "../../Services/acc.service";
import { FileService }                                  from "../../Services/file.service";

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
    private imageName: string = null;

    constructor(private fb: FormBuilder, private router: Router, private accService: AccountService, private fileService: FileService) { }

    ngOnInit() {
        this.uploadForm = this.fb.group({
            file: ['', Validators.required],
            description: ['']
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
            this.imageName = file.name;
            this.processing = false;
        }
        reader.readAsDataURL(file);
    }

    upload() {
        this.processing = true;
        let key = this.accService.getMyKey();
        let meta = {
            name: this.uploadForm.value.name,
            description: this.uploadForm.value.description,
            origin: this.imageName,
            type: this.imageName.split(".").pop()
        };
        
        let encFileData = CryptoJS.AES.encrypt(this.imageData, key);
        let encMeta = CryptoJS.AES.encrypt(JSON.stringify(meta), key);

        this.fileService.upload(encFileData.toString(), encMeta.toString()).then(result => result.subscribe(response => {
            console.log("Uploaded file: " + this.imageName);
            this.processing = false;
            }));
    }
}