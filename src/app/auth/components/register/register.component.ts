import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { registerAction } from '../../store/actions/register.action';
import { isSubmittingSelector } from '../../store/selectors/auth.feature.selector';
import { RegisterRequestInterface } from '../../types/register-request.interface';

@Component({
    selector: 'app-register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public form!: UntypedFormGroup;
    isSubmitting$!: Observable<boolean>;

    constructor(
        private fb: UntypedFormBuilder,
        private store: Store,
        private authService: AuthService
    ) { }
    
    ngOnInit(): void {
        this.initializeForm();
        this.initializeValues()
    }

    private initializeForm(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    private initializeValues(): void {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    }

    public submit() {
        const request: RegisterRequestInterface = {
            user: this.form.value
        }
        this.store.dispatch(registerAction({ request }));
        this.form.reset();
    }
}
