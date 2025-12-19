import ShareDetailShare from "@/common/ShareDetailShare";
import ExploreBottomSheet from "@/components/ExploreBottomSheet/ExploreBottomSheet";
import BlooperSection from "@/components/SearchDetail/BloopersSection";
import ContentSwitcher from "@/components/SearchDetail/ContentSwitcher";
import GenreBadges from "@/components/SearchDetail/GenreBadges";
import Overview from "@/components/SearchDetail/Overview";
import PeopleActivitySection from "@/components/SearchDetail/PeopleActivitySection/PeopleActivitySection";
import Providers from "@/components/SearchDetail/Providers";
import Rating from "@/components/SearchDetail/Rating";
import SearchDetailHeader from "@/components/SearchDetail/SearchDetailHeader";
import TrailerSection from "@/components/SearchDetail/TrailerSection";
import StatusLabel from "@/components/StatusLabel/StatusLabel";
import { Colors } from "@/constants/Colors";
import {
  ExploreBottomSheetProps,
  SearchDetailParams,
} from "@/constants/SearchDetail";
import useSearchWithYear from "@/hooks/useSearchWithYear";
import i18n from "@/i18n/i18n";
import { RootState } from "@/store";
import { searchDetailActions } from "@/store/searchDetailSlice";
import { shareSearchDetailActions } from "@/store/shareSearchDetail";
import Feather from "@expo/vector-icons/Feather";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutDown,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

const searchdetail = () => {
  const viewRef = useRef(null);
  const colorScheme = useColorScheme();
  const [isShared, setIsShared] = useState(false);
  const [setStatus, setSetStatus] = useState(false);
  const scrollY = useSharedValue(0);
  const [blur, setBlur] = useState(7);
  const [color, setColor] = useState(0);
  const navigation = useNavigation();
  const { id, title, release_date, poster_path, mediaType, backdrop_path } =
    useLocalSearchParams() as SearchDetailParams;
  const { nick } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<"overview" | "social">("overview");
  const [socialFetched, setSocialFetched] = useState(false);
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

  const handleTabChange = (tab: "overview" | "social") => {
    if (tab === "social") {
      // 🔥 SADECE BURADA FETCH
    }
  };

  const headerBgAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, 120],
      [
        "rgba(0,0,0,0)",
        colorScheme === "dark" ? Colors.dark.cGradient2 : Colors.dark.cWhite,
      ]
    );
    return {
      backgroundColor,
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  useEffect(() => {
    setSetStatus(false);

    dispatch(searchDetailActions.clearSearchDetail());
    dispatch(searchDetailActions.setStatus("loading"));

    dispatch(shareSearchDetailActions.setStatus("loading"));
    const tmdbLanguage =
      i18n.language === "tr"
        ? "tr-TR"
        : i18n.language === "en"
          ? "en-US"
          : "en-US";
    useSearchWithYear(title, release_date, tmdbLanguage).then((res) => {
      dispatch(searchDetailActions.updateSearchDetail(res));
      dispatch(searchDetailActions.setStatus("done"));

      dispatch(shareSearchDetailActions.setStatus("done"));

      setSetStatus(true);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Animated.View
          pointerEvents="none"
          style={[
            {
              flex: 1,
            },
            headerBgAnimatedStyle,
          ]}
        />
      ),
      headerRight: () => (
        <View className="flex-row items-center w-8 h-8 rounded-full mb-2">
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
  console.log(mediaType);

  return (
    <View className="flex-1">
      {!isShared && (
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          className="flex-1 dark:bg-cGradient2"
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        >
          {/* BACKDROP + GRADIENT + POSTER */}
          <SearchDetailHeader
            title={title}
            backdrop_path={backdrop_path}
            poster_path={poster_path}
            release_date={release_date}
            mediaType={mediaType}
            sharedValue={scrollY}
          />
          <GenreBadges genre_ids={genre_ids} mediaType={mediaType} />
          <ContentSwitcher
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onTabChange={handleTabChange}
          />
          {activeTab === "overview" && (
            <View className="mt-4">
              <Overview overview={overview} />
              <Rating vote_average={vote_average} />
              <TrailerSection id={id} mediaType={mediaType} />
              <Providers id={id} mediaType={mediaType} />
              <BlooperSection id={id} mediaType={mediaType} />
            </View>
          )}

          {activeTab === "social" && (
            <>
              <PeopleActivitySection />
              {/* ileride */}
              {/* <CommentsSection /> */}
            </>
          )}
        </Animated.ScrollView>
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
        <Animated.View
          entering={FadeInDown.springify().delay(700)}
          exiting={FadeOutDown.springify().delay(700)}
        >
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
        </Animated.View>
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
    </View>
  );
};

export default searchdetail;
