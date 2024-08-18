import { Movie } from "@/constants/MovieTypes";
import React from "react";

const useNowPlaying = async (setNowPlaying: React.Dispatch<React.SetStateAction<Movie[] | []>>): Promise<void> => {
  try {
    const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_APP_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    setNowPlaying(data.results);
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
  }
};

export default useNowPlaying;
