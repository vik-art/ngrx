import { Action, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../../types/auth-state.interface";
import { registerAction, registerSuccessAction, regiserFailureAction } from "../actions/register.action";

const initialState: AuthStateInterface = {
    isSubmitting: false,
    currentUser: null,
    isLoggedIn: null,
    validationErrors: null
}

const authReducer = createReducer(
    initialState,
    on(registerAction, (state): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
        validationErrors: null
    })),
    on(registerSuccessAction, (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        isLoggedIn: true,
        currentUser: action.currentUser
    })),
    on(regiserFailureAction, (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors
    }))
)

export function reducer(state: AuthStateInterface, action: Action) {
    return authReducer(state, action)
}