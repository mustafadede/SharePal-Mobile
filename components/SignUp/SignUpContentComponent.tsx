import { View } from "react-native";
import React from "react";
import PrimaryInput from "@/common/PrimaryInput";
import PrimaryButton from "@/common/PrimaryButton";
import PrimaryTitle from "../Registration/PrimaryTitle";

const SignUpContentComponent = () => {
  return (
    <View className="items-center flex-1">
      <PrimaryTitle title={"signup.title"} />
      <PrimaryInput placeholder={"signup.username"} />
      <PrimaryInput placeholder={"signup.email"} />
      <PrimaryInput placeholder={"signup.password"} visibility={true} />
      <PrimaryInput placeholder={"signup.confirmPassword"} visibility={true} />
      <PrimaryButton title={"signup.title"} onClickHandler={() => {}} />
    </View>
  );
};

export default SignUpContentComponent;
