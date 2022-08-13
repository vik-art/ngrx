import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, pipe, switchMap } from "rxjs";
import { CurrentUserInterface } from "src/shared/types/current-user.interface";
import { AuthService } from "../../services/auth.service";
import { regiserFailureAction, registerAction, registerSuccessAction } from "../actions/register.action";

@Injectable()

export class RegisterEffect {
    register$ = createEffect(() => this.actions$.pipe(
        ofType(registerAction),
        switchMap(({ request }) => {
            return this.authService.register(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    return registerSuccessAction({ currentUser });
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(regiserFailureAction({errors: errorResponse.error.errors}));
                })
            );
        })
    ))

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) {}
}