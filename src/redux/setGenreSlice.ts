import { createSlice } from "@reduxjs/toolkit";
import data from "./genre.json";

const initialState = {
  genre: localStorage.getItem("genre")
    ? JSON.parse(localStorage.getItem("genre")!)
    : data,
  subGenre: localStorage.getItem("subGenres")
    ? JSON.parse(localStorage.getItem("subGenres")!)
    : [],
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setGenreValues: (state) => {
      localStorage.setItem("genre", JSON.stringify(state.genre));
    },

    getSubGenres: (state, { payload }) => {
      let subGenres;
      let subGG = [];
      const subGenresCollection = data.genres.map((x: any) => x);
      for (let index = 0; index < subGenresCollection.length; index++) {
        const element = subGenresCollection[index];
        subGenres = element?.subgenres.map((y: any) => y);
        subGG.push(subGenres);
      }
      let subG = subGG[payload - 1].map((x: any) => x);
      state.subGenre = subG;
      localStorage.setItem("subGenres", JSON.stringify(subG));
    },

    removeSubGenres: (state) => {
      state.subGenre = [];
      const prevState = { subGenre: [] };
      localStorage.setItem("subGenres", JSON.stringify(prevState));
    },
  },
});

export const { setGenreValues, getSubGenres, removeSubGenres } =
  genreSlice.actions;

export default genreSlice.reducer;
