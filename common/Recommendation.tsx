import ExploreCard from "@/components/ExploreCard/ExploreCard";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, useColorScheme, View } from "react-native";

const Recommendation = ({
  title,
  mediaType,
}: {
  title: string;
  mediaType: string;
}) => {
  const colorScheme = useColorScheme();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!title.toLowerCase().includes("trending")) return;

    const fetchData = async () => {
      try {
        const url = `https://api.themoviedb.org/3/trending/${mediaType}/day`;
        const response = await fetch(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_APP_ACCESS_TOKEN}`,
          },
        });
        const json = await response.json();
        setData(json.results.slice(0, 10));
      } catch (error) {
        console.error("usePopular error:", error);
      }
    };

    fetchData();
  }, [mediaType, title]);

  return (
    <View className="py-2 h-max">
      <Text
        className="mb-2 ml-2 text-xl"
        style={{
          paddingLeft: 12,
          fontWeight: 500,
          color: colorScheme === "dark" ? "#e2e8f0" : "black",
        }}
      >
        {title}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 270,
          gap: 14,
          paddingLeft: 12,
        }}
      >
        {React.useMemo(() => {
          return data.map((item) => (
            <ExploreCard
              key={item.id}
              item={{
                poster_path: item.poster_path,
                id: item.id,
                original_title: item.original_title || item.name,
                name: item.name || item.original_title,
                media_type: item.media_type || mediaType,
                original_language: item.original_language,
                genres: item.genre_ids,
                first_air_date: item.first_air_date || item.release_date,
              }}
            />
          ));
        }, [data, mediaType])}
      </ScrollView>
    </View>
  );
};

export default Recommendation;
