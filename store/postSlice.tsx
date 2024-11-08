import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    createdPost: {
      photoURL: null,
      userId: "",
      postId: "",
      content: "",
      attachedFilm: "",
      spoiler: false,
      nick: "",
      likes: 0,
      comments: 0,
      reposts: 0,
      date: "",
    },
    createdPostLength: 0,
    attachedFilm: {},
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    createPost: (state, action) => {
      state.createdPost = action.payload;
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
    fetchMorePosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
    fetchPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const postsActions = postSlice.actions;
export default postSlice.reducer;
