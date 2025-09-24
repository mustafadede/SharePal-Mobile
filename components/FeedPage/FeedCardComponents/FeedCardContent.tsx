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
  const [open, setOpen] = useState(false);
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
    } else {
      setOpen((prev) => !prev);
    }
  };

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

          {/* Spoiler overlay */}
          {spoiler && (
            <Animated.View
              style={[StyleSheet.absoluteFill, { opacity }]}
              pointerEvents="none"
            >
              <BlurView
                intensity={Platform.OS === "android" ? 10 : 20}
                tint={colorScheme === "dark" ? "dark" : "light"}
                style={StyleSheet.absoluteFill}
                experimentalBlurMethod="dimezisBlurView"
              />
            </Animated.View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FeedCardContent;
