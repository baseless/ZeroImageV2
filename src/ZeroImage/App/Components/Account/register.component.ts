import { Component, OnInit }                            from "angular2/core";
import { ROUTER_DIRECTIVES }                            from "angular2/router";
import { ControlGroup, FormBuilder, Validators }        from "angular2/common";
import { AppValidators }                                from "../../app-validators";
import { AuthService }                                  from "../../Services/auth.service";

@Component({
    selector: "register",
    templateUrl: "app/components/account/register.component.html",
    directives: [ROUTER_DIRECTIVES]
})

export class RegisterComponent implements OnInit {
    registerForm: ControlGroup;
    processing = false;
    errorMessage = null;

    constructor(private fb: FormBuilder, private authService: AuthService) { }

    ngOnInit() {
        this.registerForm = this.fb.group({
            userName: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([AppValidators.validatePassword])],
            passwordConfirm: ['', Validators.compose([Validators.required])]
        });
    }

    doRegister() {
        this.processing = true;
        let status = false;
        if (this.registerForm.valid) {
            this.authService.register(this.registerForm.value.userName, this.registerForm.value.password)
                .then(result => result.subscribe(
                    data => {
                        if (!data.result) {
                            this.errorMessage = "registration failed";
                        } else {
                            this.errorMessage = "registration succeeded";
                        }
                        console.log(`[AuthService.register] response for '${this.registerForm.value.userName}': ${JSON.stringify(data)}`);
                        this.processing = false;
                    },
                    error => {
                        console.log(error);
                        this.processing = false;
                    },
                    () => { }
                ));
        } else {
            this.errorMessage = "Registration failed";
            this.processing = false;
        }
    }
}