import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
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
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
