import { Post } from "@/constants/Post";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const FeedCardContent = ({
  data,
  haveSpoiler = false,
}: {
  data: Post;
  haveSpoiler?: boolean;
}) => {
  const colorScheme = useColorScheme();
  const [spoiler, setSpoiler] = useState(haveSpoiler);
  const [open, setOpen] = useState(false);
  const revealProgress = useSharedValue(haveSpoiler ? 1 : 0);

  const handleReveal = () => {
    if (spoiler) {
      revealProgress.value = withTiming(0, {
        duration: 450,
        easing: Easing.out(Easing.cubic),
      });
      setTimeout(() => setSpoiler(false), 450);
    } else {
      setOpen((prev) => !prev);
    }
  };

  const spoilerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: revealProgress.value }],
      opacity: revealProgress.value,
    };
  });

  return (
    <View>
      <TouchableOpacity onPress={handleReveal} activeOpacity={0.8}>
        <View className="overflow-hidden rounded-lg">
          <Text
            numberOfLines={open ? undefined : 3}
            className="text-slate-700 dark:text-white mb-2"
            style={{ padding: 8 }}
          >
            {data.content}
          </Text>

          {spoiler && (
            <Animated.View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                Platform.OS === "android"
                  ? [
                      {
                        backgroundColor:
                          colorScheme === "dark" ? "#0f172a" : "#ffffff",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      spoilerStyle,
                    ]
                  : spoilerStyle,
              ]}
            >
              {Platform.OS === "ios" ? (
                <BlurView
                  intensity={20}
                  tint={colorScheme === "dark" ? "dark" : "light"}
                  style={StyleSheet.absoluteFill}
                />
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <Feather
                    name="lock"
                    size={16}
                    color={colorScheme === "dark" ? "#6B7280" : "black"}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      opacity: 0.9,
                    }}
                    className="text-slate-600 dark:text-white"
                  >
                    İçeriği görmek için dokun
                  </Text>
                </View>
              )}
            </Animated.View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FeedCardContent;
