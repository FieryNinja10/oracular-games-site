import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState: {
  formType: string;
  isModalOpen: boolean;
} = {
  formType: "",
  isModalOpen: false
};

export const authFormSlice = createSlice({
  name: "authForm",
  initialState,
  reducers: {
    OPEN_AUTH_MODAL: (state, action: PayloadAction<string>) => {
      state.formType = action.payload;
      state.isModalOpen = true;
    },
    CLOSE_AUTH_MODAL: (state) => {
      state.isModalOpen = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const authFormActions = authFormSlice.actions;

export default authFormSlice.reducer;
