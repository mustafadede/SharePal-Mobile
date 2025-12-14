import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";

const AttachToCreatedPost = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleAttachment = () => {
    router.push("/attachtopost");
  };

  return (
    <TouchableOpacity
      onPress={handleAttachment}
      className="flex-row items-center flex-1 py-3 px-5 mr-3 rounded-xl bg-fuchsia-600 dark:bg-slate-800"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
      }}
    >
      <Entypo name="attachment" size={18} color="white" />
      <Text className="ml-2 text-white font-medium">
        {t("createpost.attach")}
      </Text>
    </TouchableOpacity>
  );
};

export default AttachToCreatedPost;
