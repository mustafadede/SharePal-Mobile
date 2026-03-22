const useSearchWithId = async (id: string, type: string) => {
  let data = {};
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}&include_adult=false&language=en-US&page=1`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_APP_ACCESS_TOKEN}`,
      },
    },
  );
  data = await response.json();
  return data;
};

export default useSearchWithId;
