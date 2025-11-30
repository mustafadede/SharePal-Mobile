import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    status: "idle",
    userId: "",
    nick: "",
    email: "",
    photoURL: "",
    displayName: "",
    quote: "",
    banner: "",
    following: 0,
    followers: 0,
    topOne: "",
    instagram: "",
    linkedin: "",
    github: "",
    currentlyWatching: {
      title: "",
      releaseDate: "",
      poster: "",
    },
    bestMovieYear: "",
    bestSeriesYear: "",
    online: false,
    splash: "",
    accountPrivate: "Public",
    taggingPrivacy: "Public",
    listPrivacy: "Public",
    totalSeries: 0,
    totalFilms: 0,
    lists: [],
  },
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    getInfo: (state) => {
      console.log(state);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setTotalSeries: (state, action) => {
      state.totalSeries = action.payload;
    },
    setTotalFilms: (state, action) => {
      state.totalFilms = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    initilizeLists: (state, action) => {
      state.lists = action.payload;
    },
  },
});

export const userProfileActions = userProfileSlice.actions;
export default userProfileSlice.reducer;
