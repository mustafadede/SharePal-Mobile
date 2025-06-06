export type Upcoming = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[]; // Assuming genre_ids is an array of numbers
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type UpcomingResponse = {
  page: number;
  results: Upcoming[];
  total_pages: number;
  total_results: number;
};
