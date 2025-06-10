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
      {haveSpoiler ? (
        <TouchableOpacity onPress={() => setSpoiler(!spoiler)}>
          <BlurView
            intensity={100}
            tint={colorScheme === "dark" ? "dark" : "light"}
            style={{
              backgroundColor:
                colorScheme === "dark"
                  ? "rgba(20,20,20,0.3)"
                  : "rgba(255,255,255,0.7)",
              borderRadius: 8,
              padding: 8,
            }}
          >
            <Text className="text-white mb-2">{data.content}</Text>
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
