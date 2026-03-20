import ExploreCard from "@/components/ExploreCard/ExploreCard";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";

const Recommendation = ({
  title,
  mediaType,
  feed,
}: {
  title: string;
  mediaType: string;
  feed?: boolean;
}) => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();
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
      {!feed && (
        <Text
          className="mb-2 ml-2 text-xl"
          style={{
            fontWeight: 500,
            color: colorScheme === "dark" ? "#e2e8f0" : "black",
          }}
        >
          {title}
        </Text>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: feed ? 185 : 270,
          gap: feed ? 4 : 14,
        }}
      >
        {React.useMemo(() => {
          return data.map((item) => (
            <ExploreCard
              key={item.id}
              feed={feed}
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
        {feed && (
          <Pressable
            onPress={() => {
              router.push("/explore");
            }}
            className="w-fit h-full rounded-full bg-slate-700 flex flex-row items-center text-center justify-around px-4"
          >
            <Text className="text-slate-400 text-lg rounded-full h-32 w-fit">
              {t("feed.seeAll")}
            </Text>
            <Feather
              name="chevron-right"
              size={20}
              color={colorScheme === "dark" ? Colors.dark.tColor1 : "black"}
            />
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default Recommendation;
