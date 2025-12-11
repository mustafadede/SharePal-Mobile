import ShareDetailShare from "@/common/ShareDetailShare";
import ExploreBottomSheet from "@/components/ExploreBottomSheet/ExploreBottomSheet";
import StatusLabel from "@/components/StatusLabel/StatusLabel";
import { Colors } from "@/constants/Colors";
import useSearchWithYear from "@/hooks/useSearchWithYear";
import {
  getSelectedUserUnfinished,
  getSelectedUserWantToWatch,
  getSelectedUserWatched,
} from "@/services/firebaseActions";
import { RootState } from "@/store";
import { searchDetailActions } from "@/store/searchDetailSlice";
import { shareSearchDetailAction } from "@/store/shareSearchDetail";
import { DateFormatter } from "@/utils/formatter";
import Feather from "@expo/vector-icons/Feather";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
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

const searchdetail = () => {
  const viewRef = useRef(null);
  const { displayName, email } = useSelector(
    (state: RootState) => state.profile
  );
  const colorScheme = useColorScheme();
  const [isShared, setIsShared] = useState(false);
  const [setStatus, setSetStatus] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);
  const [hasWantToWatch, setHasWantToWatch] = useState(false);
  const [hasUnfinished, setHasUnfinished] = useState(false);
  const [blur, setBlur] = useState(7);
  const [color, setColor] = useState(0);
  const navigation = useNavigation();
  const { id, title, release_date, poster_path, mediaType, backdrop_path } =
    useLocalSearchParams();
  const { nick, userId } = useSelector((state: RootState) => state.profile);
  const newDate = DateFormatter(release_date, "Search");
  const dispatch = useDispatch();
  const [bottomSheetValues, setBottomSheetValues] = useState({
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
  } = useSelector((state: RootState) => state.searchDetail.searchDetail) || {};
  const { shareStatus } = useSelector(
    (state: RootState) => state.shareSearchDetail
  );

  const { t } = useTranslation();

  useEffect(() => {
    setSetStatus(false);
    dispatch(searchDetailActions.clearSearchDetail());
    dispatch(searchDetailActions.setStatus("loading"));
    useSearchWithYear(title, release_date)
      .then((res) => {
        dispatch(searchDetailActions.updateSearchDetail(res));
        dispatch(searchDetailActions.setStatus("done"));
        setSetStatus(true);
      })
      .then(() => {
        getSelectedUserWatched(userId).then((res) => {
          if (res.length > 0) {
            const arr = res.find((item) => item.id.toString() === id);
            arr && setHasWatched(true);
            arr &&
              setBottomSheetValues({ ...bottomSheetValues, watched: true });
          }
        });
        getSelectedUserWantToWatch(userId).then((res) => {
          if (res.length > 0) {
            const arr = res.find((item) => item.id.toString() === id);
            arr && setHasWantToWatch(true);
            arr &&
              setBottomSheetValues({ ...bottomSheetValues, wanttowatch: true });
          }
        });
        getSelectedUserUnfinished(userId).then((res) => {
          if (res.length > 0) {
            const arr = res.find((item) => item.id.toString() === id);
            arr && setHasUnfinished(true);
            arr &&
              setBottomSheetValues({ ...bottomSheetValues, unfinished: true });
          }
        });
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
            <TouchableOpacity onPress={() => setIsShared(!isShared)}>
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
    dispatch(
      shareSearchDetailAction.setLabel(
        hasWatched
          ? "watched"
          : hasWantToWatch
            ? "wanttowatch"
            : hasUnfinished
              ? "unfinished"
              : ""
      )
    );
    dispatch(shareSearchDetailAction.setStatus("done"));
  }, [isShared, setStatus, dispatch]);

  // BottomSheet Section
  const BottomSheetModalRef = useRef<BottomSheetModal>(null);
  const SnapPoints = useMemo(() => ["25%", "45%"], []);
  const handlePresentModalPress = useCallback(() => {
    BottomSheetModalRef.current?.present();
  }, []);

  const HandleSheetChanges = useCallback((index: number) => {}, []);
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
            <View className="w-full h-96 dark:bg-cGradient2">
              <ImageBackground
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
                }}
                className={"w-full h-96 absolute z-0"}
                style={{
                  height: 305,
                }}
                resizeMode="cover"
                blurRadius={7}
              >
                {colorScheme === "dark" ? (
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0.4)", "rgb(14, 11, 19)"]}
                    style={{ flex: 1 }}
                  />
                ) : (
                  <LinearGradient
                    colors={["rgba(255, 255, 255, 0.6)", "rgb(245, 245, 245)"]}
                    style={{ flex: 1 }}
                  />
                )}
              </ImageBackground>
              <View
                className={"flex-1 relative justify-center items-center z-10"}
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
                  }}
                  className={"w-40 h-64 mt-4 bg-cGradient1 rounded-2xl"}
                  style={{ borderWidth: 2, borderColor: Colors.dark.text }}
                />
              </View>
              <View>
                <Text
                  className={
                    "text-xl text-center mb-3 text-slate-700 dark:text-fuchsia-600"
                  }
                >
                  {title}
                </Text>
                <View className={"flex-row justify-center gap-1 items-center"}>
                  <Text
                    className={
                      "text-lg text-center text-slate-600 dark:text-slate-300 mr-2"
                    }
                  >
                    {newDate}
                  </Text>
                  <Text
                    className={
                      "text-lg text-center border border-slate-600 dark:border-slate-300 px-4 rounded-lg text-slate-600 dark:text-slate-300"
                    }
                  >
                    {mediaType === "movie"
                      ? t("searchdetail.movie")
                      : t("searchdetail.tv")}
                  </Text>
                </View>
              </View>
            </View>
            <Animated.View
              entering={FadeInUp.duration(400).delay(800)}
              className={
                "flex-row flex-wrap px-3 pt-2 mt-2 justify-center gap-1 items-center"
              }
            >
              {genre_ids ? (
                genre_ids?.map((genre) => (
                  <Text
                    key={genre}
                    className={
                      "text-sm  border border-slate-700 dark:border-slate-300 text-center px-3 rounded-lg text-black dark:text-slate-300"
                    }
                  >
                    {mediaType === "movie"
                      ? movieGenresJSON.find((item) => item.id === genre)?.name
                      : tvGenresJSON.find((item) => item.id === genre)?.name}
                  </Text>
                ))
              ) : (
                <StatusLabel />
              )}
            </Animated.View>
            <View className="flex-col justify-around w-full px-6 mt-2">
              <Animated.View entering={FadeInUp.duration(400).delay(1200)}>
                <Text className="text-2xl mt-2 text-start text-dark dark:text-slate-200">
                  {t("searchdetail.overview")}
                </Text>
                {overview ? (
                  <>
                    <Text
                      className="text-md text-start my-2 text-slate-600 dark:text-slate-400"
                      numberOfLines={isExpanded ? 0 : 3}
                      onPress={() => setIsExpanded(!isExpanded)}
                    >
                      {overview}
                    </Text>
                  </>
                ) : (
                  <StatusLabel />
                )}
              </Animated.View>
              <Animated.View
                entering={FadeIn.duration(400).delay(1400)}
                className="flex-row justify-between mt-2"
              >
                <Text className="text-2xl text-black dark:text-slate-300 mt-1">
                  {t("searchdetail.rating")}
                </Text>
                <Text className="text-3xl min-h-fit text-start text-fuchsia-400">
                  {`${vote_average}`[0]}{" "}
                  <Text className="text-lg text-black dark:text-slate-300">
                    / 10
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
        <BottomSheetModalProvider>
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
            onChange={HandleSheetChanges}
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
            <BottomSheetView
              style={{
                flex: 1,
                marginTop: 24,
              }}
            >
              <ExploreBottomSheet bottomSheetValues={bottomSheetValues} />
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default searchdetail;
