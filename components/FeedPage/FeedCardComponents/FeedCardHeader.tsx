import DummyImage from "@/common/DummyImage";
import ImageComponent from "@/common/ImageComponent";
import { Post } from "@/constants/Post";
import { RootState } from "@/store";
import { DateFormatter } from "@/utils/formatter";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { useSelector } from "react-redux";

const FeedCardHeader = ({
  data,
  postPage = false,
  setOptions,
  options,
}: {
  data: Post;
  postPage?: boolean;
  options: boolean;
  setOptions: (option: boolean) => void;
}) => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const newYear = DateFormatter(data.date);
  const { userId } = useSelector((state: RootState) => state.profile);
  const handleClick = () => {
    if (data.userId === userId) {
      router.push("/profile");
    } else {
      router.push({
        pathname: "/userprofile/[id]",
        params: {
          id: data.userId,
          username: data.nick,
        },
      });
    }
  };
  const handleOptions = () => {
    setOptions(!options);
  };
  return (
    <View className={"flex-row justify-between items-center"}>
      <View className={"flex-row gap-2 items-center mb-2"}>
        <TouchableOpacity
          className={"w-12 h-12 rounded-full dark:bg-slate-800"}
          onPress={handleClick}
        >
          {data.photoURL && <ImageComponent url={`${data.photoURL}`} />}
          {!data.photoURL && <DummyImage wide={12} />}
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={handleClick}>
            <Text className={"text-fuchsia-600"}>
              @{data.nick || data.displayName}
            </Text>
          </TouchableOpacity>
          <Text className={"text-xs text-slate-600 dark:text-slate-400"}>
            {newYear}
          </Text>
        </View>
      </View>
      <View className="flex-row-reverse items-center gap-1">
        {data.userId === userId && !postPage && (
          <TouchableOpacity onPress={handleOptions}>
            <Text
              className={"text-black dark:text-slate-400 text-xl mb-3 ml-1"}
            >
              ...
            </Text>
          </TouchableOpacity>
        )}
        {data.spoiler && (
          <View className={"flex-row items-start"}>
            <Feather
              name="lock"
              size={16}
              color={colorScheme === "dark" ? "#6B7280" : "black"}
            />
            <Text className={"text-xs text-black dark:text-slate-400 ml-1"}>
              {t("feedCard.spoiler")}
            </Text>
          </View>
        )}
        {data.edited && (
          <View className={"flex-row items-start mr-1"}>
            <Text className={"text-xs text-black dark:text-slate-400 ml-1"}>
              {t("feedCard.edited")}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default FeedCardHeader;
