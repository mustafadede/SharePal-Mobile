import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";

type PostOptionsBottomSheetProps = {
  title: string;
  release_date: string;
  poster_path: string;
  mediaType: string;
  id: number;
  wanttowatch: boolean;
  watched: boolean;
  unfinished: boolean;
};

const PostOptionsBottomSheet = React.memo(
  ({
    bottomSheetValues,
    setBottomSheetValues,
  }: {
    bottomSheetValues: PostOptionsBottomSheetProps;
    setBottomSheetValues: ({}) => void;
  }) => {
    const thisYear = new Date().getFullYear();
    const { t } = useTranslation();
    const colorScheme = useColorScheme();

    return (
      <View className="px-5" style={{ gap: 24 }}>
        {/* Movie-specific */}
        {bottomSheetValues.mediaType === "movie" &&
          bottomSheetValues.release_date.slice(0, 4) ===
            thisYear.toString() && (
            <TouchableOpacity
              className={`flex-row items-center justify-between rounded-xl px-4 py-3 ${
                colorScheme === "dark" ? "bg-slate-600" : "bg-slate-200"
              }`}
            >
              <Text
                className={`text-base ${
                  colorScheme === "dark" ? "text-slate-100" : "text-slate-800"
                }`}
              >
                {t("actions.bestmovies")}
              </Text>
              <Entypo
                name="star"
                size={22}
                color={colorScheme === "dark" ? "yellow" : "#facc15"}
              />
            </TouchableOpacity>
          )}

        {/* Series-specific */}
        {bottomSheetValues.mediaType === "tv" &&
          bottomSheetValues.release_date.slice(0, 4) ===
            thisYear.toString() && (
            <TouchableOpacity
              className={`flex-row items-center justify-between rounded-xl px-4 py-3 ${
                colorScheme === "dark" ? "bg-slate-600" : "bg-slate-200"
              }`}
            >
              <Text
                className={`text-base ${
                  colorScheme === "dark" ? "text-slate-100" : "text-slate-800"
                }`}
              >
                {t("actions.bestseries")}
              </Text>
              <Entypo
                name="star"
                size={22}
                color={colorScheme === "dark" ? "yellow" : "#facc15"}
              />
            </TouchableOpacity>
          )}

        {/* Modern Minimal Buttons */}
        <View className="w-full flex flex-col gap-3">
          {/* Edit Post */}
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
              {t("actions.edit")}
            </Text>
            <Ionicons
              name="create-outline"
              size={22}
              color={colorScheme === "dark" ? "#f8fafc" : "#0f172a"}
            />
          </TouchableOpacity>

          {/* Share */}
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
              {t("actions.share")}
            </Text>
            <Ionicons
              name="share-social-outline"
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
  }
);

export default PostOptionsBottomSheet;
