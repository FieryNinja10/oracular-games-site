import { configureStore } from "@reduxjs/toolkit";

import authFormReducer from "./reducers/authForm";

export const store = configureStore({
  reducer: {
    authForm: authFormReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
