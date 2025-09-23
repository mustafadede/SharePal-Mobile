import StatusLabel from "@/components/StatusLabel/StatusLabel";
import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import {
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, useColorScheme, View } from "react-native";
import { useSelector } from "react-redux";
import AttachItem from "./AttachItem";
import CommentCards from "./CommentCards";
import InfoLabel from "./InfoLabel";

const CustomBottomSheet = ({
  handleSheetChanges,
  bottomSheetModalRef,
  snaps = ["25%", "40%", "75%"],
}: {
  handleSheetChanges: (index: number) => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  snaps: string[];
}) => {
  const colorScheme = useColorScheme();
  const { modalStatus, modalType, modalProps } = useSelector(
    (state: RootState) => state.modal
  );
  const snapPoints = useMemo(() => snaps, []);
  const { t } = useTranslation();

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
        android_keyboardInputMode="adjustResize"
        footerComponent={(props) => (
          <BottomSheetFooter {...props}>
            {modalType === "comments" && (
              <View
                className="pt-2 pb-4 border-t dark:bg-cGradient2 dark:border-slate-700"
                style={{
                  flex: 1,
                }}
              >
                <View className="flex-row items-center mx-2 mt-2">
                  <BottomSheetTextInput
                    className="flex-1 h-10 mr-2 text-slate-100 bg-white dark:bg-slate-800 rounded-xl"
                    placeholder={t("modal.writecomment")}
                    style={{
                      flex: 1,
                      paddingLeft: 12,
                      paddingRight: 12,
                      paddingTop: 12,
                      paddingBottom: 12,
                    }}
                    keyboardType="default"
                    placeholderTextColor={Colors.dark.icon}
                  />
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
                backgroundColor:
                  colorScheme === "dark" ? Colors.dark.cGradient2 : "#f2f2f2",
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
              renderItem={({ item, index }) =>
                modalType === "comments" && (
                  <CommentCards item={item} index={index} />
                )
              }
              keyExtractor={(item) => item.date + item.userId}
            />
          )}
          {modalStatus === "noData" && modalType === "comments" && (
            <InfoLabel status={t("modal.nocomment")} />
          )}
          {modalType === "feedcardshare" && (
            <InfoLabel status={t("modal.feedcardtitle")} />
          )}
          {modalType === "feedcardoptions" && (
            <InfoLabel status={t("modal.feedcardoptionstitle")} />
          )}
          {modalType === "attach" && (
            <View className="flex-1 px-4">
              <BottomSheetTextInput
                placeholder={t("modal.attachtitle")}
                style={{
                  backgroundColor:
                    colorScheme === "dark"
                      ? Colors.dark.cGradient1
                      : Colors.light.cWhite,
                  borderRadius: 12,
                  height: 48,
                  padding: 12,
                  color: Colors.dark.cWhite,
                }}
                placeholderTextColor={Colors.dark.icon}
                clearButtonMode="while-editing"
              />
              <ScrollView
                contentContainerStyle={{
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
