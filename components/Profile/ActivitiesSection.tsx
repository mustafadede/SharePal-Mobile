import InfoLabel from "@/common/InfoLabel";
import { Colors } from "@/constants/Colors";
import { Post } from "@/constants/Post";
import {
  getAllSelectedUserPostLikeLists,
  getPreviousPosts,
  getSpecificPost,
} from "@/services/firebaseActions";
import { RootState } from "@/store";
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
import { FlatList, useColorScheme, View } from "react-native";
import { useSelector } from "react-redux";
import FeedCard from "../FeedPage/FeedCard";
import PostOptionsBottomSheet, {
  PostOptionsValues,
} from "../PostOptions/PostOptionsBottomSheet";
import StatusLabel from "../StatusLabel/StatusLabel";

const ActivitiesSection = ({
  user = false,
  handleModal,
}: {
  user?: boolean;
  handleModal: () => void;
}) => {
  const otherProfile = useSelector((state: RootState) => state.userProfile);
  const yourProfile = useSelector((state: RootState) => state.profile);
  const selectedUserId = user ? otherProfile.uid : yourProfile.userId;
  const [likes, setLikes] = useState<Post[]>([]);
  const [loading, setLoading] = useState("loading");
  const [lastPostDate, setLastPostDate] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["37%"], []);
  const handleSheetChanges = useCallback(() => {}, []);
  const colorScheme = useColorScheme();
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

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

  useEffect(() => {
    if (!selectedUserId) return;
    setLikes([]);
    getAllSelectedUserPostLikeLists(selectedUserId).then(async (result) => {
      const posts = await Promise.all(
        result.map((val) => getSpecificPost(val.postId)),
      );

      const filteredPosts = posts.filter(Boolean);

      const sortedPosts = filteredPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setLastPostDate(sortedPosts[sortedPosts.length - 1]?.date);
      setLikes(sortedPosts);

      setLoading("done");
    });
  }, [selectedUserId]);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const fetchMorePosts = () => {
    if (!loadingMore && lastPostDate) {
      setLoadingMore(true);
      getPreviousPosts(lastPostDate).then((res) => {
        if (res.length > 0) {
          setLastPostDate(res[0].date);
          setLikes((prev) => [...prev, ...res]);
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

  return (
    <View className="px-4">
      {loading === "loading" && <StatusLabel />}
      {loading === "done" && (
        <FlatList
          className="flex-1"
          keyExtractor={(item, index) => `post-${item.postId}-${index}`}
          data={likes}
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={16}
          renderItem={renderItem}
          onEndReached={fetchMorePosts}
          onEndReachedThreshold={0.5}
          maxToRenderPerBatch={10}
        />
      )}
      {loading === "done" && likes.length === 0 && (
        <InfoLabel status="profile.noactivities" />
      )}
      {memoBottomSheet}
    </View>
  );
};

export default ActivitiesSection;
