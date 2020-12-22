import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Diary} from '../../interfaces/interfaces';


const diaries = createSlice({

    name : 'diaries',
    initialState: [] as Diary[],
    reducers: {

        addDiary (state , {payload}: PayloadAction<Diary[]>) {

            const diariesTosave = payload.filter((diary)=> {
                return state.findIndex( (item)=> item.id === diary.id) === -1
            });

            state.push( ...diariesTosave)


        }

    }
}) ;


export const {addDiary} = diaries.actions;
export default diaries.reducer;