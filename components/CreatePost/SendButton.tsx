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
    (state: RootState) => state.createpost,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userId, photoURL, nick } = useSelector(
    (state: RootState) => state.profile,
  );

  const handlePost = () => {
    const hasAttachment =
      createdPost.attachedFilm &&
      Object.keys(createdPost.attachedFilm).length > 0;

    createPostAction(
      createdPost.content,
      createdPost.attachedFilm,
      createdPost.spoiler,
      nick,
    ).then((post) => {
      dispatch(postsActions.addPost(post));
    });

    dispatch(createPostsActions.resetCreatePost());

    navigation.goBack();
    hasAttachment &&
      dispatch(
        createPostsActions.toggleModal({
          title: createdPost.attachedFilm.title,
          release_date: createdPost.attachedFilm.releaseDate,
          poster_path: createdPost.attachedFilm.poster,
          mediaType: createdPost.attachedFilm.mediaType,
          id: createdPost.attachedFilm.id,
          wanttowatch: false,
          watched: false,
          unfinished: false,
        }),
      );
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
