import { Component, OnInit }                            from "angular2/core";
import { ROUTER_DIRECTIVES }                            from "angular2/router";
import { ControlGroup, FormBuilder, Validators }        from "angular2/common";
import { AppValidators }                                from "../../app-validators";
import { AuthService }                                  from "../../Services/auth.service";

@Component({
    selector: "login",
    templateUrl: "app/components/account/login.component.html",
    directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent implements OnInit {
    loginForm: ControlGroup;
    processing = false;
    errorMessage = null;

    constructor(private fb: FormBuilder, private authService: AuthService) { }
    
    ngOnInit() {
        this.loginForm = this.fb.group({
            userName: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])]
        });
    }

    doLogin() {
        this.processing = true;
        let status = false;
        if (this.loginForm.valid) {
            this.authService.exists(this.loginForm.value.userName)
                .then(result => result.subscribe(
                    data => {
                        if (!data.result) {
                            this.errorMessage = "Login failed";
                        } else {
                            this.errorMessage = "Login succeeded";
                        }
                        console.log(`[AuthService.exists] response for '${this.loginForm.value.userName}': ${JSON.stringify(data)}`);
                        this.processing = false;
                    },
                    error => {
                        console.log(error);
                        this.processing = false;
                    },
                    () => {}
                ));
        } else {
            this.errorMessage = "Login failed";
            this.processing = false;
        }
    }
}