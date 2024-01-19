import { configureStore } from "@reduxjs/toolkit";

import moviesReducer from "../component/Home/redux/reducer";


export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
