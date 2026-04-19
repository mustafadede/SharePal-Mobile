import { PostOptionsBottomSheetProps } from "@/constants/Post";
import { deleteSelectedPost } from "@/services/firebaseActions";
import { postsActions } from "@/store/postSlice";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { useDispatch } from "react-redux";
import { toast } from "sonner-native";

const PostOptionsBottomSheet = React.memo(
  ({ bottomSheetValues, handleClose }: PostOptionsBottomSheetProps) => {
    const thisYear = new Date().getFullYear();
    const { t } = useTranslation();
    const colorScheme = useColorScheme();
    const dispatch = useDispatch();
    const router = useRouter();
    const handleDeletion = () => {
      deleteSelectedPost(bottomSheetValues.postId.toString()).then((res) => {
        dispatch(postsActions.removePost(bottomSheetValues.postId.toString()));
        handleClose();

        toast.warning(
          res ? t("actions.deletedone") : t("actions.deleteunsuccessful"),
          {
            duration: 3000,
            closeButton: true,
            icon: res ? (
              <MaterialIcons
                name="done"
                size={20}
                color={colorScheme === "dark" ? "#f8fafc" : "black"}
              />
            ) : (
              <MaterialIcons
                name="clear"
                size={20}
                color={colorScheme === "dark" ? "#f8fafc" : "black"}
              />
            ),
            style: {
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.1)",
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 14,
            },
          },
        );
      });
    };
    return (
      <View className="px-5" style={{ gap: 24 }}>
        <View className="w-full flex flex-col gap-3">
          {/* Edit Post */}
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/editpost",
                params: {
                  spoiler: bottomSheetValues.spoiler?.toString() || "false",
                  postId: bottomSheetValues.postId.toString(),
                  mediaType: String(bottomSheetValues.mediaType),
                  release_date: String(bottomSheetValues.release_date),
                  id: bottomSheetValues.id.toString(),
                  title: String(bottomSheetValues.title),
                  content: String(bottomSheetValues.content),
                  backdrop: String(bottomSheetValues.backdrop),
                  posterPath: String(bottomSheetValues.posterPath),
                },
              });
              handleClose();
            }}
            className={`flex-row items-center justify-between rounded-xl px-4 py-3 border ${
              colorScheme === "dark"
                ? "border-white/10 bg-white/5"
                : "border-black/10 bg-black/5"
            }`}
          >
            <Text
              className={`text-base ${
                colorScheme === "dark" ? "text-slate-100" : "text-slate-800"
              }`}
            >
              {t("actions.edit")}
            </Text>
            <Ionicons
              name="create-outline"
              size={22}
              color={colorScheme === "dark" ? "#f8fafc" : "#0f172a"}
            />
          </TouchableOpacity>

          {/* Copy Link */}
          <TouchableOpacity
            className={`flex-row items-center justify-between rounded-xl px-4 py-3 border ${
              colorScheme === "dark"
                ? "border-white/10 bg-white/5"
                : "border-black/10 bg-black/5"
            }`}
          >
            <Text
              className={`text-base ${
                colorScheme === "dark" ? "text-slate-100" : "text-slate-800"
              }`}
            >
              {t("actions.copy")}
            </Text>
            <Ionicons
              name="link-outline"
              size={22}
              color={colorScheme === "dark" ? "#f8fafc" : "#0f172a"}
            />
          </TouchableOpacity>

          {/* Delete Post */}
          <TouchableOpacity
            onPress={() => handleDeletion()}
            className={`flex-row items-center justify-between rounded-xl px-4 py-3 border ${
              colorScheme === "dark"
                ? "bg-red-600/20 border-red-600"
                : "bg-red-300/20 border-red-400"
            }`}
          >
            <Text
              className={`text-base ${
                colorScheme === "dark" ? "text-red-400" : "text-red-600"
              }`}
            >
              {t("actions.delete")}
            </Text>
            <Ionicons
              name="trash-outline"
              size={22}
              color={colorScheme === "dark" ? "#f87171" : "#dc2626"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

export default PostOptionsBottomSheet;
