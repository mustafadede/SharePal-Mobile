import MyListModal from "@/components/Profile/MyListModal";
import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Keyboard, useColorScheme, View } from "react-native";
import { useSelector } from "react-redux";

const CustomBottomSheet = ({
  handleSheetChanges,
  bottomSheetModalRef,
  snaps = ["50%", "85%"],
}: {
  handleSheetChanges: (index: number) => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  snaps?: string[];
}) => {
  const colorScheme = useColorScheme();
  const { modalType } = useSelector((state: RootState) => state.modal);
  const snapPoints = useMemo(() => snaps, [snaps]);
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        bottomSheetModalRef.current?.dismiss();
      };
    }, []),
  );
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={isKeyboardVisible ? 2 : 1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={0}
          appearsOnIndex={1}
          opacity={0.5}
        />
      )}
      keyboardBlurBehavior="none"
      handleIndicatorStyle={{ backgroundColor: "gray" }}
      keyboardBehavior="interactive"
      android_keyboardInputMode="adjustResize"
      backgroundComponent={({ style }) => (
        <View
          style={[
            style,
            {
              backgroundColor:
                colorScheme === "dark"
                  ? Colors.dark.cGradient2
                  : Colors.dark.cWhite,
              borderRadius: 30,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        />
      )}
    >
      <BottomSheetView style={{ flex: 1 }}>
        {/* {modalType === "feedcardshare" && (
          <InfoLabel status={t("modal.feedcardtitle")} />
        )}
        {modalType === "feedcardoptions" && (
          <View className="h-full w-full">
            <TouchableOpacity className="bg-red-600 h-14 w-full">
              <Text>{t("actions.delete")}</Text>
            </TouchableOpacity>
          </View>
        )}
        {modalType === "attach" && <AttachModal />} */}
        {modalType === "create_list" && <MyListModal />}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default CustomBottomSheet;
