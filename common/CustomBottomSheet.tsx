import React, { useMemo } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetFooter,
  BottomSheetTextInput,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Colors } from "@/constants/Colors";
import StatusLabel from "@/components/StatusLabel/StatusLabel";
import InfoLabel from "./InfoLabel";
import CommentCards from "./CommentCards";
import Entypo from "@expo/vector-icons/Entypo";
import AttachItem from "./AttachItem";

const CustomBottomSheet = ({
  handleSheetChanges,
  bottomSheetModalRef,
  snaps = ["25%", "40%", "75%"],
}: {
  handleSheetChanges: (index: number) => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  snaps: string[];
}) => {
  const { modalStatus, modalType, modalProps } = useSelector((state: RootState) => state.modal);
  const snapPoints = useMemo(() => snaps, []);

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
            {modalType === "comments" && (
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
            )}
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
              className="flex-1 w-full px-2 mt-2"
              renderItem={({ item, index }) => modalType === "comments" && <CommentCards item={item} index={index} />}
              keyExtractor={(item) => item.date + item.userId}
            />
          )}
          {modalStatus === "noData" && modalType === "comments" && <InfoLabel status="No comments" />}
          {modalType === "feedcardshare" && <InfoLabel status="Feed Card Share" />}
          {modalType === "feedcardoptions" && <InfoLabel status="Feed Card Options" />}
          {modalType === "attach" && (
            <View className="flex-1">
              <BottomSheetTextInput
                placeholder="Search for a film or series"
                style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 8, marginHorizontal: 8, color: Colors.dark.cWhite }}
                placeholderTextColor={Colors.dark.icon}
              />
              <ScrollView
                contentContainerStyle={{
                  paddingHorizontal: 8,
                  marginTop: 8,
                }}
                style={{ flexGrow: 1 }}
              >
                <AttachItem />
              </ScrollView>
            </View>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default CustomBottomSheet;
