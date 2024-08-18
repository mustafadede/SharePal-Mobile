import React from "react";
import { View } from "react-native";
import { BlurView } from "expo-blur";
import { ErrorToast } from "react-native-toast-message";
function CustomToast(props: React.ComponentProps<typeof ErrorToast>) {
  return (
    <View>
      <BlurView
        intensity={50} // Adjust the intensity to your liking (0 to 100)
        tint="dark" // Can be "light", "dark", or "default"
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />
      <ErrorToast
        {...props}
        style={{ backgroundColor: "transparent", borderLeftColor: "black" }}
        text1Style={{
          fontSize: 17,
          color: "white",
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    </View>
  );
}

export default CustomToast;
