import { createSlice } from "@reduxjs/toolkit";

const searchDetailSlice = createSlice({
  name: "searchDetail",
  initialState: {
    status: "idle",
    searchDetail: {
      status: "idle",
      adult: false,
      backdrop_path: "",
      genre_ids: [],
      id: 0,
      media_type: "",
      original_language: "",
      original_title: "",
      overview: "",
      popularity: 0,
      poster_path: "",
      release_date: "",
      title: "",
      video: false,
      vote_average: 0,
      vote_count: 0,
      episode_run_time: [],
      first_air_date: "",
      last_air_date: "",
      name: "",
      number_of_episodes: 0,
      number_of_seasons: 0,
      origin_country: [],
      original_name: "",
      seasons: [],
      type: "",
    },
    share: {
      ref: null,
      status: "idle",
    },
  },
  reducers: {
    updateSearchDetail: (state, action) => {
      state.searchDetail = action.payload;
    },
    updateShareRef: (state, action) => {
      state.share.ref = action.payload;
    },
    clearSearchDetail: (state) => {
      state.searchDetail = {
        adult: false,
        backdrop_path: "",
        genre_ids: [],
        id: 0,
        media_type: "",
        original_language: "",
        original_title: "",
        overview: "",
        popularity: 0,
        poster_path: "",
        release_date: "",
        title: "",
        video: false,
        vote_average: 0,
        vote_count: 0,
        episode_run_time: [],
        first_air_date: "",
        last_air_date: "",
        name: "",
        number_of_episodes: 0,
        number_of_seasons: 0,
        origin_country: [],
        original_name: "",
        seasons: [],
        status: "",
        type: "",
      };
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const searchDetailActions = searchDetailSlice.actions;
export default searchDetailSlice.reducer;
