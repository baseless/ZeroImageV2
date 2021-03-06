﻿import { Component, provide }                                                                                   from "angular2/core";
import { HTTP_PROVIDERS }                                                                                       from "angular2/http";
import { LoginComponent }                                                                                       from "./Components/Account/login.component";
import { ResponseComponent }                                                                                       from "./Components/Account/response.component";
import { AnswerComponent }                                                                                       from "./Components/Account/answer.component";
import { RegisterComponent }                                                                                    from "./Components/Account/register.component";
import { NotFoundComponent }                                                                                    from "./Components/Status/not-found.component";
import { HomeComponent }                                                                                        from "./Components/Member/home.component";
import { UploadComponent }                                                                                      from "./Components/Member/upload.component";
import { GalleryComponent }                                                                                      from "./Components/Member/gallery.component";
import { RequestComponent }                                                                                      from "./Components/Account/request.component";
import { HashLocationStrategy, LocationStrategy, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router }     from "angular2/router";
import { AuthService }                                                                                          from "./Services/auth.service";
import { AccountService }                                                                                       from "./Services/acc.service";
import { FileService }                                                                                          from "./Services/file.service";

@RouteConfig([
    { path: "/", name: "Login", component: LoginComponent, useAsDefault: true },
    { path: "/register", name: "Register", component: RegisterComponent },
    { path: "/home", name: "Home", component: HomeComponent },
    { path: "/gallery/:name", name: "Gallery", component: GalleryComponent },
    { path: "/upload", name: "Upload", component: UploadComponent },
    { path: "/request", name: "Request", component: RequestComponent },
    { path: "/response", name: "Response", component: ResponseComponent },
    { path: "/answer/:id", name: "Answer", component: AnswerComponent },
    { path: "/**", name: "NotFound", component: NotFoundComponent }
])

@Component({
    selector: "zero-image",
    templateUrl: "app/app.component.html",
    directives: [ROUTER_DIRECTIVES, RegisterComponent, LoginComponent, AnswerComponent, ResponseComponent, RequestComponent, NotFoundComponent, GalleryComponent, HomeComponent],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, AuthService, AccountService, FileService, provide(LocationStrategy, { useClass: HashLocationStrategy })]
})

export class AppComponent {
    private authenticated: boolean;

    constructor(private router: Router, private authService: AuthService) {
        authService.authenticated$.subscribe(res => this.authenticated = res);
    }

    isRouteActive(route) {
        return this.router.isRouteActive(this.router.generate(route));
    }

    logout() {
        this.authService.signOut();
        this.router.navigate(["Login"]);

    }
}