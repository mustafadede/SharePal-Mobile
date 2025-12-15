export type ExploreBottomSheetProps = {
  title: string;
  release_date: string;
  poster_path: string;
  mediaType: string;
  id: number;
  currentlywatching: boolean;
  wanttowatch: boolean;
  watched: boolean;
  unfinished: boolean;
};

export type SearchDetailParams = {
  id: string;
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  mediaType: "movie" | "tv";
};

export type UserItem = {
  uid: string;
  name: string;
  photoURL: string;
};

export const isUserItem = (item: UserItem | null): item is UserItem =>
  item !== null;
