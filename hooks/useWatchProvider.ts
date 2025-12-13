import { WatchProviderResponse } from "@/constants/Videos";

const useWatchProvider = async (
  id: string,
  mediaType: string
): Promise<WatchProviderResponse> => {
  let data = {};
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_APP_ACCESS_TOKEN}`,
      },
    }
  );
  data = await response.json();

  return data;
};

export default useWatchProvider;
