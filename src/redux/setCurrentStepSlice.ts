import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: localStorage.getItem("state")
    ? JSON.parse(localStorage.getItem("state")!)
    : "selectingGenre",
  prevStep: localStorage.getItem("prevState")
    ? JSON.parse(localStorage.getItem("prevState")!)
    : "",
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setCurrentStep: (state, { payload }) => {
      state.step = payload;
      localStorage.setItem("state", JSON.stringify(state.step));
    },

    setPreviousStep: (state, { payload }) => {
      state.prevStep = payload;
      localStorage.setItem("prevState", JSON.stringify(state.prevStep));
    },
  },
});

export const { setCurrentStep, setPreviousStep } = stepSlice.actions;

export default stepSlice.reducer;
