import React, { ReactNode, useCallback, useMemo, useRef } from "react";
import { Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Colors } from "@/constants/Colors";

const BottomSheetSkeleton = ({
  setBottomSheetVisible,
  children,
}: {
  setBottomSheetVisible: (value: boolean) => void;
  children?: ReactNode;
}) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["24%"], []);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleClose = useCallback(() => {
    setBottomSheetVisible(false);
  }, []);

  // renders
  return (
    <BottomSheet
      snapPoints={snapPoints}
      onClose={handleClose}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: Colors.dark.cGradient1,
      }}
      handleIndicatorStyle={{
        backgroundColor: Colors.dark.tColor1,
      }}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetSkeleton;
