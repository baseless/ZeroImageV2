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
    var GalleryComponent, GalleryItem;
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
            GalleryComponent = (function () {
                function GalleryComponent(fb, router, accService, fileService, routeParams) {
                    this.fb = fb;
                    this.router = router;
                    this.accService = accService;
                    this.fileService = fileService;
                    this.routeParams = routeParams;
                    this.items = new Array();
                }
                GalleryComponent.prototype.ngOnInit = function () {
                    var name = this.routeParams.get("name");
                    if (name === ".") {
                        this.key = this.accService.getMyKey();
                    }
                    else {
                        this.key = this.accService.getKey(name);
                    }
                    if (this.key == null || this.key.length === 0) {
                        console.log("Unable to locate valid key for user: " + name);
                        return;
                    }
                    this.loadGallery(name);
                };
                GalleryComponent.prototype.loadGallery = function (name) {
                    var _this = this;
                    this.fileService.getGallery(name)
                        .then(function (result) { return result.subscribe(function (response) {
                        _this.path = response.Path;
                        console.log("GetGallery response data: " + JSON.stringify(response));
                        if (response.FileNames.length > 0) {
                            _this.loadGalleryItems(response.FileNames);
                        }
                    }); });
                };
                GalleryComponent.prototype.loadGalleryItems = function (names) {
                    var _this = this;
                    var name = names.shift();
                    var item = new GalleryItem();
                    this.getData(this.path + "/" + name + ".meta.txt", "plain/text", function (res) {
                        item.meta = JSON.parse(CryptoJS.AES.decrypt(res, _this.key).toString(CryptoJS.enc.Latin1));
                        _this.getData(_this.path + "/" + name + ".txt", "plain/text", function (res) {
                            item.imageData = CryptoJS.AES.decrypt(res, _this.key).toString(CryptoJS.enc.Latin1);
                            console.log(JSON.stringify(item.meta));
                            _this.items.push(item);
                        });
                    });
                    if (names.length > 0) {
                        this.loadGalleryItems(names);
                    }
                };
                GalleryComponent.prototype.getData = function (url, fileType, callback) {
                    console.log("Running getdata, url: " + url);
                    var reader = new FileReader();
                    reader.onloadend = function (e) { callback(reader.result); };
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, true);
                    xhr.responseType = "blob";
                    xhr.onload = function (e) {
                        if (this.status === 200) {
                            var blobResult = new Blob([this.response], { type: fileType });
                            reader.readAsText(blobResult);
                        }
                        else {
                            console.log("Unable to fetch file from url '" + url + "'");
                        }
                    };
                    xhr.send();
                };
                GalleryComponent = __decorate([
                    core_1.Component({
                        selector: "gallery",
                        templateUrl: "app/components/member/gallery.component.html",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, router_2.Router, acc_service_1.AccountService, file_service_1.FileService, router_2.RouteParams])
                ], GalleryComponent);
                return GalleryComponent;
            }());
            exports_1("GalleryComponent", GalleryComponent);
            GalleryItem = (function () {
                function GalleryItem() {
                    this.meta = JSON;
                }
                return GalleryItem;
            }());
            exports_1("GalleryItem", GalleryItem);
        }
    }
});
//# sourceMappingURL=gallery.component.js.map