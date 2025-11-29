import NotificationSuggestionCard from "@/common/NotificationSuggestionCard";
import React from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const Notification = () => {
  return (
    <GestureHandlerRootView>
      <ScrollView className="flex-1 px-4 mt-0 dark:bg-cGradient2">
        <NotificationSuggestionCard />
        <NotificationSuggestionCard />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Notification;
