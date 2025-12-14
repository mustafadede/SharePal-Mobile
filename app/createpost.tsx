import Recommendation from "@/common/Recommendation";
import AttachToCreatedPost from "@/components/CreatePost/AttachToCreatedPost";
import CreatePostInput from "@/components/CreatePost/CreatePostInput";
import SendButton from "@/components/CreatePost/SendButton";
import SpoilerButton from "@/components/CreatePost/SpoilerButton";

import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CreatePost = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <SendButton />,
    });
  }, []);

  return (
    <GestureHandlerRootView className="w-full h-full">
      <ScrollView
        className="flex-1 dark:bg-cGradient2"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Text Input */}
        <CreatePostInput />
        {/* Buttons */}
        <View className="flex-row justify-between items-center px-4 mt-4">
          <AttachToCreatedPost />
          <SpoilerButton />
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
