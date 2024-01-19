import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RequestStates from "../../../utils/request-states";

import { addMovie, getGenreDatas, getMovieData, getMovieDetailsByID, getSerchedMovie, getSimilarMovieByID, getTopMovie, login, signup, updateMovieDetailsByID } from "./action";

const initialState = {
  movieRequestState: RequestStates.init,
  movieId:"",
  openMovieDetail:false,
  movieDetails:{},
  similarMovie:[],
  rememberMe:false
};

export const getPopularMovieData = createAsyncThunk("movie/getPopularMovieData", async (data) => {
  const res = await getMovieData(data);
  return res.data;
});


export const getTopMovieData = createAsyncThunk("movie/getTopMovieData", async () => {
  const res = await getTopMovie();
  return res.data;
});

export const getSerchedMovieData = createAsyncThunk("movie/getSerchedMovieData", async (body) => {
  const res = await getSerchedMovie(body);
  return res.data;
});

export const getMovieDetails = createAsyncThunk("movie/getMovieDetails", async (body) => {
  const res = await getMovieDetailsByID(body);
  return res.data;
});
export const updateMovieDetails = createAsyncThunk("movie/updateMovieDetails", async (body) => {
  const res = await updateMovieDetailsByID(body);
  return res.data;
});


export const getSimilarMovie = createAsyncThunk("movie/getSimilarMovie", async (body) => {
  const res = await getSimilarMovieByID(body);
  return res.data;
});
export const userLogin = createAsyncThunk("user/login", async (body) => {
  const res = await login(body);
  return res.data;
});
export const userSignup = createAsyncThunk("user/signup", async (body) => {
  const res = await signup(body);
  return res.data;
});
export const addMovies = createAsyncThunk("movie/add", async (body) => {
  const res = await addMovie(body);
  return res.data;
});
 






const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovieList(state, action) {
      return {
        ...state,
        movieId: action.payload.movieId,
        openMovieDetail: action.payload.openMovieDetail,
        movieDetails:action.payload.movieDetails,
        similarMovie:action.payload.similarMovie
      };
    },
    setRememberMe(state,action){
      state.rememberMe=action.payload
    }
  },
  extraReducers: {
    [getPopularMovieData.fulfilled]: (state, action) => ({
      ...state,
      movieRequestState: RequestStates.success,
    }),
    [getPopularMovieData.pending]: (state) => ({
      ...state,
      movieRequestState: RequestStates.loading,
    }),
    [getPopularMovieData.rejected]: (state) => ({
      ...state,
      movieRequestState: RequestStates.error,
    }),
    [getTopMovieData.fulfilled]: (state, action) => ({
      ...state,
      movieRequestState: RequestStates.success,
    }),
    [getTopMovieData.pending]: (state) => ({
      ...state,
      movieRequestState: RequestStates.loading,
    }),
    [getTopMovieData.rejected]: (state) => ({
      ...state,
      movieRequestState: RequestStates.error,
    }),
    [getSerchedMovieData.fulfilled]: (state, action) => ({
      ...state,
      movieRequestState: RequestStates.success,
    }),
    [getSerchedMovieData.pending]: (state) => ({
      ...state,
      movieRequestState: RequestStates.loading,
    }),
    [getSerchedMovieData.rejected]: (state) => ({
      ...state,
      movieRequestState: RequestStates.error,
    }),
    [getMovieDetails.fulfilled]: (state, action) => ({
      ...state,
      movieRequestState: RequestStates.success,
      movieDetails: action.payload,
    }),
    [getMovieDetails.pending]: (state) => ({
      ...state,
      movieRequestState: RequestStates.loading,
    }),
    [getMovieDetails.rejected]: (state) => ({
      ...state,
      movieRequestState: RequestStates.error,
    }),
    [getSimilarMovie.fulfilled]: (state, action) => ({
      ...state,
      movieRequestState: RequestStates.success,
      similarMovie: action.payload.results,
    }),
    [getSimilarMovie.pending]: (state) => ({
      ...state,
      movieRequestState: RequestStates.loading,
      
    }),
    [getSimilarMovie.rejected]: (state) => ({
      ...state,
      movieRequestState: RequestStates.error,
    }),
    [userLogin.fulfilled]: (state, action) => ({
      
    }),
    [userLogin.pending]: (state) => ({
    
      
    }),
    [userLogin.rejected]: (state) => ({
     
    }),
    [userSignup.fulfilled]: (state, action) => ({
      
    }),
    [userSignup.pending]: (state) => ({
     
      
    }),
    [userSignup.rejected]: (state) => ({
    
    }),
  },
});
export const { setMovieList ,setRememberMe} = movieSlice.actions;
const { reducer } = movieSlice;
export default reducer;
