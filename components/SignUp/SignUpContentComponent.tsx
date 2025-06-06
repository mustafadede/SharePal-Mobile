import PrimaryButton from "@/common/PrimaryButton";
import PrimaryInput from "@/common/PrimaryInput";
import React from "react";
import { View } from "react-native";
import PrimaryTitle from "../Registration/PrimaryTitle";

const SignUpContentComponent = () => {
  return (
    <View className="items-center flex-1 px-8">
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
