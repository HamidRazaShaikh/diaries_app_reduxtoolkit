import { createSlice} from '@reduxjs/toolkit';

interface AuthState {

    token : string | null,
    isAuthenticated : boolean 
}


const auth = createSlice({
    name : 'auth',

    initialState : <AuthState> {
    token : null,
    isAuthenticated : false
    },

    reducers : {

        saveToken( state, {payload}) {
            if(payload) {

                state.token = payload
            }
        },

        clearToken (state){

            state.token = null
        },

        setAuthState ( state , {payload}){

            if(payload){

                state.isAuthenticated = payload
            }
        }


    }
});

export const { saveToken , clearToken , setAuthState} = auth.actions;

export default auth.reducer;

