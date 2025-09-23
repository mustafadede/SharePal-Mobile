import { Post } from "@/constants/Post";
import { BlurView } from "expo-blur";
import React, { useRef, useState } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const FeedCardContent = ({
  data,
  haveSpoiler = false,
}: {
  data: Post;
  haveSpoiler?: boolean;
}) => {
  const colorScheme = useColorScheme();
  const [spoiler, setSpoiler] = useState(haveSpoiler);

  // Animated opacity for overlay/blur
  const opacity = useRef(new Animated.Value(haveSpoiler ? 1 : 0)).current;

  const handleReveal = () => {
    if (spoiler) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500, // fade speed
        useNativeDriver: true,
      }).start(() => {
        setSpoiler(false);
      });
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleReveal} activeOpacity={0.8}>
        <View className="overflow-hidden rounded-lg">
          <Text
            numberOfLines={2}
            className="text-white mb-2"
            style={{ padding: 8 }}
          >
            {data.content}
          </Text>

          {/* Spoiler overlay */}
          {spoiler && (
            <Animated.View
              style={[StyleSheet.absoluteFill, { opacity }]}
              pointerEvents="none"
            >
              {Platform.OS === "ios" ? (
                <BlurView
                  intensity={20}
                  tint={colorScheme === "dark" ? "dark" : "light"}
                  style={StyleSheet.absoluteFill}
                />
              ) : (
                <View
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      backgroundColor:
                        colorScheme === "dark"
                          ? "rgba(0,0,0,0.6)"
                          : "rgba(255,255,255,0.6)",
                    },
                  ]}
                />
              )}
            </Animated.View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FeedCardContent;
