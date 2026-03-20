import SignUpContentComponent from "@/components/SignUp/SignUpContentComponent";
import { Colors } from "@/constants/Colors";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Platform, Pressable, Text, useColorScheme, View } from "react-native";

const LanguageBottomSheet = ({
  languageModalVisibility,
  handleChangeLanguage,
  bottomSheetModalRef,
  handlePresentModalClose,
  handleSheetChanges,
}: {
  languageModalVisibility: boolean;
  handleChangeLanguage: () => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  handlePresentModalClose: () => void;
  handleSheetChanges: (index: number) => void;
}) => {
  const { i18n } = useTranslation();
  const colorScheme = useColorScheme();

  const snapPoints = useMemo(
    () =>
      languageModalVisibility
        ? Platform.OS === "ios"
          ? ["20%"]
          : ["25%"]
        : ["40%"],
    [languageModalVisibility],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      android_keyboardInputMode="adjustResize"
      snapPoints={snapPoints}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={0}
          appearsOnIndex={1}
          opacity={0.8}
        />
      )}
      onChange={handleSheetChanges}
      keyboardBlurBehavior="none"
      handleIndicatorStyle={{ backgroundColor: "rgb(100 116 139)" }}
      keyboardBehavior="interactive"
      backgroundComponent={({ style }) => (
        <View
          style={[
            style,
            {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                colorScheme === "dark"
                  ? Colors.dark.cGradient2
                  : Colors.dark.cBackgroundLight,
            },
          ]}
        />
      )}
    >
      <BottomSheetView style={{ flex: 1, marginTop: 10 }}>
        {languageModalVisibility ? (
          <View className="items-center h-full flex-1 gap-4 px-8 justify-around">
            <Pressable
              className={`w-full justify-center h-fit flex-row items-center ${
                i18n.language === "tr-TR" ? "" : "border border-slate-400"
              }`}
              onPress={() => {
                handleChangeLanguage();
                handlePresentModalClose();
              }}
              style={{
                padding: 12,
                backgroundColor:
                  i18n.language === "tr-TR"
                    ? colorScheme === "dark"
                      ? Colors.dark.cFuc6
                      : "#e2e8f0"
                    : "transparent",
                borderRadius: 50,
              }}
            >
              <Text className="text-black text-lg dark:text-slate-200">
                🇹🇷 {i18n.language === "en-EN" ? "Turkish" : "Türkçe"}
              </Text>
            </Pressable>
            <Pressable
              className={`w-full justify-center h-fit flex-row items-center ${
                i18n.language === "en-EN" ? "" : "border border-slate-400"
              }`}
              onPress={() => {
                handleChangeLanguage();
                handlePresentModalClose();
              }}
              style={{
                padding: 12,
                backgroundColor:
                  i18n.language === "en-EN"
                    ? colorScheme === "dark"
                      ? Colors.dark.cFuc6
                      : "#e2e8f0"
                    : "transparent",
                borderRadius: 50,
              }}
            >
              <Text className="text-black text-lg dark:text-slate-200">
                🇺🇸 {i18n.language === "tr-TR" ? "İngilizce" : "English"}
              </Text>
            </Pressable>
          </View>
        ) : (
          <SignUpContentComponent />
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default LanguageBottomSheet;
