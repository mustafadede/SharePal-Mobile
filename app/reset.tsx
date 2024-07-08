import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import PrimaryTitle from "@/components/Registration/PrimaryTitle";
import PrimaryInput from "@/common/PrimaryInput";
import PrimaryButton from "@/common/PrimaryButton";

const reset = () => {
  const [email, setEmail] = useState("");
  return (
    <View className="items-center justify-center flex-1 bg-cGradient2" style={{ minHeight: Math.round(Dimensions.get("window").height) }}>
      <PrimaryTitle title={"reset.title"} />
      <PrimaryInput placeholder={"reset.email"} setInput={setEmail} />
      <PrimaryButton title={"reset.submit"} onClickHandler={() => {}} />
    </View>
  );
};

export default reset;
