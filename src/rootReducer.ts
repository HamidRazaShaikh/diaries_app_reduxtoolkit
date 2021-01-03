import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './features/auth/userSlice';
import authReducer from './features/auth/authSlice';
import diariesReducer from './features/diary/diarySlice';
import editorReducer from './features/entry/editor';
import entriesReducer from './features/entry/entry';
import showEntriesReducer from './features/entry/entryshow';



const rootReducer = combineReducers({
    auth: authReducer,
    diaries: diariesReducer,
    entries: entriesReducer,
    user: userReducer,
    editor: editorReducer,
    entriesShow : showEntriesReducer
    
  });

  export type RootState = ReturnType<typeof rootReducer>;
  export default rootReducer;