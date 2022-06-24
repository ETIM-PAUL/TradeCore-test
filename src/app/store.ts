import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import setCurrentStepSlice from "../redux/setCurrentStepSlice";
import setGenre from "../redux/setGenreSlice";

export const store = configureStore({
  reducer: {
    Genres: setGenre,
    CurrentStep: setCurrentStepSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
