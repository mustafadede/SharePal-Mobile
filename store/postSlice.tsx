import { Post } from "@/constants/Post";
import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [] as Post[],
    status: "idle",
    error: null,
  },
  reducers: {
    fetchMorePosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
    fetchPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    updateLike: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId,
      );
      state.posts[index].likes = action.payload.likes;
      state.posts[index].likesList = action.payload.likesList;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    removePost(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter(
        (post: { postId: string }) => post.postId !== postId,
      );
    },
  },
});

export const postsActions = postSlice.actions;
export default postSlice.reducer;
