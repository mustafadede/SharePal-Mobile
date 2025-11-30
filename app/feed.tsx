import InfoLabel from "@/common/InfoLabel";
import FeedCard from "@/components/FeedPage/FeedCard";
import {
  getAllPosts,
  getPreviousPosts,
  getSelectedUser,
} from "@/services/firebaseActions";
import { RootState } from "@/store";
import { postsActions } from "@/store/postSlice";
import { profileActions } from "@/store/profileSlice";
import { scrollActions } from "@/store/scrollSlice";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { flatListRef } from "./(tabs)/_layout";

const Feed = ({ handleModal }) => {
  const profile = useSelector((state: RootState) => state.profile);
  const { userId } = useSelector((state: RootState) => state.profile);
  const { posts, status } = useSelector((state: RootState) => state.post);
  const [lastPostDate, setLastPostDate] = useState(null); // Son post tarihini tut
  const [loadingMore, setLoadingMore] = useState(false); // Ek yükleme durumunu takip et
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(postsActions.setStatus("loading"));
    getAllPosts().then((res) => {
      dispatch(postsActions.fetchPosts(res));
      setLastPostDate(res[res.length - 1].date); // Son post tarihini güncelle
      setIsRefreshing(false);
      dispatch(postsActions.setStatus("done"));
    });
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     dispatch(postsActions.setStatus("loading"));
  //     getAllPosts().then((res) => {
  //       setLastPostDate(res[res.length - 1].date);
  //       dispatch(postsActions.fetchPosts(res));
  //       dispatch(postsActions.setStatus("done"));
  //     });
  //   }, [dispatch])
  // );

  useEffect(() => {
    if (userId) {
      getSelectedUser(userId).then((user) => {
        dispatch(profileActions.updateProfile(user));
        if (posts.length === 0) {
          dispatch(postsActions.setStatus("loading"));
          getAllPosts().then((res) => {
            setLastPostDate(res[res.length - 1].date); // Son post tarihini ayarla
            dispatch(postsActions.fetchPosts(res));
            dispatch(postsActions.setStatus("done"));
          });
        }
      });
    }
  }, [userId, isRefreshing]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    dispatch(scrollActions.updateScrollPosition(scrollPosition));
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

  const renderItem = ({ item, index }) => {
    return <FeedCard data={item} index={index} handleModal={handleModal} />;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {status === "loading" && (
        <View className={"pt-20"}>
          <InfoLabel status="feed.loading" />
        </View>
      )}
      {status === "done" && (
        <FlatList
          ref={flatListRef}
          className="pt-20 px-2 h-full w-full"
          keyExtractor={(item, index) => item.postId + index.toString()}
          refreshControl={
            <RefreshControl
              colors={["#9F23B3"]}
              refreshing={isRefreshing}
              progressBackgroundColor={"#0E0B13"}
              onRefresh={onRefresh}
              tintColor={"#9F23B3"}
            />
          }
          data={posts}
          showsVerticalScrollIndicator={true}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={renderItem}
          onEndReached={fetchMorePosts}
          onEndReachedThreshold={0.5}
          maxToRenderPerBatch={10}
        />
      )}
    </GestureHandlerRootView>
  );
};

export default Feed;
