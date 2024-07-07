import PrimaryButton from "@/common/PrimaryButton";
import PrimaryInput from "@/common/PrimaryInput";
import UnderlineButton from "@/common/UnderlineButton";
import AppTitle from "@/components/Registration/AppTitle";
import { router } from "expo-router";
import { View, Text, Button, TextInput, Dimensions } from "react-native";
export default function Home() {
  const handleLogin = () => {
    router.push("(tabs)");
    console.log("Login button pressed");
  };
  return (
    <View className="items-center justify-center flex-1 bg-cGradient2" style={{ minHeight: Math.round(Dimensions.get("window").height) }}>
      <AppTitle title={"SharePal"} />
      <PrimaryInput placeholder={"login.email"} />
      <PrimaryInput placeholder={"login.password"} visibility={true} />
      <PrimaryButton title={"login.title"} onClickHandler={handleLogin} />
      <UnderlineButton title={"login.forgotPassword"} onClickHandler={() => router.push("/reset")} />
    </View>
  );
}
