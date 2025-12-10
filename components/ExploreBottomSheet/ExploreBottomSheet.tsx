import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

type ExploreBottomSheetProps = {
  title: string;
  release_date: string;
  poster_path: string;
  mediaType: string;
  id: number;
  wanttoWatch?: boolean;
  watched?: boolean;
  unfinished?: boolean;
};

const ExploreBottomSheet = React.memo(
  ({ bottomSheetValues }: { bottomSheetValues: ExploreBottomSheetProps }) => {
    const thisYear = new Date().getFullYear();
    const { t } = useTranslation();

    return (
      <View className="px-5 pb-6 border" style={{ gap: 24 }}>
        {/* Title */}
        <View className="w-full">
          <Text className="text-xl font-bold text-slate-100 leading-snug">
            {bottomSheetValues.title}{" "}
            <Text className="font-medium text-slate-300">
              {t("actions.title")}
            </Text>
          </Text>
        </View>

        {/* Movie-specific */}
        {bottomSheetValues.mediaType === "movie" &&
          bottomSheetValues.release_date.slice(0, 4) ===
            thisYear.toString() && (
            <TouchableOpacity className="flex-row items-center justify-between bg-slate-600 rounded-xl px-4 py-3">
              <Text className="text-slate-100 text-base">
                {t("actions.bestmovies")}
              </Text>
              <Entypo name="star" size={22} color="yellow" />
            </TouchableOpacity>
          )}

        {/* Series-specific */}
        {bottomSheetValues.mediaType === "tv" &&
          bottomSheetValues.release_date.slice(0, 4) ===
            thisYear.toString() && (
            <TouchableOpacity className="flex-row items-center justify-between bg-slate-600 rounded-xl px-4 py-3">
              <Text className="text-slate-100 text-base">
                {t("actions.bestseries")}
              </Text>
              <Entypo name="star" size={22} color="yellow" />
            </TouchableOpacity>
          )}

        {/* Modern Minimal Buttons */}
        <View className="w-full flex flex-col gap-3">
          {/* Want to Watch */}
          <TouchableOpacity
            className={
              "flex-row items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3" +
              (bottomSheetValues.wanttoWatch
                ? " border-fuchsia-600 bg-fuchsia-600/20"
                : "")
            }
          >
            <Text className="text-slate-100 text-base">
              {t("actions.wanttowatch")}
            </Text>
            <FontAwesome name="bookmark-o" size={22} color="#f8fafc" />
          </TouchableOpacity>

          {/* Watched */}
          <TouchableOpacity
            className={
              "flex-row items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3" +
              (bottomSheetValues.watched
                ? " border-fuchsia-600 bg-fuchsia-600/20"
                : "")
            }
          >
            <Text className="text-slate-100 text-base">
              {t("actions.watched")}
            </Text>
            <FontAwesome name="bookmark" size={22} color="#f8fafc" />
          </TouchableOpacity>

          {/* Currently Watching */}
          <TouchableOpacity className="flex-row items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3">
            <Text className="text-slate-100 text-base">
              {t("actions.currentlywatching")}
            </Text>
            <FontAwesome name="eye" size={22} color="#f8fafc" />
          </TouchableOpacity>

          {/* Unfinished */}
          <TouchableOpacity
            className={
              "flex-row items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3" +
              (bottomSheetValues.unfinished
                ? " border-fuchsia-600 bg-fuchsia-600/20"
                : "")
            }
          >
            <Text className="text-slate-100 text-base">
              {t("actions.unfinished")}
            </Text>
            <Ionicons name="pause-outline" size={22} color="#f8fafc" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

export default ExploreBottomSheet;
