import { View } from "react-native";
import React, { useCallback, useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import SignUpContentComponent from "./SignUpContentComponent";

const SignUpComponent = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={[90, "64%"]}
      handleIndicatorStyle={{ backgroundColor: "rgb(100 116 139)" }}
      keyboardBehavior="interactive"
      android_keyboardInputMode="adjustPan"
      backgroundComponent={({ style }) => (
        <View
          style={[
            style,
            {
              backgroundColor: "rgb(15 23 42)",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        />
      )}
    >
      <BottomSheetView style={{ flex: 1, marginTop: 10 }}>
        <SignUpContentComponent />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default SignUpComponent;
