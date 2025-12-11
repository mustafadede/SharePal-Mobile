import PrimaryButton from "@/common/PrimaryButton";
import PrimaryInput from "@/common/PrimaryInput";
import StandartButton from "@/common/StandartButton";
import UnderlineButton from "@/common/UnderlineButton";
import BackgroundImage from "@/components/LogIn/BackgroundImage";
import AppTitle from "@/components/Registration/AppTitle";
import SignUpContentComponent from "@/components/SignUp/SignUpContentComponent";
import { Colors } from "@/constants/Colors";
import "@/global.css";
import i18n from "@/i18n/i18n";
import { signInWithEmailAction } from "@/services/firebaseActions";
import { profileActions } from "@/store/profileSlice";
import { ToastConfig } from "@/utils/ToastConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, TouchableOpacity, useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

export default function Home() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState<string>(
    process.env.EXPO_PUBLIC_EMAIL || ""
  );
  const [password, setPassword] = useState<string>(
    process.env.EXPO_PUBLIC_PASSWORD || ""
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["15%", "25%", "55%"], []);
  const dispatch = useDispatch();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 1) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  }, []);

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    signInWithEmailAction(email.trim(), password).then((user) => {
      if (String(user).includes("auth")) {
        if (user === "auth/user-not-found") {
          user = t("toaster.usernotfound");
        } else if (user === "auth/wrong-password") {
          user = t("toaster.wrongpassword");
        } else if (user === "auth/invalid-email") {
          user = t("toaster.wrongmail");
        } else {
          console.log(user);

          user = t("toaster.erroroccured");
        }
        Toast.show({
          type: "error",
          text1: user,
          visibilityTime: 3000,
          autoHide: true,
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } else {
        setEmail(email);
        dispatch(profileActions.setUserId(user.user.uid));
        router.push("(tabs)");
      }
    });
  };
  const handleChangeLanguage = () => {
    // Örnek olarak 'en' ve 'tr' arasında geçiş
    const newLang = i18n.language === "tr" ? "en" : "tr";
    i18n.changeLanguage(newLang);
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark" ? Colors.dark.cGradient2 : "transparent",
        paddingTop: Platform.OS === "android" ? 0 : 0,
      }}
    >
      <View className="items-center justify-center flex-1 dark:bg-cGradient2">
        <TouchableOpacity
          onPress={handleChangeLanguage}
          className="border border-slate-400"
          style={{
            position: "absolute",
            top: 45,
            right: 20,
            padding: 8,
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cGradient1 : "#eee",
            borderRadius: 50,
            zIndex: 20,
          }}
        >
          <Ionicons
            name="language-outline"
            size={24}
            color={colorScheme === "dark" ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <BackgroundImage />
        <View className="w-full h-full px-14 flex-1 justify-center items-center">
          <AppTitle title={"SharePal"} />
          <PrimaryInput placeholder={"login.email"} setInput={setEmail} />
          <PrimaryInput
            placeholder={"login.password"}
            visibility={true}
            setInput={setPassword}
          />
          <PrimaryButton
            title={"login.title"}
            onClickHandler={() =>
              handleLogin({
                email,
                password,
              })
            }
          />
          <View className="flex-col items-center gap-5">
            <UnderlineButton
              subtitle={"signup.subtitle"}
              title={"signup.title"}
              onClickHandler={handlePresentModalPress}
            />
            <StandartButton
              title={"login.forgotPassword"}
              onClickHandler={() => router.push("/reset")}
            />
          </View>
        </View>
      </View>
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
                },
              ]}
              className="bg-[#f2f2f2] dark:bg-black"
            />
          )}
        >
          <BottomSheetView style={{ flex: 1, marginTop: 10 }}>
            <SignUpContentComponent />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <Toast config={ToastConfig} />
    </GestureHandlerRootView>
  );
}
