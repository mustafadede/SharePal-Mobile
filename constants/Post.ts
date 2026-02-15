export type Like = {
  id: string;
  date: string;
  postId: string;
};

export type Post = {
  photoURL: string | null;
  postId: string;
  nick: string;
  content: string;
  spoiler: boolean;
  attachedFilm: object;
  likesList: Like[] | 0;
  displayName?: string;
  likes: number;
  comments: number;
  edited: boolean;
  repost: boolean;
  repostsList: object[];
  date: string;
  userId: string;
  attachedAction: string | null;
  actionName: string | null;
};

export type PostAttachment = {
  backdrop: string;
  id: number;
  mediaType: string;
  poster: string;
  releaseDate: string;
  title: string;
};
