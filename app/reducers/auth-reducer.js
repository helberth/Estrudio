import Immutable from 'immutable'
const { Map } = Immutable
import * as types from '../actions/action-types';
import User from '../models/User-model';

const initialState = Map({
    user: new User(),
    status: null,
    error: null,
    loading: false
})

export default function auth(state = initialState, action) {
    let error;
    let providerId = '';
    switch (action.type) {

        case types.SIGNUP_USER:// sign up user, set loading = true and status = signup
            console.log("reducer_users called..");
            return state.merge({
                user: null,
                status: 'signup',
                error: null,
                loading: true
            });
        case types.SIGNUP_USER_SUCCESS://return user, status = authenticated and make loading = false            
            action.payload.providerData.forEach(profile => providerId = profile.providerId);
            return state.merge({
                user: new User({ uid: action.payload.uid, email: action.payload.email, name: action.payload.displayName, providerId: providerId}),
                status: 'authenticated',
                error: null,
                loading: false
            }); //<-- authenticated
        case types.SIGNUP_USER_FAILURE:// return error and make loading = false
            error = action.payload.message;//from firebase error      
            return state.merge({
                user: null,
                status: 'signup',
                error: error,
                loading: false
            });

        case types.SIGNIN_USER:// sign in user,  set loading = true and status = signin
            return state.merge({
                user: null,
                status: 'signin',
                error: null,
                loading: true
            });
        case types.SIGNIN_USER_SUCCESS://return authenticated user,  make loading = false and status = authenticated
            //console.log("SIGNIN_USER_SUCCESS");
            action.payload.providerData.forEach(profile => providerId = profile.providerId);
            return state.merge({
                user: new User({ uid: action.payload.uid, email: action.payload.email, name: action.payload.displayName, providerId: providerId}), 
                status: 'authenticated',
                error: null,
                loading: false
            }); //<-- authenticated
        case types.SIGNIN_USER_FAILURE:// return error and make loading = false
            error = action.payload.data || { message: action.payload.message };//2nd one is network or server down errors      
            return state.merge({
                user: null,
                status: 'signin',
                error: error,
                loading: false
            });

        case types.LOGOUT_USER:
            return state.merge({
                user: null,
                status: 'logout',
                error: null,
                loading: false
            });

        case types.RESET_USER:// reset authenticated user to initial state
            return state.merge({
                user: null,
                status: null,
                error: null,
                loading: false
            });
    }

    return state;
}
