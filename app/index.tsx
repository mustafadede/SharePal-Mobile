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
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Platform,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { toast } from "sonner-native";

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
  const snapPoints = useMemo(() => ["40%"], []);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
        toast.error(user, {
          duration: 3000,
          close: true,
          style: {
            backgroundColor: "rgba(255,255,255,0.05)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.1)",
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 14,
          },
          textStyle: {
            color: "#f8fafc",
            fontSize: 15,
            fontWeight: "500",
          },
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } else {
        setEmail(email);
        setLoading(false);
        dispatch(profileActions.setUserId(user.user.uid));
        router.push("/(tabs)");
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
          className="border border-slate-400 flex-row gap-2 items-center"
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
          <Text className="text-black dark:text-slate-200">
            {i18n.language === "tr" ? "Türkçe" : "English"}
          </Text>
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
              onClickHandler={handlePresentModalPress}
            />
            <StandartButton
              title={"login.forgotPassword"}
              onClickHandler={() => router.push("/reset")}
            />
          </View>
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
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
            className="bg-[#f2f2f2] dark:bg-cGradient2"
          />
        )}
      >
        <BottomSheetView style={{ flex: 1, marginTop: 10 }}>
          <SignUpContentComponent />
        </BottomSheetView>
      </BottomSheetModal>
    </GestureHandlerRootView>
  );
}
