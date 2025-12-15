export const usePopular = async (mediaType: string, language: string) => {
  if (mediaType === "tv") {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/tv/day&language=${language}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_APP_ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    const populerDatas = data.results.slice(0, 10);
    return populerDatas;
  } else {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_APP_ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    const populerDatas = data.results.slice(0, 10);
    return populerDatas;
  }
};
