import { ProfileState } from "@/constants/Profile";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProfileState = {
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
  followingList: [],
  followersList: [],
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
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
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
    incrementTotalFilms: (state, action) => {
      state.totalFilms == action.payload;
    },
    incrementTotalSeries: (state, action) => {
      state.totalSeries = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    initilizeLists: (state, action) => {
      state.lists = action.payload;
    },
    initilizeFollowingList: (state, action) => {
      state.followingList = action.payload;
    },
    resetLists: (state) => {
      state.lists = [];
    },
    updateCurrentlyWatching: (state, action) => {
      state.currentlyWatching = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
