import PrimaryButton from "@/common/PrimaryButton";
import PrimaryInput from "@/common/PrimaryInput";
import UnderlineButton from "@/common/UnderlineButton";
import AppTitle from "@/components/Registration/AppTitle";
import SignUpComponent from "@/components/SignUp/SignUpComponent";
import { router } from "expo-router";
import { useState } from "react";
import { View, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    router.push("(tabs)");
    console.log("Login button pressed");
  };

  return (
    <GestureHandlerRootView>
      <View className="items-center justify-center flex-1 bg-cGradient2" style={{ minHeight: Math.round(Dimensions.get("window").height) }}>
        <AppTitle title={"SharePal"} />
        <PrimaryInput placeholder={"login.email"} setInput={setEmail} />
        <PrimaryInput placeholder={"login.password"} visibility={true} setInput={setPassword} />
        <PrimaryButton title={"login.title"} onClickHandler={handleLogin} />
        <UnderlineButton title={"login.forgotPassword"} onClickHandler={() => router.push("/reset")} />
      </View>
      <SignUpComponent />
    </GestureHandlerRootView>
  );
}
