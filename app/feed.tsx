import InfoLabel from "@/common/InfoLabel";
import ExploreBottomSheet from "@/components/ExploreBottomSheet/ExploreBottomSheet";
import FeedCard from "@/components/FeedPage/FeedCard";
import PostOptionsBottomSheet, {
  PostOptionsValues,
} from "@/components/PostOptions/PostOptionsBottomSheet";
import { Colors } from "@/constants/Colors";
import { Post } from "@/constants/Post";
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
import {
  FlatList,
  Platform,
  RefreshControl,
  useColorScheme,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { flatListRef } from "./(tabs)/_layout";

const Feed = ({ handleModal }: { handleModal: () => void }) => {
  const { showModal } = useSelector((state: RootState) => state.createpost);
  const { userId } = useSelector((state: RootState) => state.profile);
  const { posts, status } = useSelector((state: RootState) => state.post);
  const [lastPostDate, setLastPostDate] = useState(null); // Son post tarihini tut
  const [loadingMore, setLoadingMore] = useState(false); // Ek yükleme durumunu takip et
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const FilmbottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["37%"], []);
  const defaultBottomSheetValues: PostOptionsValues = {
    title: "",
    release_date: "",
    poster_path: "",
    mediaType: "",
    id: 0,
    wanttowatch: false,
    watched: false,
    unfinished: false,
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
  }, [userId, isRefreshing]);

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
    ({ item, index }: { item: Post; index: number }) => (
      <FeedCard
        data={item}
        index={index}
        handleModal={handleModal}
        setBottomSheetValues={setBottomSheetValues}
        handleOptions={handlePresentModalPress}
      />
    ),
    [handleModal, handlePresentModalPress],
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
          className="px-2"
          contentContainerStyle={{ paddingTop: 64 }}
          keyExtractor={(item, index) =>
            item.postId?.toString() ?? `post-${index}`
          }
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
          data={posts}
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
