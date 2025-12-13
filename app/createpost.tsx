import AttachItem from "@/common/AttachItem";
import Recommendation from "@/common/Recommendation";
import { Colors } from "@/constants/Colors";
import { createPostAction } from "@/services/firebaseActions";
import { RootState } from "@/store";
import { createPostsActions } from "@/store/createpostSlice";
import { postsActions } from "@/store/postSlice";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import * as Haptics from "expo-haptics";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

const CreatePost = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { userId, photoURL, nick } = useSelector(
    (state: RootState) => state.profile
  );
  const { createdPost, createdPostLength } = useSelector(
    (state: RootState) => state.createpost
  );
  const navigation = useNavigation();

  const handleAttachment = () => {
    router.push("/attachtopost");
  };

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

  useEffect(() => {
    if (createdPost.spoiler) dispatch(createPostsActions.setSpoiler());
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        createdPostLength > 0 && createdPostLength <= 280 ? (
          <TouchableOpacity onPress={handlePost}>
            <Feather
              name="send"
              size={24}
              color={
                colorScheme === "dark"
                  ? Colors.dark.cWhite
                  : Colors.dark.cGradient2
              }
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled>
            <Feather name="send" size={24} color={Colors.dark.icon} />
          </TouchableOpacity>
        ),
    });
  }, [createdPostLength, createdPost.spoiler]);

  return (
    <GestureHandlerRootView className="w-full h-full">
      <ScrollView
        className="flex-1 dark:bg-cGradient2"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Text Input */}
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
              autoFocus
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
                  colorScheme === "dark"
                    ? Colors.dark.cWhite
                    : Colors.dark.tColor1,
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
                id={createPostAction.attachedFilm?.id}
                backdrop={createdPost.attachedFilm?.backdrop}
                mediaType={createdPost.attachedFilm?.mediaType}
                poster={createdPost.attachedFilm?.poster}
                title={createdPost.attachedFilm?.title}
                release_date={createdPost.attachedFilm?.releaseDate}
              />
            </View>
          )}
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between items-center px-4 mt-4">
          <TouchableOpacity
            onPress={handleAttachment}
            className="flex-row items-center flex-1 py-3 px-5 mr-3 rounded-xl bg-fuchsia-600 dark:bg-slate-800"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 2,
            }}
          >
            <Entypo name="attachment" size={18} color="white" />
            <Text className="ml-2 text-white font-medium">
              {t("createpost.attach")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
              dispatch(createPostsActions.setSpoiler());
            }}
            className={`flex-row items-center flex-1 py-3 px-5 rounded-xl ${
              createdPost.spoiler
                ? "bg-fuchsia-600 dark:bg-slate-600"
                : "bg-fuchsia-800 dark:bg-slate-800"
            }`}
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 2,
            }}
          >
            <Feather
              name={createdPost.spoiler ? "lock" : "unlock"}
              size={18}
              color="white"
            />
            <Text className="ml-2 text-white font-medium">
              {t("createpost.spoiler")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recommendations */}
        <View className="mt-6">
          <Recommendation title="Trending" mediaType="movie" />
          <Recommendation title="Search History" mediaType="" />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default CreatePost;
