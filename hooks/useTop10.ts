import { Movie } from "@/constants/MovieTypes";

const useTop10 = async (info: string, setTop10: React.Dispatch<React.SetStateAction<Movie[] | []>>): Promise<void> => {
  if (info === "series") {
    const response = await fetch("https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_APP_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    const newData = data.results.slice(0, 10);
    setTop10(newData);
  }
  if (info === "movies") {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.EXPO_PUBLIC_APP_KEY}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_APP_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    const newData = data.results.slice(0, 10);
    setTop10(newData);
  }
};
export default useTop10;
