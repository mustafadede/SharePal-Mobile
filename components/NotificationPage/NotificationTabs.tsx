import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const pages = [
  { id: 0, title: "notification.follow" },
  { id: 1, title: "notification.like" },
  { id: 2, title: "notification.list" },
  { id: 3, title: "notification.comments" },
  { id: 4, title: "notification.suggest" },
];

const NotificationTabs = ({
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
        marginHorizontal: 4,
        justifyContent: "space-between",
        gap: 14,
        paddingHorizontal: 16,
      }}
      horizontal
      scrollEnabled
      decelerationRate="fast"
      showsHorizontalScrollIndicator={true}
      scrollToOverflowEnabled
      contentInsetAdjustmentBehavior="automatic"
      className="flex-row gap-1 h-fit mt-1 pb-4"
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
                ? "text-slate-400 text-lg text-center"
                : "text-slate-600 text-lg dark:text-slate-200 text-center"
            }
          >
            {t(tab.title)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default NotificationTabs;
