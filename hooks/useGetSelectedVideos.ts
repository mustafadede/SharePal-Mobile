interface GetSelectedVideosResponse {
  id: number;
  results: Record<string, any>;
}

const useGetSelectedVideos = async (
  id: string,
  mediaType: string,
  language: string
): Promise<GetSelectedVideosResponse> => {
  let data = {};

  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=${language}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_APP_ACCESS_TOKEN}`,
      },
    }
  );
  data = await response.json();

  return {
    id: data.id,
    results: data.results,
  };
};

export default useGetSelectedVideos;
