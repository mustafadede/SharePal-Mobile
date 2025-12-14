import AttachItem from "@/common/AttachItem";
import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import { createPostsActions } from "@/store/createpostSlice";
import React from "react";
import { useTranslation } from "react-i18next";
import { useColorScheme, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

const CreatePostInput = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { createdPost } = useSelector((state: RootState) => state.createpost);
  const { t } = useTranslation();
  return (
    <View>
      <View
        style={{
          backgroundColor: colorScheme === "dark" ? "#1e293b" : "white",
          borderRadius: 16,
          marginHorizontal: 12,
          padding: 12,
          marginTop: 14,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <TextInput
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          clearButtonMode="while-editing"
          selectionColor="#C026D3"
          placeholder={t("createpost.whats")}
          placeholderTextColor={
            colorScheme === "dark" ? "#ffffff" : Colors.dark.tColor1
          }
          style={{
            fontSize: 16,
            color:
              colorScheme === "dark" ? Colors.dark.cWhite : Colors.dark.tColor1,
          }}
          onChange={(e) => {
            dispatch(
              createPostsActions.createPostLength(e.nativeEvent.text.length)
            );
            dispatch(
              createPostsActions.createPost({
                ...createdPost,
                content: e.nativeEvent.text,
              })
            );
          }}
        />
      </View>
      {Object.keys(createdPost.attachedFilm).length > 0 && (
        <View className="px-4">
          <AttachItem
            id={createdPost.attachedFilm?.id}
            backdrop={createdPost.attachedFilm?.backdrop}
            mediaType={createdPost.attachedFilm?.mediaType}
            poster={createdPost.attachedFilm?.poster}
            title={createdPost.attachedFilm?.title}
            release_date={createdPost.attachedFilm?.releaseDate}
          />
        </View>
      )}
    </View>
  );
};

export default CreatePostInput;
