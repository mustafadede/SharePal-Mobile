export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[]; // Assuming genre_ids is an array of numbers
  genres: number[];
  id: number;
  original_name?: string;
  name?: string;
  media_type: string;
  mediaType?: string;
  first_air_date?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
