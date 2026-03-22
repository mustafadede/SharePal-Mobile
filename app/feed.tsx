import InfoLabel from "@/common/InfoLabel";
import ExploreBottomSheet from "@/components/ExploreBottomSheet/ExploreBottomSheet";
import FeedCard from "@/components/FeedPage/FeedCard";
import PostOptionsBottomSheet from "@/components/PostOptions/PostOptionsBottomSheet";
import { Colors } from "@/constants/Colors";
import { Post, PostOptionsValues } from "@/constants/Post";

type FeedItem =
  | { type: "post"; data: Post }
  | { type: "trending"; data: any }
  | { type: "upcoming"; data: any }
  | { type: "top-series"; data: any }
  | { type: "top-movies"; data: any }
  | { type: "unfinished"; data: any };

import Recommendation from "@/common/Recommendation";
import {
  getAllPosts,
  getPreviousPosts,
  getSelectedUser,
} from "@/services/firebaseActions";
import { RootState } from "@/store";
import { createPostsActions } from "@/store/createpostSlice";
import { postsActions } from "@/store/postSlice";
import { profileActions } from "@/store/profileSlice";
import { scrollActions } from "@/store/scrollSlice";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Platform,
  RefreshControl,
  useColorScheme,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { flatListRef } from "./(tabs)/_layout";

