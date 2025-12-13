export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface GetSelectedVideosResponse {
  id: number;
  results: TMDBVideo[];
}

export type TrailerSectionProps = {
  id: string;
  mediaType: string;
  language?: string;
};

export interface WatchProviderResponse {
  id: number;
  results: Record<string, any>;
}
