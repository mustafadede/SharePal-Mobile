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
      state.nick = action.payload.nick;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.displayName = action.payload.displayName;
      state.quote = action.payload.quote;
      state.banner = action.payload.banner;
      state.following = action.payload.following;
      state.followers = action.payload.followers;
      state.topOne = action.payload.topOne;
      state.instagram = action.payload.instagram;
      state.linkedin = action.payload.linkedin;
      state.github = action.payload.github;
      state.currentlyWatching = action.payload.currentlyWatching;
      state.bestMovieYear = action.payload.bestMovieYear;
      state.bestSeriesYear = action.payload.bestSeriesYear;
      state.online = action.payload.online;
      state.splash = action.payload.splash;
      state.accountPrivate = action.payload.accountPrivate;
      state.taggingPrivacy = action.payload.taggingPrivacy;
      state.listPrivacy = action.payload.listPrivacy;
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
