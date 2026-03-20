export type Like = {
  id: string;
  date: string;
  postId: string;
};

type AttachedFilm = {
  title?: string;
  releaseDate?: string;
  id: number;
  poster_path?: string;
  poster?: string;
  mediaType?: string;
  backdrop?: string;
  vote: number;
};

export type Post = {
  photoURL: string | null;
  postId: string;
  nick: string;
  content: string;
  spoiler: boolean;
  attachedFilm: AttachedFilm;
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

export type PostOptionsValues = {
  title: string;
  release_date: string;
  posterPath: string;
  backdrop: string;
  poster?: string;
  content: string;
  mediaType: string;
  postId: string;
  spoiler: string | boolean;
  id: string | number;
};

export type PostOptionsBottomSheetProps = {
  bottomSheetValues: PostOptionsValues;
  handleClose: () => void;
};
