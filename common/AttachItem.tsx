import { createPostsActions } from "@/store/createpostSlice";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

const AttachItem = ({
  backdrop,
  poster,
  title,
  release_date,
  attached = false,
  hasUser = false,
}: {
  backdrop?: string;
  poster?: string;
  title?: string;
  release_date?: string;
  attached?: boolean;
  hasUser?: boolean;
}) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const date = release_date;
  const handleAttachment = () => {
    dispatch(
      createPostsActions.createPostAttachment({
        backdrop: backdrop,
        poster: poster,
        title: title,
        releaseDate: release_date,
      })
    );
    router.back();
  };

  return (
    poster && (
      <View className="flex-row items-center w-fit h-fit justify-between mt-4">
        <View className="flex-row items-center gap-2">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${poster}`,
            }}
            className="rounded-2xl"
            style={{
              width: 64,
              height: 96,
            }}
            resizeMode="cover"
          />
          <Text
            className="overflow-visible dark:text-white"
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{ maxWidth: 200 }}
          >
            {title}
          </Text>
          <Text className="text-md text-slate-400">({date?.slice(0, 4)})</Text>
        </View>
        {attached && (
          <TouchableOpacity
            className="justify-center h-12 py-0 px-4 border border-black dark:border-white rounded-lg"
            onPress={() => handleAttachment()}
          >
            {hasUser ? (
              <Feather
                name="send"
                size={16}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            ) : (
              <Entypo
                name="attachment"
                size={18}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    )
  );
};

export default AttachItem;
