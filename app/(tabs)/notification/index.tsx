import NotificationCommentCard from "@/common/NotificationCommentCard";
import NotificationFollowCard from "@/common/NotificationFollowCard";
import NotificationLikeCard from "@/common/NotificationLikeCard";
import NotificationListCard from "@/common/NotificationListCard";
import NotificationSuggestionCard from "@/common/NotificationSuggestionCard";
import NotificationTabs from "@/components/NotificationPage/NotificationTabs";
import { Colors } from "@/constants/Colors";
import { Notification } from "@/constants/Notifications";
import { getNotifications } from "@/services/firebaseActions";
import { RootState } from "@/store";
import { notificationActions } from "@/store/notificationSlice";
import React, { useEffect, useState } from "react";
import {
  Platform,
  RefreshControl,
  SectionList,
  useColorScheme,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const NotificationPage = () => {
  const [tabs, setTabs] = useState(0);
  const colorScheme = useColorScheme();
  const { status, data } = useSelector(
    (state: RootState) => state.notification,
  );
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profile);
  useEffect(() => {
    dispatch(notificationActions.updateStatus(true));
    getNotifications(user.userId).then((value) => {
      dispatch(notificationActions.initilizeNotifications(value));
      dispatch(notificationActions.updateStatus(false));
    });
  }, []);

  const onRefresh = () => {
    dispatch(notificationActions.updateStatus(true));
    getNotifications(user.userId).then((value) => {
      dispatch(notificationActions.initilizeNotifications(value));
      dispatch(notificationActions.updateStatus(false));
    });
  };

  return (
    <View className="flex-1 w-full dark:bg-cGradient2">
      <View
        style={{
          paddingTop: 48,
          backgroundColor: colorScheme === "dark" ? "#121212" : "white",
        }}
      >
        <NotificationTabs tabs={tabs} setTabs={setTabs} />
      </View>
      <SectionList
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            colors={["#9F23B3"]}
            refreshing={status}
            progressBackgroundColor={
              Platform.OS === "ios"
                ? undefined
                : colorScheme === "dark"
                  ? Colors.dark.cGradient2
                  : Colors.dark.cWhite
            }
            onRefresh={onRefresh}
            progressViewOffset={20}
            tintColor={
              colorScheme === "dark"
                ? Colors.dark.cGradient2
                : Colors.dark.cWhite
            }
          />
        }
        className="mt-4"
        sections={[
          {
            title: "content",
            data: (data ?? [])
              .filter((n) =>
                tabs === 0
                  ? n.type === "follow"
                  : tabs === 1
                    ? n.type === "like" || n.type === "commentLike"
                    : tabs === 2
                      ? n.type === "list"
                      : tabs === 3
                        ? n.type === "comment"
                        : tabs === 4
                          ? n.type === "suggest"
                          : false,
              )
              .reverse(),
          },
        ]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: Notification }) => {
          if (item.type === "like" || item.type === "commentLike") {
            return (
              <NotificationLikeCard
                from={item.from}
                notificationId={item.id}
                date={item.date}
              />
            );
          }

          if (item.type === "list") {
            return (
              <NotificationListCard
                from={item.from}
                notificationId={item.id}
                date={item.date}
              />
            );
          }

          if (item.type === "follow") {
            return (
              <NotificationFollowCard
                from={item.from}
                notificationId={item.id}
                date={item.date}
              />
            );
          }

          if (item.type === "comment") {
            return (
              <NotificationCommentCard
                from={item.from}
                notificationId={item.id}
                date={item.date}
              />
            );
          }

          if (item.type === "suggest") {
            return (
              <NotificationSuggestionCard
                from={item.from}
                notificationId={item.id}
                date={item.date}
              />
            );
          }

          return null;
        }}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </View>
  );
};

export default NotificationPage;
