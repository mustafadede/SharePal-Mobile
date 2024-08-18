import PrimaryButton from "@/common/PrimaryButton";
import PrimaryInput from "@/common/PrimaryInput";
import UnderlineButton from "@/common/UnderlineButton";
import ImageComponent from "@/components/LogIn/ImageComponent";
import AppTitle from "@/components/Registration/AppTitle";
import SignUpContentComponent from "@/components/SignUp/SignUpContentComponent";
import { signInWithEmailAction } from "@/services/firebaseActions";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Dimensions, TouchableOpacity, Text, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { ToastConfig } from "@/utils/ToastConfig";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StandartButton from "@/common/StandartButton";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");

  const snapPoints = useMemo(() => ["25%", "65%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleChange = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = async () => {
    signInWithEmailAction(email.trim(), password).then((user) => {
      if (String(user).includes("auth")) {
        if (user === "auth/user-not-found") {
          user = "User not found";
        } else if (user === "auth/wrong-password") {
          user = "Wrong password";
        } else if (user === "auth/invalid-email") {
          user = "Invalid email";
        } else {
          user = "An error occurred";
        }
        Toast.show({
          type: "error",
          text1: user,
          visibilityTime: 3000,
          autoHide: true,
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } else {
        console.log(user._tokenResponse.displayName, user._tokenResponse.profilePicture);

        AsyncStorage.setItem("email", email);
        AsyncStorage.setItem("photoURL", user._tokenResponse.profilePicture);
        AsyncStorage.setItem("displayName", user._tokenResponse.displayName);
        setEmail(email);
        setPhotoURL(user._tokenResponse.profilePicture);
        setDisplayName(user._tokenResponse.displayName);
        router.push("(tabs)");
      }
    });
  };

  useEffect(() => {
    AsyncStorage.getItem("email").then((value) => {
      if (value) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <GestureHandlerRootView>
      <View className="items-center justify-center flex-1 bg-cGradient2" style={{ minHeight: Math.round(Dimensions.get("window").height) }}>
        <ImageComponent />
        <AppTitle title={"SharePal"} />
        <PrimaryInput placeholder={"login.email"} setInput={setEmail} />
        <PrimaryInput placeholder={"login.password"} visibility={true} setInput={setPassword} />
        <PrimaryButton title={"login.title"} onClickHandler={handleLogin} />
        <UnderlineButton title={"signup.title"} onClickHandler={handlePresentModalPress} />
        <StandartButton title={"login.forgotPassword"} onClickHandler={() => router.push("/reset")} />
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
                  backgroundColor: "rgb(15 23 42)",
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
          <BottomSheetView style={{ flex: 1, marginTop: 10 }}>
            <SignUpContentComponent />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <Toast config={ToastConfig} />
    </GestureHandlerRootView>
  );
}
