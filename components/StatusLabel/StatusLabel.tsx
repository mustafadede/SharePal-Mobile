import React, { useRef } from "react";
import { ActivityIndicator, Animated } from "react-native";

const StatusLabel = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  Animated.timing(opacity, {
    toValue: 1,
    duration: 500, // half a second
    useNativeDriver: true,
  }).start();
  return (
    <Animated.View
      style={{
        opacity,
        marginTop: 7,
        width: "100%",
      }}
    >
      <ActivityIndicator size="large" color="#c026d3" />
    </Animated.View>
  );
};

export default StatusLabel;
