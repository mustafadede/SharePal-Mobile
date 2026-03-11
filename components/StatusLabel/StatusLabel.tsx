import { Colors } from "@/constants/Colors";
import React, { useRef } from "react";
import { ActivityIndicator, Animated } from "react-native";

const StatusLabel = ({
  color,
  size,
}: {
  size?: number | "small" | "large";
  color?: string;
}) => {
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
        marginTop: size ? 0 : 7,
        width: "100%",
      }}
    >
      <ActivityIndicator
        size={size ? size : "large"}
        color={color ? color : Colors.dark.cFuc6}
      />
    </Animated.View>
  );
};

export default StatusLabel;
