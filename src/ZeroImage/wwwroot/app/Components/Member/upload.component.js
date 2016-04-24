System.register(["angular2/core", "angular2/router", "angular2/common", "../../Services/acc.service", "../../Services/file.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, common_1, router_2, acc_service_1, file_service_1;
    var UploadComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (acc_service_1_1) {
                acc_service_1 = acc_service_1_1;
            },
            function (file_service_1_1) {
                file_service_1 = file_service_1_1;
            }],
        execute: function() {
            UploadComponent = (function () {
                function UploadComponent(fb, router, accService, fileService) {
                    this.fb = fb;
                    this.router = router;
                    this.accService = accService;
                    this.fileService = fileService;
                    this.maxFileSize = 1024 * 1024;
                    this.processing = false;
                    this.errorMessage = null;
                    this.imageData = null;
                    this.imageName = null;
                }
                UploadComponent.prototype.ngOnInit = function () {
                    this.uploadForm = this.fb.group({
                        file: ['', common_1.Validators.required],
                        description: ['']
                    });
                };
                UploadComponent.prototype.fetchAndPreview = function (event) {
                    if (event.target.files.length !== 1) {
                        this.errorMessage = "Please select an image!";
                        return;
                    }
                    var file = event.target.files[0];
                    if (file.size > this.maxFileSize) {
                        this.errorMessage = "Image to large! (max 1MB)";
                        return;
                    }
                    //check that the file is a valid image format
                    this.loadImageData(file);
                };
                UploadComponent.prototype.loadImageData = function (file) {
                    var _this = this;
                    this.processing = true;
                    var reader = new FileReader();
                    reader.onloadend = function (e) {
                        _this.imageData = reader.result;
                        _this.imageName = file.name;
                        _this.processing = false;
                    };
                    reader.readAsDataURL(file);
                };
                UploadComponent.prototype.upload = function () {
                    var _this = this;
                    this.processing = true;
                    var key = this.accService.getMyKey();
                    var meta = {
                        name: this.uploadForm.value.name,
                        description: this.uploadForm.value.description,
                        origin: this.imageName,
                        type: this.imageName.split(".").pop()
                    };
                    var encFileData = CryptoJS.AES.encrypt(this.imageData, key);
                    var encMeta = CryptoJS.AES.encrypt(JSON.stringify(meta), key);
                    this.fileService.upload(encFileData.toString(), encMeta.toString()).then(function (result) { return result.subscribe(function (response) {
                        console.log("Uploaded file: " + _this.imageName);
                        _this.processing = false;
                    }); });
                };
                UploadComponent = __decorate([
                    core_1.Component({
                        selector: "upload",
                        templateUrl: "app/components/member/upload.component.html",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, router_2.Router, acc_service_1.AccountService, file_service_1.FileService])
                ], UploadComponent);
                return UploadComponent;
            }());
            exports_1("UploadComponent", UploadComponent);
        }
    }
});
//# sourceMappingURL=upload.component.js.map