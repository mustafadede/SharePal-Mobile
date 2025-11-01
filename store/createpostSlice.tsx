import { createSlice } from "@reduxjs/toolkit";

const createPostSlice = createSlice({
  name: "post",
  initialState: {
    createdPost: {
      photoURL: null,
      userId: "",
      postId: "",
      content: "",
      attachedFilm: {},
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
  },
  reducers: {
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
  },
});

export const createPostsActions = createPostSlice.actions;
export default createPostSlice.reducer;
