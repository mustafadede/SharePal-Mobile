import { movieGenresJSON, tvGenresJSON } from "@/assets/genre/genreData";
import React from "react";
import { Text, View } from "react-native";
import StatusLabel from "../StatusLabel/StatusLabel";

const GenreBadges = ({
  genre_ids,
  mediaType,
}: {
  genre_ids: never[];
  mediaType: "tv" | "movie";
}) => {
  return (
    <View className="flex-row flex-wrap px-4 pt-24 justify-center gap-2">
      {genre_ids && genre_ids.length > 0 ? (
        genre_ids
          .filter((genre) => typeof genre === "number")
          .map((genre) => {
            const genreName =
              mediaType === "movie"
                ? movieGenresJSON.find((item) => item.id === genre)?.name
                : tvGenresJSON.find((item) => item.id === genre)?.name;

            if (!genreName) return null;

            return (
              <View
                key={genre}
                className="px-3 py-1 rounded-full 
                   bg-black/10 dark:bg-white/10"
              >
                <Text className="text-sm text-slate-700 dark:text-slate-300">
                  {genreName}
                </Text>
              </View>
            );
          })
          .filter(Boolean)
      ) : (
        <StatusLabel />
      )}
    </View>
  );
};

export default GenreBadges;
