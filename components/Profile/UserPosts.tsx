import InfoLabel from "@/common/InfoLabel";
import { Colors } from "@/constants/Colors";
import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const UserPosts = ({ handleModal }) => {
  // const profile = useSelector((state: RootState) => state.profile);
  // const colorScheme = useColorScheme();
  // const dispatch = useDispatch();
  // const [posts, setPosts] = useState<any[]>();
  // const { status } = useSelector((state: RootState) => state.post);

  // getSelectedUserPostsList(profile.userId).then((userPostIds) => {
  //   userPostIds?.forEach((postId) => {
  //     getSelectedUserPosts(postId).then((userPosts) => {
  //       setPosts(userPosts);
  //     });
  //   });
  // });

  // const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   const scrollPosition = event.nativeEvent.contentOffset.y;
  //   dispatch(scrollActions.updateScrollPosition(scrollPosition));
  // };

  // const renderItem = ({ item, index }) => {
  //   return <FeedCard data={item} index={index} handleModal={handleModal} />;
  // };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "android" ? -500 : 0}
        className={"flex-1 z-0 w-full h-full px-3"}
        style={{
          backgroundColor:
            colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
          width: "100%",
          height: "100%",
        }}
      >
        {status === "loading" && (
          <View className={"pt-20"}>
            <InfoLabel status="feed.loading" />
          </View>
        )}
        {/* {status === "done" && (
          <FlatList
            ref={flatListRef}
            className="pt-20 pb-20"
            keyExtractor={(item, index) => item.postId + index.toString()}
            data={posts}
            showsVerticalScrollIndicator={true}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
            maxToRenderPerBatch={10}
          />
        )} */}
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default UserPosts;
