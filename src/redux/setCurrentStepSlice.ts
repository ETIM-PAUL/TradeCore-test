import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: localStorage.getItem("currentStep")
    ? JSON.parse(localStorage.getItem("currentStep")!)
    : "selectingGenre",
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setCurrentStep: (state, { payload }) => {
      state.step = payload;
      localStorage.setItem("state", JSON.stringify(state.step));
    },
  },
});

export const { setCurrentStep } = stepSlice.actions;

export default stepSlice.reducer;
