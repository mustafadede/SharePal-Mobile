import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

const ProfileTabs = ({
  tabs,
  setTabs,
}: {
  tabs: Number;
  setTabs: (tab: number) => void;
}) => {
  const { t } = useTranslation();
  return (
    <View className="flex-row justify-center gap-2 pb-2 my-1 rounded-2xl">
      <TouchableOpacity
        className={
          tabs === 0
            ? "px-1 flex-1 justify-center bg-fuchsia-600 rounded-xl"
            : "px-1 justify-center flex-1 py-2 bg-transparent"
        }
        onPress={() => setTabs(0)}
      >
        <Text
          className={
            tabs === 0
              ? "text-slate-50 dark:text-slate-950 text-center"
              : "dark:text-white text-center"
          }
        >
          {t("profile.stats")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={
          tabs === 1
            ? "px-1 flex-1 justify-center bg-fuchsia-600 rounded-xl"
            : "px-1 justify-center flex-1 py-2 bg-transparent"
        }
        onPress={() => setTabs(1)}
      >
        <Text
          className={
            tabs === 1
              ? "text-slate-50 dark:text-slate-950 text-center"
              : "dark:text-white text-center"
          }
        >
          {t("profile.lists")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={
          tabs === 2
            ? "px-1 flex-1 justify-center bg-fuchsia-600 rounded-xl"
            : "px-1 justify-center flex-1 py-2 bg-transparent"
        }
        onPress={() => setTabs(2)}
      >
        <Text
          className={
            tabs === 2
              ? "text-slate-50 dark:text-slate-950 text-center"
              : "dark:text-white text-center"
          }
        >
          {t("profile.posts")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={
          tabs === 3
            ? "px-1 flex-1 justify-center bg-fuchsia-600 rounded-xl"
            : "px-1 justify-center flex-1 py-2 bg-transparent"
        }
        onPress={() => setTabs(3)}
      >
        <Text
          className={
            tabs === 3
              ? "text-slate-50 dark:text-slate-950 text-center"
              : "dark:text-white text-center"
          }
        >
          {t("profile.activities")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileTabs;
