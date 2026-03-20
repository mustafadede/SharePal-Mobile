import SendButton from "@/components/CreatePost/SendButton";
import EditPostInput from "@/components/EditPost/EditPostInput";
import EditSpoiler from "@/components/EditPost/EditSpoiler";
import { PostOptionsValues } from "@/constants/Post";
import { RootState } from "@/store";

import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const EditPost = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams() as unknown as PostOptionsValues;
  const { status } = useSelector((state: RootState) => state.createpost);
  const colorScheme = useColorScheme();
  const safeParams: PostOptionsValues = {
    title: params.title || "",
    release_date: params.release_date || "",
    posterPath: params.posterPath || params?.poster || "",
    backdrop: params.backdrop || "",
    content: params.content || "",
    spoiler: params.spoiler?.toString() || "false",
    mediaType: params.mediaType || "",
    postId: params.postId || "",
    id: params.id || "",
  };
  const [text, setText] = useState(safeParams.content);
  const [spoiler, setSpoiler] = useState(safeParams.spoiler === "true");

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        status === "loading" ? (
          <ActivityIndicator
            color={colorScheme === "dark" ? "#f8fafc" : "black"}
          />
        ) : (
          <SendButton
            edit={true}
            spoiler={spoiler}
            text={text}
            postId={safeParams.postId}
          />
        ),
    });
  }, [status, colorScheme, navigation, safeParams]);

  return (
    <ScrollView
      className="flex-1 dark:bg-cGradient2"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Text Input */}
      <EditPostInput attachedData={safeParams} setText={setText} text={text} />
      {/* Buttons */}
      <View className="flex-row justify-between items-center px-4 mt-4">
        <EditSpoiler spoiler={spoiler} setSpoiler={setSpoiler} />
      </View>
    </ScrollView>
  );
};

export default EditPost;
