import { Colors } from "@/constants/Colors";
import {
  createPostAction,
  updateSelectedPost,
} from "@/services/firebaseActions";
import { RootState } from "@/store";
import { createPostsActions } from "@/store/createpostSlice";
import { postsActions } from "@/store/postSlice";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner-native";

const SendButton = ({
  edit,
  text,
  spoiler,
  postId,
}: {
  edit: boolean;
  text?: string;
  spoiler?: boolean;
  postId?: string;
}) => {
  const colorScheme = useColorScheme();
  const { createdPostLength, createdPost } = useSelector(
    (state: RootState) => state.createpost,
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { nick } = useSelector((state: RootState) => state.profile);

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

  const editPost = () => {
    dispatch(createPostsActions.setStatus("loading"));
    if (!postId) return;
    updateSelectedPost(postId, {
      content: text,
      spoiler: spoiler,
    })
      .then(() => {
        dispatch(
          postsActions.editPost({
            postId: postId,
            content: text,
            spoiler: spoiler,
            edited: true,
          }),
        );
        navigation.goBack();
        dispatch(createPostsActions.setStatus("done"));
      })
      .catch((err) => {
        toast(t("actions.notupdated"), {
          duration: 3000,
          closeButton: true,
          icon: (
            <FontAwesome
              name="eye-slash"
              size={20}
              color={colorScheme === "dark" ? "#f8fafc" : "black"}
            />
          ),
          style: {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.1)",
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 14,
          },
        });
      });
  };

  return (
    <Pressable
      onPress={() => {
        edit ? editPost() : handlePost();
      }}
      disabled={
        edit ? false : createdPostLength === 0 || createdPostLength > 280
      }
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
    </Pressable>
  );
};

export default SendButton;
