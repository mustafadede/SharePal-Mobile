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
import { View, Dimensions, Keyboard, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [sheetOpened, setSheetOpened] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["25%", "65%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleLogin = async () => {
    signInWithEmailAction(email, password).then((user) => {
      console.log(user);
      router.push("(tabs)");
    });
  };

  return (
    <GestureHandlerRootView>
      <View className="items-center justify-center flex-1 bg-cGradient2" style={{ minHeight: Math.round(Dimensions.get("window").height) }}>
        <ImageComponent />
        <AppTitle title={"SharePal"} />
        <PrimaryInput placeholder={"login.email"} setInput={setEmail} />
        <PrimaryInput placeholder={"login.password"} visibility={true} setInput={setPassword} />
        <PrimaryButton title={"login.title"} onClickHandler={handleLogin} />
        <UnderlineButton title={"signup.title"} onClickHandler={handlePresentModalPress} />
        <UnderlineButton title={"login.forgotPassword"} onClickHandler={() => router.push("/reset")} />
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
    </GestureHandlerRootView>
  );
}
