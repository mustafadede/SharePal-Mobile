import ExploreCard from "@/components/ExploreCard/ExploreCard";
import useSearchWithId from "@/hooks/useSearchWithId";
import useUpcoming from "@/hooks/useUpcoming";
import { getSelectedUserUnfinished } from "@/services/firebaseActions";
import { RootState } from "@/store";
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
import { useSelector } from "react-redux";

const Recommendation = ({
  title,
  mediaType,
  setMediaType,
  feed,
}: {
  title: string;
  mediaType: string;
  feed?: boolean;
  setMediaType?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();
  const profile = useSelector((state: RootState) => state.profile);
  const unFinishedFlag = title === "unfinished" ? true : false;
  useEffect(() => {
    const fetchData = async () => {
      const resultNumber = feed ? 5 : 10;
      try {
        const url = `https://api.themoviedb.org/3/trending/${mediaType}/day`;
        const response = await fetch(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_APP_ACCESS_TOKEN}`,
          },
        });
        const json = await response.json();
        setData(json.results.slice(0, resultNumber));
      } catch (error) {
        console.error("usePopular error:", error);
      }
    };

    const fetchUnfinished = async () => {
      getSelectedUserUnfinished(profile.userId).then((res) => {
        res.forEach((item) => {
          useSearchWithId(item.id, item.mediaType).then((data) => {
            setData((prevData) => [
              ...prevData,
              {
                ...data,
                media_type: item.mediaType,
              },
            ]);
          });
        });
      });
    };

    const fetchUpcoming = async () => {
      useUpcoming(setData);
    };
    title === "upcoming" && fetchUpcoming();
    title === "trending" && fetchData();
    title === "unfinished" && fetchUnfinished();
  }, [mediaType, title]);

  return (
    <View className="py-2 h-max">
      <View className="flex-1 flex-row justify-between mb-4 ">
        <Text
          className="text-xl"
          style={{
            fontWeight: 600,
            color: colorScheme === "dark" ? "#e2e8f0" : "black",
          }}
        >
          {title === "trending"
            ? t("explore.trend")
            : title === "upcoming"
              ? t("explore.upcoming")
              : title === "unfinished"
                ? t("feed.unfinished")
                : title}
        </Text>
        {feed && !unFinishedFlag && (
          <Pressable
            onPress={() => {
              router.push("/explore");
            }}
            className="w-fit rounded-full bg-slate-700 flex flex-row items-center text-center px-4"
          >
            <Text className="text-slate-200 rounded-full">
              {t("feed.seeAll")}
            </Text>
          </Pressable>
        )}
      </View>
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
      </ScrollView>
    </View>
  );
};

export default Recommendation;
