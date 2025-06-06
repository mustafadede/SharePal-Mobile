import { Post } from "@/constants/Post";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
const FeedCardContent = ({
  data,
  haveSpoiler = false,
}: {
  data: Post;
  haveSpoiler?: boolean;
}) => {
  const [spoiler, setSpoiler] = useState(haveSpoiler);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <View>
      {haveSpoiler ? (
        <TouchableOpacity onPress={() => setSpoiler(!spoiler)}>
          <BlurView intensity={50} tint="dark">
            <Text className="text-white mb-2">{data.content}</Text>
          </BlurView>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setIsExpanded(true)}>
          <Text numberOfLines={isExpanded ? 0 : 2} className="text-white mb-2">
            {data?.content}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FeedCardContent;
