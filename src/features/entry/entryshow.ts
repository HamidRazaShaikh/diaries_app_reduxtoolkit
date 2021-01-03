import { createSlice, PayloadAction } from "@reduxjs/toolkit";




const showEntries = createSlice({

    name : 'showEntries',
    initialState : '',
    reducers : {


        show (state, { payload } : PayloadAction<string>){  
            
            return state = payload
        }



    }
});


export const { show } = showEntries.actions;
export default showEntries.reducer;