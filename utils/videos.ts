import { TMDBVideo } from "@/constants/Videos";

export const filterTrailers = (videos: TMDBVideo[]): TMDBVideo[] => {
  return videos.filter(
    (v) => v.site === "YouTube" && v.type.toLowerCase().includes("trailer")
  );
};

export const filterBloopers = (videos: TMDBVideo[]): TMDBVideo[] => {
  return videos.filter(
    (v) =>
      v.site === "YouTube" &&
      (v.type === "Bloopers" || v.type === "Behind the Scenes")
  );
};
