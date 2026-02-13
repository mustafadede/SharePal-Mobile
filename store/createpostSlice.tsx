import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createdPost: {
    photoURL: null,
    userId: "",
    postId: "",
    content: "",
    attachedFilm: {
      title: "",
      release_date: "",
      poster_path: "",
      mediaType: "",
      id: 0,
      wanttowatch: false,
      watched: false,
      unfinished: false,
    },
    spoiler: false,
    nick: "",
    likes: 0,
    comments: 0,
    reposts: 0,
    date: "",
  },
  createdPostLength: 0,
  attachedFilm: {},
  status: "idle",
  error: null,
  showModal: {
    values: {
      title: "",
      release_date: "",
      poster_path: "",
      mediaType: "",
      id: 0,
      wanttowatch: false,
      watched: false,
      unfinished: false,
    },
    show: false,
  },
};

const createPostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    showModal: (state) => {
      state.showModal.show = !state.showModal.show;
    },
    toggleModal: (state, action) => {
      state.showModal.values = action.payload;
      state.showModal.show = !state.showModal.show;
    },
    createPost: (state, action) => {
      state.createdPost = action.payload;
    },
    createPostAttachment: (state, action) => {
      state.createdPost.attachedFilm = action.payload;
    },
    createPostLength: (state, action) => {
      state.createdPostLength = action.payload;
    },
    attachFilm: (state, action) => {
      state.attachedFilm = action.payload;
    },
    setSpoiler: (state) => {
      state.createdPost.spoiler = !state.createdPost.spoiler;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetCreatePost: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const createPostsActions = createPostSlice.actions;
export default createPostSlice.reducer;
