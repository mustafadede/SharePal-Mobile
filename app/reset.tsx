import PrimaryButton from "@/common/PrimaryButton";
import PrimaryInput from "@/common/PrimaryInput";
import PrimaryTitle from "@/components/Registration/PrimaryTitle";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";

const reset = () => {
  const [email, setEmail] = useState("");
  return (
    <View
      className="items-center justify-center flex-1 px-14 bg-cGradient2"
      style={{ minHeight: Math.round(Dimensions.get("window").height) }}
    >
      <PrimaryTitle title={"reset.title"} />
      <PrimaryInput placeholder={"reset.email"} setInput={setEmail} />
      <PrimaryButton title={"reset.submit"} onClickHandler={() => {}} />
    </View>
  );
};

export default reset;
