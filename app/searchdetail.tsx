import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { DateFormatter } from "@/utils/formatter";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import useSearchWithYear from "@/hooks/useSearchWithYear";
import { useDispatch } from "react-redux";
import { searchDetailActions } from "@/store/searchDetailSlice";
import { useSelector } from "react-redux";
import StatusLabel from "@/components/StatusLabel/StatusLabel";
import { movieGenresJSON, tvGenresJSON } from "../assets/genre/genreData";
import ActionPill from "@/common/ActionPill";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

const searchdetail = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { id, title, release_date, poster_path, mediaType, backdrop_path } = useLocalSearchParams();
  const newDate = DateFormatter(release_date, "Search");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    adult,
    genre_ids,
    original_language,
    original_title,
    overview,
    popularity,
    video,
    vote_average,
    vote_count,
    episode_run_time,
    first_air_date,
    last_air_date,
    name,
    number_of_episodes,
    number_of_seasons,
    origin_country,
    original_name,
    seasons,
    status,
    type,
  } = useSelector((state) => state.searchDetail.searchDetail);
  useEffect(() => {
    dispatch(searchDetailActions.clearSearchDetail());
    dispatch(searchDetailActions.setStatus("loading"));
    useSearchWithYear(title, release_date).then((res) => {
      dispatch(searchDetailActions.updateSearchDetail(res));
      dispatch(searchDetailActions.setStatus("done"));
    });
  }, []);
  return (
    <View className="flex-1 bg-cGradient2">
      <View className="w-full mt-4 h-96">
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w500/${backdrop_path}` }}
          className={"w-full h-96 absolute z-0 bg-slate-900"}
          resizeMode="cover"
        >
          <LinearGradient colors={["rgba(0, 0, 0, 0.4)", "rgb(14, 11, 19)"]} style={{ flex: 1 }} />
        </ImageBackground>
        <View className={"flex-1 p-4 justify-center items-center z-10"}>
          <Animated.Image
            source={{ uri: `https://image.tmdb.org/t/p/w500/${poster_path}` }}
            className={"w-40 h-64 mt-4 bg-cGradient1 rounded-2xl"}
            style={{ borderWidth: 2, borderColor: Colors.dark.text }}
          />
        </View>
        <View className="mt-0">
          <Animated.Text className={"text-xl text-center text-fuchsia-600"} entering={FadeInDown.duration(400).delay(200)}>
            {title}
          </Animated.Text>
          <Animated.View entering={FadeInDown.duration(400).delay(400)} className={"flex-row justify-center gap-1 mt-1 items-center"}>
            <Text className={"text-lg text-center text-slate-300 mr-2"}>{newDate}</Text>
            <Text className={"text-lg text-center border border-slate-300 px-4 rounded-lg text-slate-300"}>
              {mediaType === "movie" ? "Movie" : "TV"}
            </Text>
          </Animated.View>
        </View>
      </View>
      <Animated.View
        entering={FadeInUp.duration(400).delay(800)}
        className={"flex-row flex-wrap px-3 pt-2 justify-center gap-1 mt-1 items-center"}
      >
        {genre_ids ? (
          genre_ids?.map((genre) => (
            <Text key={genre} className={"text-sm  border border-slate-300 text-center px-3 rounded-lg text-slate-300"}>
              {mediaType === "movie"
                ? movieGenresJSON.find((item) => item.id === genre)?.name
                : tvGenresJSON.find((item) => item.id === genre)?.name}
            </Text>
          ))
        ) : (
          <StatusLabel />
        )}
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(400).delay(1000)} className="flex-row flex-wrap justify-around w-full gap-0 px-3 mt-2">
        <ActionPill type="detail" title={t("actions.wanttowatch")} icon={<FontAwesome name="bookmark-o" size={24} color="white" />} />
        <ActionPill type="detail" title={t("actions.watched")} icon={<FontAwesome name="bookmark" size={24} color="white" />} />
        <ActionPill type="detail" title={t("actions.currentlywatching")} icon={<FontAwesome name="eye" size={24} color="white" />} />
        <ActionPill type="detail" title={t("actions.unfinished")} icon={<Ionicons name="pause-outline" size={24} color="white" />} />
      </Animated.View>
      <View className="flex-row justify-around w-full px-6 mt-2">
        <Animated.View entering={FadeInUp.duration(400).delay(1200)} className="w-2/3">
          <Text className="text-2xl text-start text-slate-200">Overview</Text>
          {overview ? (
            <>
              <Text className="text-md text-start text-slate-400" numberOfLines={isExpanded ? 0 : 2}>
                {overview}
              </Text>
              <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                {!isExpanded ? (
                  <Text className="mt-1 text-start text-fuchsia-600">Read More</Text>
                ) : (
                  <Text className="mt-1 text-start text-fuchsia-600">Close</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <StatusLabel />
          )}
        </Animated.View>
        <Animated.View entering={FadeIn.duration(400).delay(1400)} className="flex-col justify-start w-1/3 ml-4">
          <Text className="text-2xl text-start text-slate-300">Rating</Text>
          <Text className="pt-2 text-3xl min-h-fit text-start text-fuchsia-400">
            {`${vote_average}`[0]} <Text className="text-lg text-slate-300">/ 10</Text>
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default searchdetail;
