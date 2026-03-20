import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";

const EditSpoiler = ({
  spoiler,
  setSpoiler,
}: {
  spoiler: boolean;
  setSpoiler: (spoiler: boolean) => void;
}) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        setSpoiler(!spoiler);
      }}
      className={`flex-row items-center justify-center flex-1 py-3 px-5 rounded-xl ${
        spoiler
          ? "bg-cFuchsia600 dark:bg-slate-600"
          : "bg-cFuchsia600 dark:bg-slate-800"
      }`}
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
      }}
    >
      <Feather name={spoiler ? "lock" : "unlock"} size={18} color="white" />
      <Text className="ml-2 text-white font-medium">
        {t("createpost.spoiler")}
      </Text>
    </TouchableOpacity>
  );
};

export default EditSpoiler;
