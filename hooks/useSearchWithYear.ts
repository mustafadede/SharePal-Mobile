import i18n from "@/i18n/i18n";

const useSearchWithYear = async (title: string, year: string) => {
  const tmdbLanguage =
    i18n.language === "tr"
      ? "tr-TR"
      : i18n.language === "en"
        ? "en-US"
        : "en-US";

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${title}&include_adult=false&language=${tmdbLanguage}&append_to_response=videos,credits,images&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_APP_ACCESS_TOKEN}`,
        },
      },
    );
    const data = await response.json();
    const filteredData = data.results.filter((item) =>
      item.release_date?.includes(year)
        ? item
        : item.first_air_date?.includes(year)
          ? item
          : null,
    );
    return filteredData[0];
  } catch (err) {
    console.log(err);
  }
};

export default useSearchWithYear;
