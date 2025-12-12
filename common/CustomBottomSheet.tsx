import AttachModal from "@/components/CreatePost/AttachModal";
import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { useSelector } from "react-redux";
import InfoLabel from "./InfoLabel";

const CustomBottomSheet = ({
  handleSheetChanges,
  bottomSheetModalRef,
  snaps = ["25%", "40%", "55%"],
}: {
  handleSheetChanges: (index: number) => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  snaps: string[];
}) => {
  const colorScheme = useColorScheme();
  const { modalStatus, modalType, modalProps } = useSelector(
    (state: RootState) => state.modal
  );
  const snapPoints = useMemo(() => ["25%"], []);
  const { t } = useTranslation();

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      detached={true}
      bottomInset={46}
      keyboardBlurBehavior="none"
      handleIndicatorStyle={{ backgroundColor: "rgb(100 116 139)" }}
      keyboardBehavior="interactive"
      android_keyboardInputMode="adjustResize"
      backgroundComponent={({ style }) => (
        <View
          style={[
            style,
            {
              backgroundColor:
                colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              width: "100%",
              justifyContent: "center",
              marginHorizontal: 24,
              alignItems: "center",
            },
          ]}
        />
      )}
    >
      <BottomSheetView style={{ flex: 1 }}>
        {modalType === "feedcardshare" && (
          <InfoLabel status={t("modal.feedcardtitle")} />
        )}
        {modalType === "feedcardoptions" && (
          <View className="h-full w-full">
            <TouchableOpacity className="bg-red-600 h-14 w-full">
              <Text>{t("actions.delete")}</Text>
            </TouchableOpacity>
          </View>
        )}
        {modalType === "attach" && <AttachModal />}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default CustomBottomSheet;