const Feed = () => {
  const { showModal } = useSelector((state: RootState) => state.createpost);
  const { userId } = useSelector((state: RootState) => state.profile);
  const { posts, status } = useSelector((state: RootState) => state.post);
  const [lastPostDate, setLastPostDate] = useState<string | null>(null); // Son post tarihini tut
  const [loadingMore, setLoadingMore] = useState(false); // Ek yükleme durumunu takip et
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const FilmbottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%"], []);
  const { t } = useTranslation();
  const [mediaType, setMediaType] = useState<string>("movie");
  const defaultBottomSheetValues: PostOptionsValues = {
    postId: "",
    mediaType: "",
    release_date: "",
    id: 0 as string | number,
    title: "",
    content: "",
    poster: "",
    posterPath: "",
    backdrop: "",
    spoiler: false,
  };

  const [bottomSheetValues, setBottomSheetValues] = useState<PostOptionsValues>(
    defaultBottomSheetValues,
  );

  const [filmBottomSheetValues, setFilmBottomSheetValues] = useState<object>({
    title: "",
    release_date: "",
    poster_path: "",
    mediaType: "",
    id: 0,
    wanttowatch: false,
    watched: false,
    unfinished: false,
  });
  const colorScheme = useColorScheme();
  const scrollY = useRef(0);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleFilmPresentModalPress = useCallback(() => {
    FilmbottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback(() => {}, []);

  useEffect(() => {
    if (showModal.show) {
      setFilmBottomSheetValues(showModal.values);
      handleFilmPresentModalPress();
    }
  }, [showModal, handleFilmPresentModalPress]);

  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(postsActions.setStatus("loading"));
    getAllPosts().then((res) => {
      dispatch(postsActions.fetchPosts(res));
      setLastPostDate(res[res.length - 1].date);
      setIsRefreshing(false);
      dispatch(postsActions.setStatus("done"));
    });
  };

  const handleFilmSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        dispatch(createPostsActions.showModal());
      }
    },
    [showModal],
  );

  useEffect(() => {
    if (userId) {
      getSelectedUser(userId).then((user) => {
        dispatch(profileActions.updateProfile(user));
        if (posts.length === 0) {
          dispatch(postsActions.setStatus("loading"));
          getAllPosts().then((res) => {
            setLastPostDate(res[res.length - 1].date);
            dispatch(postsActions.fetchPosts(res));
            dispatch(postsActions.setStatus("done"));
          });
        }
      });
    }
  }, [isRefreshing]);

  const handleScrollEnd = () => {
    dispatch(scrollActions.updateScrollPosition(scrollY.current));
  };

  // Yeni postları yüklemek için fonksiyon
  const fetchMorePosts = () => {
    if (!loadingMore && lastPostDate) {
      // Yükleme işlemi yapılırken tekrar çağırmaz
      setLoadingMore(true);
      getPreviousPosts(lastPostDate).then((res) => {
        // lastPostDate ile sonraki postları al
        if (res.length > 0) {
          setLastPostDate(res[0].date); // Yeni son post tarihini ayarla
          dispatch(postsActions.fetchMorePosts(res));
        }
        setLoadingMore(false);
      });
    }
  };

  const memoBottomSheet = useMemo(
    () => (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={0}
            appearsOnIndex={1}
            opacity={0.5}
          />
        )}
        onChange={handleSheetChanges}
        keyboardBlurBehavior="none"
        handleIndicatorStyle={{ backgroundColor: "gray" }}
        keyboardBehavior="interactive"
        backgroundComponent={({ style }) => (
          <View
            style={[
              style,
              {
                backgroundColor:
                  colorScheme === "dark"
                    ? Colors.dark.cGradient2
                    : Colors.dark.cWhite,
                borderRadius: 30,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          />
        )}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <PostOptionsBottomSheet
            bottomSheetValues={bottomSheetValues}
            handleClose={handlePresentModalClose}
          />
        </BottomSheetView>
      </BottomSheetModal>
    ),
    [colorScheme, bottomSheetValues],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: FeedItem; index: number }) => {
      switch (item.type) {
        case "post":
          return (
            <FeedCard
              data={item.data}
              index={index}
              setBottomSheetValues={setBottomSheetValues}
              handleOptions={handlePresentModalPress}
            />
          );
        case "trending":
          return (
            <Recommendation title="trending" mediaType="movie" feed={true} />
          );
        case "upcoming":
          return (
            <Recommendation title="upcoming" mediaType="movie" feed={true} />
          );
        case "unfinished":
          return (
            <Recommendation
              title="unfinished"
              mediaType={mediaType}
              setMediaType={setMediaType}
              feed={true}
            />
          );
        default:
          return null;
      }
    },
    [handlePresentModalPress],
  );

  const memoAttachedFilmBottomSheet = useMemo(
    () => (
      <BottomSheetModal
        ref={FilmbottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={0}
            appearsOnIndex={1}
            opacity={0.5}
          />
        )}
        detached={false}
        onChange={handleFilmSheetChanges}
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
                maxHeight: 380,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                borderColor: Colors.dark.cDarkGray,
                borderWidth: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          />
        )}
      >
        <BottomSheetView style={{ flex: 1, marginTop: 10 }}>
          <ExploreBottomSheet
            bottomSheetValues={filmBottomSheetValues}
            setBottomSheetValues={setFilmBottomSheetValues}
            feed={true}
            handlePresentModalClose={handleFilmPresentModalPress}
          />
        </BottomSheetView>
      </BottomSheetModal>
    ),
    [colorScheme, showModal, filmBottomSheetValues],
  );

  const buildFeed = (posts: Post[]): FeedItem[] => {
    const result: FeedItem[] = [];
    let trendingCounter = 0;
    let upcomingCounter = 0;
    let unfinishedCounter = 0;

    posts.forEach((post, index) => {
      result.push({ type: "post", data: post });

      if ((index + 1) % 7 === 0 && trendingCounter < 3) {
        result.push({
          type: "trending",
          data: { id: `trending-${index}` },
        });

        trendingCounter++;
      }

      if ((index + 1) % 11 === 0 && upcomingCounter < 3) {
        result.push({
          type: "upcoming",
          data: { id: `upcoming-${index}` },
        });
        upcomingCounter++;
      }

      if ((index + 1) % 29 === 0 && unfinishedCounter < 3) {
        result.push({
          type: "unfinished",
          data: { id: `unfinished-${index}` },
        });
        unfinishedCounter++;
      }
    });

    return result;
  };

  const feedData = useMemo(() => buildFeed(posts), [posts]);

  return (
    <View className="flex-1">
      {status === "loading" && (
        <View className={"pt-20 flex-1 items-center justify-center"}>
          <InfoLabel status="feed.loading" />
        </View>
      )}
      {status === "done" && (
        <FlatList
          ref={flatListRef}
          className="px-2 flex-1"
          contentContainerStyle={{ paddingTop: 64 }}
          keyExtractor={(item, index) => {
            if (item.type === "post") {
              return item.data.postId?.toString() ?? `post-${index}`;
            }
            return `${item.type}-${item.data.postId}-${index}`;
          }}
          refreshControl={
            <RefreshControl
              colors={["#9F23B3"]}
              refreshing={isRefreshing}
              progressBackgroundColor={
                Platform.OS === "ios"
                  ? undefined
                  : colorScheme === "dark"
                    ? Colors.dark.cGradient2
                    : Colors.dark.cWhite
              }
              onRefresh={onRefresh}
              progressViewOffset={60}
              tintColor={
                colorScheme === "dark"
                  ? Colors.dark.cGradient2
                  : Colors.dark.cWhite
              }
            />
          }
          data={feedData}
          showsVerticalScrollIndicator={true}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          onScroll={(e) => {
            dispatch(
              scrollActions.updateScrollPosition(e.nativeEvent.contentOffset.y),
            );
          }}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
          renderItem={renderItem}
          onEndReached={fetchMorePosts}
          onEndReachedThreshold={0.5}
          maxToRenderPerBatch={10}
        />
      )}
      {memoBottomSheet}
      {memoAttachedFilmBottomSheet}
    </View>
  );
};

export default Feed;
