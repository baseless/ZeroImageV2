import { Component, OnInit }                            from "angular2/core";
import { ROUTER_DIRECTIVES }                            from "angular2/router";
import { ControlGroup, FormBuilder, Validators }        from "angular2/common";
import { Router }                                       from "angular2/router";

@Component({
    selector: "upload",
    templateUrl: "app/components/member/upload.component.html",
    directives: [ROUTER_DIRECTIVES]
})

export class UploadComponent {
    uploadForm: ControlGroup;
    processing = false;
    errorMessage = null;

    constructor(private fb: FormBuilder, private router: Router) { }

    ngOnInit() {
        this.uploadForm = this.fb.group({
            file: ['', Validators.required]
        });
    }

    upload() {
        this.processing = true;
        this.processing = false;
    }
}