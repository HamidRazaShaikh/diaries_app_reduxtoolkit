import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './features/auth/userSlice';
import authReducer from './features/auth/authSlice';
import diariesReducer from './features/diary/diarySlice';


const rootReducer = combineReducers({
    auth: authReducer,
    diaries: diariesReducer,
    // entries: entriesReducer,
    user: userReducer,
    // editor: editorReducer,
  });

  export type RootState = ReturnType<typeof rootReducer>;
  export default rootReducer;