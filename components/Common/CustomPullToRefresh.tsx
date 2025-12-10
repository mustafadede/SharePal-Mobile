import React, { ReactNode, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const THRESHOLD = 90; // kaç px çekince refresh tetiklenecek

interface CustomPullToRefreshProps {
  children: ReactNode;
  onRefresh: () => void;
  refreshing: boolean;
}

export default function CustomPullToRefresh({
  children,
  onRefresh,
  refreshing,
}: CustomPullToRefreshProps) {
  const translateY = useSharedValue(0);
  const isReadyToRefresh = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (!refreshing) {
      translateY.value = withTiming(0, { duration: 300 });
      isReadyToRefresh.value = false;
    }
  }, [refreshing]);

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;

        if (event.translationY > THRESHOLD) {
          isReadyToRefresh.value = true;
        } else {
          isReadyToRefresh.value = false;
        }
      }
    })
    .onEnd(() => {
      if (isReadyToRefresh.value) {
        runOnJS(onRefresh)();
        translateY.value = withSpring(60);
      } else {
        translateY.value = withTiming(0);
      }
    });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Animated.View
          style={[
            styles.indicator,
            {
              opacity: interpolate(translateY.value, [0, THRESHOLD], [0, 1]),
              transform: [
                {
                  rotate: `${interpolate(
                    translateY.value,
                    [0, THRESHOLD],
                    [0, 180]
                  )}deg`,
                },
              ],
            },
          ]}
        />

        {refreshing && (
          <Animated.Text
            style={{
              marginTop: 10,
              color: "black",
              fontSize: 16,
              opacity: interpolate(translateY.value, [0, THRESHOLD], [0, 1]),
              transform: [
                {
                  translateY: interpolate(
                    translateY.value,
                    [0, THRESHOLD],
                    [20, 0]
                  ),
                },
              ],
            }}
          >
            Yükleniyor...
          </Animated.Text>
        )}

        {/* Actual list goes here */}
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicator: {
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: "#fff",
    borderTopColor: "solid",
    borderRadius: 12,
  },
});
