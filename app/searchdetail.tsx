import ShareDetailShare from "@/common/ShareDetailShare";
import ExploreBottomSheet from "@/components/ExploreBottomSheet/ExploreBottomSheet";
import StatusLabel from "@/components/StatusLabel/StatusLabel";
import { Colors } from "@/constants/Colors";
import useSearchWithYear from "@/hooks/useSearchWithYear";
import { RootState } from "@/store";
import { searchDetailActions } from "@/store/searchDetailSlice";
import { shareSearchDetailActions } from "@/store/shareSearchDetail";
import { DateFormatter } from "@/utils/formatter";
import Feather from "@expo/vector-icons/Feather";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { movieGenresJSON, tvGenresJSON } from "../assets/genre/genreData";

type ExploreBottomSheetProps = {
  title: string;
  release_date: string;
  poster_path: string;
  mediaType: string;
  id: number;
  currentlywatching: boolean;
  wanttowatch: boolean;
  watched: boolean;
  unfinished: boolean;
};

type SearchDetailParams = {
  id: string;
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  mediaType: "movie" | "tv";
};

const searchdetail = () => {
  const viewRef = useRef(null);
  const { displayName, email } = useSelector(
    (state: RootState) => state.profile
  );
  const colorScheme = useColorScheme();
  const [isShared, setIsShared] = useState(false);
  const [setStatus, setSetStatus] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [blur, setBlur] = useState(7);
  const [color, setColor] = useState(0);
  const navigation = useNavigation();
  const { id, title, release_date, poster_path, mediaType, backdrop_path } =
    useLocalSearchParams() as SearchDetailParams;

  const { nick, userId } = useSelector((state: RootState) => state.profile);
  const newDate = DateFormatter(release_date, "Search");
  const dispatch = useDispatch();
  const [bottomSheetValues, setBottomSheetValues] =
    useState<ExploreBottomSheetProps>({
      title: title,
      release_date: release_date,
      poster_path: poster_path,
      mediaType: mediaType,
      id: Number(id),
      currentlywatching: false,
      wanttowatch: false,
      watched: false,
      unfinished: false,
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
  } = useSelector((state: RootState) => state.searchDetail.searchDetail) || {};
  const { shareStatus } = useSelector(
    (state: RootState) => state.shareSearchDetail
  );

  const { t } = useTranslation();
  useEffect(() => {
    setSetStatus(false);

    dispatch(searchDetailActions.clearSearchDetail());
    dispatch(searchDetailActions.setStatus("loading"));

    dispatch(shareSearchDetailActions.setStatus("loading"));

    useSearchWithYear(title, release_date).then((res) => {
      dispatch(searchDetailActions.updateSearchDetail(res));
      dispatch(searchDetailActions.setStatus("done"));

      dispatch(shareSearchDetailActions.setStatus("done"));

      setSetStatus(true);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View className="flex-row items-center w-8 h-8">
          {/* <TouchableOpacity onPress={() => {}} className="mr-4">
            <Feather name="plus" size={28} color="white" />
          </TouchableOpacity> */}
          {!setStatus && <StatusLabel />}
          {setStatus && (
            <TouchableOpacity
              onPress={() => {
                setIsShared(!isShared);
                dispatch(shareSearchDetailActions.setStatus("loading"));
                setTimeout(() => {
                  dispatch(shareSearchDetailActions.setStatus("done"));
                }, 300);
              }}
            >
              {isShared ? (
                <Feather
                  name="x"
                  size={24}
                  color={
                    colorScheme === "dark" ? "white" : Colors.dark.cDarkGray
                  }
                />
              ) : (
                <Feather
                  name="share"
                  size={24}
                  color={
                    colorScheme === "dark" ? "white" : Colors.dark.cDarkGray
                  }
                />
              )}
            </TouchableOpacity>
          )}
        </View>
      ),
    });
  }, [isShared, setStatus, dispatch]);

  // BottomSheet Section
  const BottomSheetModalRef = useRef<BottomSheetModal>(null);
  const SnapPoints = useMemo(() => ["25%", "45%"], []);
  const handlePresentModalPress = useCallback(() => {
    BottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const handlePresentModalClose = useCallback(() => {
    BottomSheetModalRef.current?.close();
  }, []);
  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            colorScheme === "dark" ? Colors.dark.cGradient2 : "transparent",
        }}
      >
        {!isShared && (
          <ScrollView className="flex-1 dark:bg-cGradient2">
            {/* BACKDROP + GRADIENT + POSTER */}
            <View className="w-full h-96 mb-4 dark:bg-cGradient2">
              <ImageBackground
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
                }}
                className="w-full h-[344px] absolute z-0"
                resizeMode="cover"
                blurRadius={24} // daha yumuşak premium blur
              >
                <LinearGradient
                  colors={
                    colorScheme === "dark"
                      ? ["rgba(0, 0, 0, 0.4)", "rgb(14, 11, 19)"]
                      : ["rgba(255, 255, 255, 0.6)", "rgb(245, 245, 245)"]
                  }
                  style={{ flex: 1 }}
                />
              </ImageBackground>

              {/* POSTER */}
              <View className="flex-1 relative justify-center items-center z-10 mt-6">
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
                  }}
                  className="w-44 h-72 rounded-3xl"
                  style={{
                    shadowColor: "#000",
                    shadowOpacity: colorScheme === "dark" ? 0.26 : 0.18,
                    shadowRadius: 22,
                    shadowOffset: { width: 0, height: 12 },
                  }}
                />
              </View>

              {/* TITLE + DATE + MEDIATYPE */}
              <View className="mt-4">
                <Text className="text-2xl font-semibold text-center text-slate-800 dark:text-fuchsia-400 mb-1">
                  {title}
                </Text>

                <View className="flex-row justify-center items-center gap-2">
                  <Text className="text-base text-slate-600 dark:text-slate-300">
                    {newDate}
                  </Text>

                  <View
                    className="px-3 py-1 rounded-full 
                   bg-slate-200/70 dark:bg-white/10"
                  >
                    <Text className="text-sm text-slate-700 dark:text-slate-300">
                      {mediaType === "movie"
                        ? t("searchdetail.movie")
                        : t("searchdetail.tv")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* GENRE TAGS (MODERN CHIP TASARIM) */}
            <Animated.View
              entering={FadeInUp.duration(400).delay(800)}
              className="flex-row flex-wrap px-4 pt-3 justify-center gap-2"
            >
              {genre_ids ? (
                genre_ids.map((genre) => (
                  <View
                    key={genre}
                    className="px-3 py-1 rounded-full 
                   bg-black/10 dark:bg-white/10"
                  >
                    <Text className="text-sm text-slate-700 dark:text-slate-300">
                      {mediaType === "movie"
                        ? movieGenresJSON.find((item) => item.id === genre)
                            ?.name
                        : tvGenresJSON.find((item) => item.id === genre)?.name}
                    </Text>
                  </View>
                ))
              ) : (
                <StatusLabel />
              )}
            </Animated.View>

            {/* OVERVIEW */}
            <View className="px-6 mt-4">
              <Animated.View entering={FadeInUp.duration(400).delay(1200)}>
                <Text className="text-2xl mt-1 text-start text-dark dark:text-slate-200">
                  {t("searchdetail.overview")}
                </Text>

                {overview ? (
                  <Text
                    className="text-md text-start my-3 text-slate-600 dark:text-slate-400 leading-[22px]"
                    numberOfLines={isExpanded ? 0 : 3}
                    onPress={() => setIsExpanded(!isExpanded)}
                  >
                    {overview}
                  </Text>
                ) : (
                  <StatusLabel />
                )}
              </Animated.View>

              {/* RATING */}
              <Animated.View
                entering={FadeIn.duration(400).delay(1400)}
                className="flex-row justify-between mt-4"
              >
                <Text className="text-2xl text-black dark:text-slate-300 mt-1">
                  {t("searchdetail.rating")}
                </Text>

                <Text className="text-3xl text-fuchsia-400">
                  {`${vote_average}`[0]}
                  <Text className="text-lg text-black dark:text-slate-300">
                    /10
                  </Text>
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
        {!isShared && (
          <TouchableOpacity
            onPress={handlePresentModalPress}
            activeOpacity={0.8}
            style={{
              position: "absolute",
              borderColor:
                colorScheme === "dark"
                  ? Colors.dark.cDarkGray
                  : Colors.dark.cFuc6,
              bottom: 64,
              right: 10,
              backgroundColor:
                colorScheme === "dark"
                  ? Colors.dark.cGradient2
                  : Colors.dark.cFuc6,
              borderRadius: 50,
              padding: 14,
              elevation: 5,
              borderWidth: 1,
            }}
          >
            <Feather name="plus" size={32} color={Colors.dark.cWhite} />
          </TouchableOpacity>
        )}
        <BottomSheetModal
          ref={BottomSheetModalRef}
          index={2}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={1}
              appearsOnIndex={2}
            />
          )}
          snapPoints={SnapPoints}
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
                  backgroundColor:
                    colorScheme === "dark"
                      ? Colors.dark.cGradient2
                      : Colors.dark.cWhite,
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
          <BottomSheetView
            style={{
              flex: 1,
              marginTop: 24,
            }}
          >
            <ExploreBottomSheet
              bottomSheetValues={bottomSheetValues}
              setBottomSheetValues={setBottomSheetValues}
              handlePresentModalClose={handlePresentModalClose}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default searchdetail;
