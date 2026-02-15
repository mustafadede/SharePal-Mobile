import { Colors } from "@/constants/Colors";
import React, { useEffect } from "react";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const SplashScreen = () => {
  const textOpacity = useSharedValue(0);
  const colorScheme = useColorScheme();
  useEffect(() => {
    textOpacity.value = withTiming(1, { duration: 800 });
  }, []);
  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));
  return (
    <View
      className={
        colorScheme === "dark"
          ? "flex-1 bg-transparent justify-center gap-6 items-center dark:bg-cGradient2"
          : "flex-1 bg-transparent justify-center gap-6 items-center"
      }
    >
      <Animated.Text
        style={animatedTextStyle}
        className="mb-4 text-5xl z-20 font-bold text-fuchsia-600"
      >
        SharePal
      </Animated.Text>
      <Animated.View style={animatedTextStyle}>
        <ActivityIndicator size={"large"} color={Colors.dark.cFuc6} />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
