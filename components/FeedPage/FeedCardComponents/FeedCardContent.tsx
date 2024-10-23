import { Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Post } from "@/constants/Post";

const FeedCardContent = ({ data, haveSpoiler = false }: { data: Post; haveSpoiler?: boolean }) => {
  const [spoiler, setSpoiler] = useState(haveSpoiler);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <View>
      {haveSpoiler ? (
        <TouchableOpacity onPress={() => setSpoiler(!spoiler)}>
          <Text style={spoiler ? styles.textWithSpoiler : styles.textWithoutSpoiler}>{data.content}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setIsExpanded(true)}>
          <Text style={styles.textWithoutSpoiler} numberOfLines={isExpanded ? 0 : 2}>
            {data?.content}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = {
  textWithSpoiler: {
    color: "transparent",
    textShadowColor: "white",
    textShadowOffset: { width: 3, height: -1 },
    textShadowRadius: 10.4,
    marginBottom: 8,
    fontSize: 16,
  },
  textWithoutSpoiler: {
    color: "white",
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "normal",
  },
};

export default FeedCardContent;
