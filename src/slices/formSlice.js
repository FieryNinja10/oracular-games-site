import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { formType: "ez", isModalOpen: false }
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    login: (state) => {
      state.formType = "login";
    },
    signup: (state) => {
      state.formType = "signup";
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const { login, signup, openModal, closeModal } = formSlice.actions;
export const getValues = (state) => state.form.value;
export default formSlice.reducer;
