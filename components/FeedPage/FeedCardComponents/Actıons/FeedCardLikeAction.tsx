import { Colors } from "@/constants/Colors";
import { Like } from "@/constants/Post";
import {
  createNotification,
  createSelectedUserPostLikeLists,
  removeSelectedUserPostLikeLists,
  updateSelectedPost,
} from "@/services/firebaseActions";
import { RootState } from "@/store";
import { postsActions } from "@/store/postSlice";
import Entypo from "@expo/vector-icons/Entypo";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const FeedCardLikeAction = ({ data }) => {
  const colorScheme = useColorScheme();
  const [isLiked, setIsLiked] = useState(false);
  const { userId, displayName, photoURL } = useSelector(
    (state: RootState) => state.profile,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    data?.likesList?.map((likedUser: { id: string }) => {
      likedUser?.id === userId && setIsLiked(true);
    });
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      updateSelectedPost(data.postId, {
        likes: data.likes + 1,
        likesList: data.likesList
          ? [...data.likesList, { id: userId, nick: displayName }]
          : [{ id: userId, nick: displayName }],
      }).then(() => {
        dispatch(
          postsActions.updateLike({
            postId: data.postId,
            likes: data.likes + 1,
            likesList: data.likesList
              ? [...data.likesList, { id: userId, nick: displayName }]
              : [{ id: userId, nick: displayName }],
          }),
        );
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        createSelectedUserPostLikeLists({
          userId,
          data: {
            id: data.userId,
            date: new Date().toISOString(),
            postId: data.postId,
          },
        }).then(() => {
          createNotification(data.userId, {
            from: {
              uid: userId,
              nick: displayName,
              photo: photoURL,
              postId: data.postId,
            },
            date: new Date().toISOString(),
            type: "like",
          });
        });
      });
    } else {
      dispatch(
        postsActions.updateLike({
          postId: data.postId,
          likes: data.likes - 1,
          likesList: data.likesList?.filter((val: Like) => val.id !== userId),
        }),
      );
      updateSelectedPost(data.postId, {
        likes: data.likes - 1,
        likesList: data.likesList?.filter((val: Like) => val.id !== userId),
      }).then((data) => {
        data && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      });
      removeSelectedUserPostLikeLists({ postId: data.postId, userId });
    }
  };

  return (
    <TouchableOpacity
      className={"flex flex-row flex-1 items-center justify-center gap-2"}
      onPress={handleLike}
    >
      {!isLiked && (
        <Entypo
          name={"heart-outlined"}
          size={23}
          color={colorScheme === "dark" ? Colors.dark.tColor1 : "black"}
        />
      )}
      {isLiked && <Entypo name={"heart"} size={23} color={Colors.dark.cFuc6} />}
      <Text
        className={
          isLiked ? "text-fuchsia-600" : "text-black dark:text-slate-400"
        }
      >
        {data?.likes}
      </Text>
    </TouchableOpacity>
  );
};

export default FeedCardLikeAction;
