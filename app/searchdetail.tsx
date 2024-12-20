import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useNavigation } from "expo-router";
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
import { RootState } from "@/store";
import Feather from "@expo/vector-icons/Feather";
import ShareDetailShare from "@/common/ShareDetailShare";
import { getSelectedUserUnfinished, getSelectedUserWantToWatch, getSelectedUserWatched } from "@/services/firebaseActions";
import { shareSearchDetailAction } from "@/store/shareSearchDetail";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import ExploreBottomSheet from "@/components/ExploreBottomSheet/ExploreBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const searchdetail = () => {
  const viewRef = useRef(null);
  const [isShared, setIsShared] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);
  const [hasWantToWatch, setHasWantToWatch] = useState(false);
  const [hasUnfinished, setHasUnfinished] = useState(false);
  const [blur, setBlur] = useState(7);
  const [color, setColor] = useState(0);
  const navigation = useNavigation();
  const { id, title, release_date, poster_path, mediaType, backdrop_path } = useLocalSearchParams();
  const { nick, userId } = useSelector((state: RootState) => state.profile);
  const newDate = DateFormatter(release_date, "Search");
  const dispatch = useDispatch();
  const [bootomSheetValues, setBottomSheetValues] = useState({
    title: title,
    release_date: release_date,
    poster_path: poster_path,
    mediaType: mediaType,
    id: id,
    wanttowatch: hasWantToWatch,
    watched: hasWatched,
    unfinished: hasUnfinished,
  });
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
  } = useSelector((state: RootState) => state.searchDetail.searchDetail);
  const { shareStatus } = useSelector((state: RootState) => state.shareSearchDetail);

  useEffect(() => {
    dispatch(searchDetailActions.clearSearchDetail());
    dispatch(searchDetailActions.setStatus("loading"));
    useSearchWithYear(title, release_date)
      .then((res) => {
        dispatch(searchDetailActions.updateSearchDetail(res));
        dispatch(searchDetailActions.setStatus("done"));
      })
      .then(() => {
        getSelectedUserWatched(userId).then((res) => {
          if (res.length > 0) {
            const arr = res.find((item) => item.id.toString() === id);
            arr && setHasWatched(true);
            arr && setBottomSheetValues({ ...bootomSheetValues, watched: true });
          }
        });
        getSelectedUserWantToWatch(userId).then((res) => {
          if (res.length > 0) {
            const arr = res.find((item) => item.id.toString() === id);
            arr && setHasWantToWatch(true);
            arr && setBottomSheetValues({ ...bootomSheetValues, wanttowatch: true });
          }
        });
        getSelectedUserUnfinished(userId).then((res) => {
          if (res.length > 0) {
            const arr = res.find((item) => item.id.toString() === id);
            arr && setHasUnfinished(true);
            arr && setBottomSheetValues({ ...bootomSheetValues, unfinished: true });
          }
        });
      });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View className="flex-row items-center">
          {/* <TouchableOpacity onPress={() => {}} className="mr-4">
            <Feather name="plus" size={28} color="white" />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => setIsShared(!isShared)}>
            {isShared ? <Feather name="x" size={24} color="white" /> : <Feather name="share" size={24} color="white" />}
          </TouchableOpacity>
        </View>
      ),
    });
    dispatch(shareSearchDetailAction.setLabel(hasWatched ? "watched" : hasWantToWatch ? "wanttowatch" : hasUnfinished ? "unfinished" : ""));
    dispatch(shareSearchDetailAction.setStatus("done"));
  }, [isShared]);

  // BottomSheet Section
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["20%", "25%", "45%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  return (
    <GestureHandlerRootView className="flex-1">
      {!isShared && (
        <ScrollView className="flex-1 mt-20 bg-cGradient2">
          <View className="w-full h-96">
            <ImageBackground
              source={{ uri: `https://image.tmdb.org/t/p/original/${backdrop_path}` }}
              className={"w-full h-96 absolute z-0 bg-slate-900"}
              resizeMode="cover"
              blurRadius={7}
            >
              <LinearGradient colors={["rgba(0, 0, 0, 0.4)", "rgb(14, 11, 19)"]} style={{ flex: 1 }} />
            </ImageBackground>
            <View className={"flex-1 relative justify-center items-center z-10"}>
              <Animated.Image
                source={{ uri: `https://image.tmdb.org/t/p/original/${poster_path}` }}
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
            className={"flex-row flex-wrap px-3 pt-2 justify-center gap-1 items-center"}
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
        </ScrollView>
      )}
      {isShared && (
        <ShareDetailShare
          viewRef={viewRef}
          nick={nick}
          title={title}
          mediaType={mediaType}
          backdrop_path={backdrop_path}
          poster_path={poster_path}
          color={color}
          setColor={setColor}
          shareStatus={shareStatus}
          blur={blur}
          setBlur={setBlur}
        />
      )}
      <TouchableOpacity
        onPress={handlePresentModalPress}
        activeOpacity={0.8}
        style={{
          position: "absolute",
          borderColor: Colors.dark.cDarkGray,
          bottom: 10,
          right: 10,
          backgroundColor: Colors.dark.cGradient2,
          borderRadius: 50,
          padding: 14,
          elevation: 5,
          borderWidth: 1,
        }}
      >
        <Feather name="plus" size={32} color={Colors.dark.cWhite} />
      </TouchableOpacity>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={2}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          keyboardBlurBehavior="none"
          handleIndicatorStyle={{ backgroundColor: "rgb(100 116 139)" }}
          keyboardBehavior="interactive"
          android_keyboardInputMode="adjustPan"
          backgroundComponent={({ style }) => (
            <View
              style={[
                style,
                {
                  backgroundColor: Colors.dark.cGradient2,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            />
          )}
        >
          <BottomSheetView style={{ flex: 1, marginTop: 10 }}>
            <ExploreBottomSheet bottomSheetValues={bootomSheetValues} />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default searchdetail;
