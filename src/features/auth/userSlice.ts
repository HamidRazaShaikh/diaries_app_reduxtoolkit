import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import {User} from '../../interfaces/interfaces';




const user = createSlice({

    name  : 'user',
    initialState : null as User |  null,

    reducers : {

        setUser(state,{payload}) {

            return state = ( payload !== null)? payload : null
        },
        
    }


});

export const {setUser} = user.actions;
export default user.reducer;


