import LanguageBottomSheet from "@/common/LanguageBottomSheet";
import PrimaryButton from "@/common/PrimaryButton";
import PrimaryInput from "@/common/PrimaryInput";
import StandartButton from "@/common/StandartButton";
import UnderlineButton from "@/common/UnderlineButton";
import BackgroundImage from "@/components/LogIn/BackgroundImage";
import AppTitle from "@/components/Registration/AppTitle";
import { Colors } from "@/constants/Colors";
import "@/global.css";
import i18n from "@/i18n/i18n";
import {
  getSelectedUserFollowing,
  signInWithEmailAction,
} from "@/services/firebaseActions";
import { profileActions } from "@/store/profileSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { toast } from "sonner-native";

export default function Home() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState<string>(
    process.env.EXPO_PUBLIC_EMAIL || "",
  );
  const [password, setPassword] = useState<string>(
    process.env.EXPO_PUBLIC_PASSWORD || "",
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [languageModalVisibility, setLanguageModalVisibility] = useState(false);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
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
    try {
      setLoading(true);

      const result = await signInWithEmailAction(email.trim(), password);

      if (!result || typeof result === "string") {
        throw { code: result };
      }

      dispatch(profileActions.setUserId(result.user.uid));
      getSelectedUserFollowing(result.user.uid).then((followings) => {
        dispatch(profileActions.initilizeFollowingList(followings));
        router.push("/(tabs)");
      });
    } catch (error: any) {
      let message = "";

      switch (error.code) {
        case "auth/user-not-found":
          message = t("toaster.usernotfound");
          break;
        case "auth/wrong-password":
          message = t("toaster.wrongpassword");
          break;
        case "auth/invalid-email":
          message = t("toaster.wrongmail");
          break;
        default:
          message = t("toaster.erroroccured");
      }

      toast.error(message);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } finally {
      setLoading(false);
    }
  };
  const handleChangeLanguage = () => {
    const newLang = i18n.language === "tr-TR" ? "en-EN" : "tr-TR";
    i18n.changeLanguage(newLang);
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor:
            colorScheme === "dark" ? Colors.dark.cGradient2 : "transparent",
        }}
      >
        <View className="items-center justify-center flex-1 dark:bg-cGradient2">
          <TouchableOpacity
            className="border border-slate-400 w-14 h-14 justify-center flex-row gap-2 items-center"
            onPress={() => {
              setLanguageModalVisibility(true);
              handlePresentModalPress();
            }}
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
              size={26}
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
              loading={loading}
            />
            <View className="flex-col items-center gap-5">
              <UnderlineButton
                subtitle={"signup.subtitle"}
                title={"signup.title"}
                onClickHandler={() => {
                  setLanguageModalVisibility(false);
                  handlePresentModalPress();
                }}
              />
              <StandartButton
                title={"login.forgotPassword"}
                onClickHandler={() => router.push("/reset")}
              />
            </View>
          </View>
        </View>
        <LanguageBottomSheet
          handleSheetChanges={handleSheetChanges}
          bottomSheetModalRef={bottomSheetModalRef}
          languageModalVisibility={languageModalVisibility}
          handlePresentModalClose={handlePresentModalClose}
          handleChangeLanguage={handleChangeLanguage}
        />
      </View>
    </SafeAreaProvider>
  );
}
