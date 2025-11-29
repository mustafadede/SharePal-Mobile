import NotificationFollowCard from "@/common/NotificationFollowCard";
import NotificationLikeCard from "@/common/NotificationLikeCard";
import NotificationListCard from "@/common/NotificationListCard";
import NotificationSuggestionCard from "@/common/NotificationSuggestionCard";
import React from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const Notification = () => {
  return (
    <GestureHandlerRootView>
      <ScrollView className="flex-1 pt-4 dark:bg-cGradient2">
        <NotificationSuggestionCard />
        <NotificationFollowCard />
        <NotificationLikeCard />
        <NotificationListCard />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Notification;
