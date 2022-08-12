import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { registerAction } from '../../store/actions/register.action';

@Component({
    selector: 'app-register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store
    ) { }
    
    ngOnInit(): void {
        this.initializeForm()
    }

    private initializeForm() {
        this.form = this.fb.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    public submit() {
       this.store.dispatch(registerAction(this.form.value))
    }
}
