import { Component, OnInit }                            from "angular2/core";
import { ROUTER_DIRECTIVES }                            from "angular2/router";
import { ControlGroup, FormBuilder, Validators }        from "angular2/common";
import { AppValidators }                                from "../../app-validators";
import { AuthService }                                  from "../../Services/auth.service";
import {Router}                                         from "angular2/router"

@Component({
    selector: "login",
    templateUrl: "app/components/account/login.component.html",
    directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent implements OnInit {
    loginForm: ControlGroup;
    processing = false;
    errorMessage = null;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
    
    ngOnInit() {
        this.loginForm = this.fb.group({
            userName: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])]
        });
    }

    doLogin() {
        this.processing = true;
        if (this.loginForm.valid) {
            this.authService.authenticate(this.loginForm.value.userName, this.loginForm.value.password)
                .then(result => result.subscribe(
                    data => {
                        this.processing = false;
                        if (data.result) this.router.navigate(["Home"]); 
                        this.errorMessage = "Login failed";
                        console.log(`[AuthService.authenticate] response for '${this.loginForm.value.userName}': ${JSON.stringify(data)}`);
                    },
                    error => { console.log(error); }, () => { this.processing = false; }
                ));
        } else {
            this.errorMessage = "Login failed";
            this.processing = false;
        }
    }

    doLoginOld() {
        //console.log("authenticated status: " + this.authService.isAuthenticated());
        this.processing = true;
        if (this.loginForm.valid) {
            this.authService.authenticate(this.loginForm.value.userName, this.loginForm.value.password)
                .then(result => result.subscribe(
                    data => {
                        if (!data.result) {
                            this.errorMessage = "Login failed";
                        } else {
                            //this.authService.setAuthenticated(true);
                            this.router.navigate(["Home"]);
                        }
                        console.log(`[AuthService.authenticate] response for '${this.loginForm.value.userName}': ${JSON.stringify(data)}`);
                    },
                    error => { console.log(error); }, () => {}
                ));
        } else {
            this.errorMessage = "Login failed";
        }
        this.processing = false;
    }
}