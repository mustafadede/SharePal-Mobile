import { Post } from "@/constants/Post";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

const FeedCardContent = ({
  data,
  haveSpoiler = false,
}: {
  data: Post;
  haveSpoiler?: boolean;
}) => {
  const colorScheme = useColorScheme();
  const [spoiler, setSpoiler] = useState(haveSpoiler);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View>
      {haveSpoiler && spoiler ? (
        <TouchableOpacity onPress={() => setSpoiler(false)} activeOpacity={0.8}>
          <BlurView
            intensity={10}
            experimentalBlurMethod="dimezisBlurView"
            tint={colorScheme === "dark" ? "dark" : "light"}
            style={{ borderRadius: 8, overflow: "hidden" }}
          >
            <Text
              numberOfLines={2}
              className="text-white mb-2"
              style={{ padding: 8 }}
            >
              {data.content}
            </Text>
          </BlurView>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsExpanded(true)}
        >
          <Text
            numberOfLines={isExpanded ? 0 : 2}
            className="text-black dark:text-white mb-2"
          >
            {data?.content}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FeedCardContent;
