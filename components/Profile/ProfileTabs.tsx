import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const pages = [
  { id: 0, title: "profile.stats" },
  { id: 1, title: "profile.lists" },
  { id: 2, title: "profile.posts" },
  { id: 3, title: "profile.activities" },
];

const ProfileTabs = ({
  tabs,
  setTabs,
}: {
  tabs: number;
  setTabs: (tab: number) => void;
}) => {
  const { t } = useTranslation();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 4,
        justifyContent: "space-between",
        gap: 14,
        paddingHorizontal: 16,
      }}
      horizontal
      scrollEnabled
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      scrollToOverflowEnabled
      contentInsetAdjustmentBehavior="automatic"
      className="flex-row gap-2 h-fit pb-2 mt-2"
    >
      {pages.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          className={
            tabs === tab.id
              ? "px-4 flex-1 justify-center border border-slate-400 rounded-xl"
              : "px-4 justify-center flex-1 py-2 rounded-xl border border-transparent"
          }
          onPress={() => {
            setTabs(tab.id);
          }}
        >
          <Text
            className={
              tabs === tab.id
                ? "text-slate-400 text-center"
                : "text-slate-600 dark:text-slate-200 text-center"
            }
          >
            {t(tab.title)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ProfileTabs;
