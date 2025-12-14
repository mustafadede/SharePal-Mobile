import { Colors } from "@/constants/Colors";
import { createPostAction } from "@/services/firebaseActions";
import { RootState } from "@/store";
import { createPostsActions } from "@/store/createpostSlice";
import { postsActions } from "@/store/postSlice";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const SendButton = () => {
  const colorScheme = useColorScheme();
  const { createdPostLength, createdPost } = useSelector(
    (state: RootState) => state.createpost
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userId, photoURL, nick } = useSelector(
    (state: RootState) => state.profile
  );

  const handlePost = () => {
    dispatch(
      postsActions.addPost({
        ...createdPost,
        userId,
        nick,
        date: new Date().toISOString(),
        photoURL,
      })
    );
    dispatch(createPostsActions.createPostAttachment({}));
    createPostAction(
      createdPost.content,
      createdPost.attachedFilm,
      createdPost.spoiler,
      nick
    );
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      onPress={handlePost}
      disabled={createdPostLength === 0 || createdPostLength > 280}
    >
      <Feather
        name="send"
        size={24}
        color={
          createdPostLength === 0 || createdPostLength > 280
            ? Colors.dark.icon
            : colorScheme === "dark"
              ? Colors.dark.cWhite
              : Colors.dark.cGradient2
        }
      />
    </TouchableOpacity>
  );
};

export default SendButton;
