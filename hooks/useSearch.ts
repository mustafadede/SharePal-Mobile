const useSearch = async (search: string, setSearch: (data) => void, type: string) => {
  try {
    if (search === "") return;
    if (search) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${type}?query=${search}&include_adult=false&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_APP_ACCESS_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      setSearch(data.results);
    }
  } catch (err) {
    console.log(err);
  }
};

export default useSearch;
