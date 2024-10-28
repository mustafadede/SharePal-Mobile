import { View, Text, RefreshControl, FlatList, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getAllPosts, getSelectedUser } from "@/services/firebaseActions";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { profileActions } from "@/store/profileSlice";
import { ProfileHeader } from "@/constants/Profile";
import { Colors } from "@/constants/Colors";
import FeedCard from "@/components/FeedPage/FeedCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InfoLabel from "@/common/InfoLabel";
import { scrollActions } from "@/store/scrollSlice";
import { flatListRef } from "./(tabs)/_layout";
import { postsActions } from "@/store/postSlice";

const Feed = ({ handleModal }) => {
  const { userId } = useSelector((state: RootState) => state.profile);
  const { posts, status } = useSelector((state: RootState) => state.post);

  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(postsActions.setStatus("loading"));
    getAllPosts().then((res) => {
      dispatch(postsActions.fetchPosts(res));
      setIsRefreshing(false);
      dispatch(postsActions.setStatus("done"));
    });
  };

  useEffect(() => {
    if (userId) {
      dispatch(postsActions.setStatus("loading"));
      getSelectedUser(userId).then((user: ProfileHeader) => {
        dispatch(
          profileActions.updateProfile({
            ...user,
          })
        );

        getAllPosts().then((res) => {
          dispatch(postsActions.fetchPosts(res));
          dispatch(postsActions.setStatus("done"));
        });
      });
    }
  }, [userId, isRefreshing]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    dispatch(scrollActions.updateScrollPosition(scrollPosition));
  };

  const renderItem = useCallback(({ item, index }) => {
    return <FeedCard data={item} index={index} handleModal={handleModal} />;
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className={"flex-1 z-0 w-full h-full px-3"} style={{ backgroundColor: Colors.dark.cGradient2 }}>
        {status === "done" && (
          <FlatList
            ref={flatListRef}
            className="pt-20"
            keyExtractor={(_, index) => index.toString()}
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
            showsVerticalScrollIndicator={false}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            onScroll={handleScroll}
            scrollEventThrottle={32}
            renderItem={renderItem}
          />
        )}
        {status === "loading" && (
          <View className={"pt-20"}>
            <InfoLabel status="Loading..." />
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default Feed;
