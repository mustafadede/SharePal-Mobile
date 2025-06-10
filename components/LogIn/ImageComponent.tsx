import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { useColorScheme, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const images = new Array(6).fill(
  "https://m.media-amazon.com/images/M/MV5BZjE4ZDU4ZjMtZjliYS00M2ZmLThkNTItN2U3MmJjOGU0NmIxXkEyXkFqcGc@._V1_.jpg"
);

const CARD_HEIGHT = 400;
const SPACING = 24;
const TOTAL_HEIGHT = (CARD_HEIGHT + SPACING) * images.length;

const AnimatedView = Animated.createAnimatedComponent(View);

const ImageComponent = () => {
  const translateY = useSharedValue(0);
  const colorScheme = useColorScheme();

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-TOTAL_HEIGHT, {
        duration: 20000,
      }),
      -1,
      false
    );
  }, [translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <>
      <View className="absolute top-0 left-0 right-0 w-full h-96 overflow-hidden items-center z-0">
        <AnimatedView style={[animatedStyle]}>
          {/* Duplicate to fill loop space */}
          {[...images, ...images].map((uri, i) => (
            <View
              key={i}
              style={{
                height: CARD_HEIGHT,
                width: 200,
                marginBottom: SPACING,
                borderRadius: 16,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#94a3b8",
              }}
            >
              <Animated.Image
                source={{ uri }}
                resizeMode="cover"
                style={{ height: "100%", width: "100%" }}
              />
            </View>
          ))}
        </AnimatedView>
      </View>

      <LinearGradient
        colors={[
          colorScheme === "dark" ? "rgb(14, 11, 19)" : "transparent",
          "transparent",
        ]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "39%",
          zIndex: 10,
        }}
      />
    </>
  );
};

export default ImageComponent;
