import NotificationFollowCard from "@/common/NotificationFollowCard";
import NotificationLikeCard from "@/common/NotificationLikeCard";
import NotificationListCard from "@/common/NotificationListCard";
import NotificationSuggestionCard from "@/common/NotificationSuggestionCard";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const Notification = () => {
  return (
    <ScrollView className="flex-1 pt-4 w-full dark:bg-cGradient2">
      <NotificationSuggestionCard />
      <NotificationFollowCard />
      <NotificationLikeCard />
      <NotificationListCard />
    </ScrollView>
  );
};

export default Notification;
