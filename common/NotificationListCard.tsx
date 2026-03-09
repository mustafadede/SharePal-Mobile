import { Colors } from "@/constants/Colors";
import { NotificationCardProps } from "@/constants/Notifications";
import { deleteSelectedNotification } from "@/services/firebaseActions";
import { notificationActions } from "@/store/notificationSlice";
import { DateFormatter } from "@/utils/formatter";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useDispatch } from "react-redux";
import { toast } from "sonner-native";
import DummyImage from "./DummyImage";
const NotificationListCard = ({
  from,
  notificationId,
  date,
}: NotificationCardProps) => {
  const colorScheme = useColorScheme();
  const newDate = date && DateFormatter(date, "cards");
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDeletion = async () => {
    deleteSelectedNotification(notificationId).then((res) => {
      dispatch(notificationActions.deleteSelectedNotification(notificationId));
      res ? toast.success(t("notification.deleted")) : null;
    });
  };

  return (
    <Swipeable
      onSwipeableWillOpen={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      }}
      renderRightActions={() => (
        <>
          <TouchableOpacity
            onPress={handleDeletion}
            className="justify-center px-6 items-center rounded-xl"
          >
            <MaterialIcons name="delete" size={23} color="#b91c1c" />
          </TouchableOpacity>
        </>
      )}
      friction={2}
      rightThreshold={40}
    >
      <Pressable
        className="h-24 flex-row rounded-2xl mx-4 items-center border justify-between px-4 max-w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-200/10 mb-4"
        onPress={() => {
          console.log("pressed");
        }}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <View className="flex-row justify-center items-center">
          <TouchableOpacity>
            {from.photo ? (
              <Image
                source={{ uri: from.photo }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 100,
                }}
                contentFit="cover"
                cachePolicy={"memory"}
              />
            ) : (
              <DummyImage wide={64} />
            )}
          </TouchableOpacity>
          <View className="ml-4">
            <Text className="text-slate-700 dark:text-white">
              {from.nick} liste oluşturdu
            </Text>
            <Text className="text-slate-600 dark:text-slate-200">
              {newDate}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-center items-center">
          <Feather
            name="chevron-right"
            size={24}
            color={colorScheme === "dark" ? Colors.dark.tColor1 : "black"}
          />
        </View>
      </Pressable>
    </Swipeable>
  );
};

export default NotificationListCard;
