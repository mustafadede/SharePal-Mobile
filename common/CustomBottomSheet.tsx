import React, { useMemo } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native";
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider, BottomSheetFooter } from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Colors } from "@/constants/Colors";
import StatusLabel from "@/components/StatusLabel/StatusLabel";
import InfoLabel from "./InfoLabel";
import CommentCards from "./CommentCards";

const CustomBottomSheet = ({
  handleSheetChanges,
  bottomSheetModalRef,
}: {
  handleSheetChanges: (index: number) => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}) => {
  const { modalStatus, modalType, modalProps } = useSelector((state: RootState) => state.modal);
  const snapPoints = useMemo(() => ["25%", "45%", "75%"], []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        keyboardBlurBehavior="none"
        handleIndicatorStyle={{ backgroundColor: "rgb(100 116 139)" }}
        keyboardBehavior="interactive"
        android_keyboardInputMode="adjustPan"
        footerComponent={(props) => (
          <BottomSheetFooter {...props}>
            <View className="pt-2 pb-4 border-t bg-cGradient2 border-slate-700">
              <View className="flex-row items-center mx-2 mt-2">
                <TextInput
                  className="flex-1 h-10 px-2 mr-4 text-slate-100 bg-slate-800 rounded-xl"
                  placeholder="Write a comment..."
                  placeholderTextColor={Colors.dark.icon}
                />
                <TouchableOpacity className="items-center justify-center px-4 py-2 bg-fuchsia-600 rounded-xl">
                  <Text className="text-center text-fuchsia-100">Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetFooter>
        )}
        backgroundComponent={({ style }) => (
          <View
            style={[
              style,
              {
                backgroundColor: Colors.dark.cGradient2,
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
        <BottomSheetView style={{ flex: 1 }}>
          {modalStatus === "loading" && <StatusLabel />}
          {modalProps.length > 0 && modalStatus && (
            <FlatList
              data={modalProps}
              className="flex-1 w-full mt-2 h-fit" // flex-1: main content fills available space
              renderItem={({ item, index }) => modalType === "Comments" && <CommentCards item={item} index={index} />}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
          {modalStatus === "noData" && <InfoLabel status="No comments" />}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default CustomBottomSheet;
