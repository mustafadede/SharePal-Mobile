import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const SCREENS = [
  {
    title: "Discover Your World",
    subtitle:
      "Explore movies, lists and creators.\nA cinematic universe for everyone.",
  },
  {
    title: "Share & Follow",
    subtitle: "Build your profile.\nConnect through taste.",
  },
  {
    title: "Experience SharePal",
    subtitle: "Your journey starts now.",
  },
];

export default function Onboarding() {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const handleDone = async () => {
    await AsyncStorage.setItem("seenOnboarding", "1");
    router.replace("/");
  };

  return (
    <LinearGradient colors={["#18043A", "#0E0B13"]} className="flex-1">
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {SCREENS.map((screen, index) => (
          <View
            key={index}
            style={{ width }}
            className="items-center justify-center px-6"
          >
            <Animated.View
              style={{
                opacity: interpolate(
                  scrollX.value,
                  [(index - 1) * width, index * width, (index + 1) * width],
                  [0, 1, 0],
                  Extrapolate.CLAMP
                ),
                transform: [
                  {
                    translateY: interpolate(
                      scrollX.value,
                      [(index - 1) * width, index * width, (index + 1) * width],
                      [50, 0, 50],
                      Extrapolate.CLAMP
                    ),
                  },
                ],
              }}
            >
              <Text className="text-white text-4xl font-bold text-center mt-6">
                {screen.title}
              </Text>

              <Text className="text-slate-400 text-lg text-center mt-4 leading-6">
                {screen.subtitle}
              </Text>

              {/* Last screen button */}
              {index === SCREENS.length - 1 && (
                <Text
                  onPress={handleDone}
                  className="mt-10 text-fuchsia-600 text-xl font-semibold"
                >
                  Get Started →
                </Text>
              )}
            </Animated.View>
          </View>
        ))}
      </Animated.ScrollView>

      {/* Dots */}
      <View className="absolute bottom-12 w-full flex-row justify-center space-x-3">
        {SCREENS.map((_, i) => {
          const animatedDot = interpolate(
            scrollX.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            [6, 12, 6],
            Extrapolate.CLAMP
          );

          return (
            <Animated.View
              key={i}
              style={{
                width: animatedDot,
                height: animatedDot,
                backgroundColor: "rgb(192 38 211)", // fuchsia-600
                borderRadius: 10,
              }}
            />
          );
        })}
      </View>
    </LinearGradient>
  );
}
