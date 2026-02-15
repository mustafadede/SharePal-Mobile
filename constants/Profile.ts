export interface CurrentlyWatching {
  title: string;
  releaseDate: string;
  poster: string;
}

export type PrivacyOption = "Public" | "Followers" | "Private";

export interface ProfileState {
  status: "idle" | "loading" | "succeeded" | "failed";
  userId: string;
  nick: string;
  email: string;
  photoURL: string;
  displayName: string;
  quote: string;
  banner: string;
  following: number;
  followers: number;
  topOne: string;
  instagram: string;
  linkedin: string;
  github: string;
  currentlyWatching: CurrentlyWatching;
  followingList: { date: string; uid: string }[];
  followersList: { date: string; uid: string }[];
  bestMovieYear: string;
  bestSeriesYear: string;
  online: boolean;
  splash: string;
  accountPrivate: PrivacyOption;
  taggingPrivacy: PrivacyOption;
  listPrivacy: PrivacyOption;
  totalSeries: number;
  totalFilms: number;
  lists: any[];
}
