import ActionPill from "@/common/ActionPill";
import { DateFormatter } from "@/utils/formatter";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

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
    const NewYear = DateFormatter(bottomSheetValues.release_date, "Explore");
    const thisYear = new Date().getFullYear();
    const { t } = useTranslation();
    return (
      <>
        <View className="flex items-center justify-center">
          <Text className="text-2xl text-center text-slate-100">
            {bottomSheetValues.title}
            <Text className="text-slate-100"> {t("actions.title")}</Text>
          </Text>
        </View>
        <View className="flex items-center justify-center">
          <ActionPill
            title={t("actions.wanttowatch")}
            status={bottomSheetValues.wanttoWatch}
            icon={
              <FontAwesome
                name="bookmark-o"
                size={24}
                color={
                  bottomSheetValues.wanttoWatch ? "text-fuchsia-600" : "white"
                }
              />
            }
          />
          <ActionPill
            title={t("actions.watched")}
            status={bottomSheetValues.watched}
            icon={
              <FontAwesome
                name="bookmark"
                size={24}
                color={bottomSheetValues.watched ? "text-fuchsia-600" : "white"}
              />
            }
          />
          <ActionPill
            title={t("actions.currentlywatching")}
            icon={<FontAwesome name="eye" size={24} color="white" />}
          />
          <ActionPill
            title={t("actions.unfinished")}
            status={bottomSheetValues.unfinished}
            icon={
              <Ionicons
                name="pause-outline"
                size={24}
                color={
                  bottomSheetValues.unfinished ? "text-fuchsia-600" : "white"
                }
              />
            }
          />
          {bottomSheetValues.mediaType === "movie" &&
            bottomSheetValues.release_date.slice(0, 4) ===
              thisYear.toString() && (
              <ActionPill
                title={t("actions.bestmovies")}
                icon={<Entypo name="star" size={24} color="white" />}
              />
            )}
          {bottomSheetValues.mediaType === "tv" &&
            bottomSheetValues.release_date.slice(0, 4) ===
              thisYear.toString() && (
              <ActionPill
                title={t("actions.bestseries")}
                icon={<Entypo name="star" size={24} color="white" />}
              />
            )}
        </View>
      </>
    );
  }
);

export default ExploreBottomSheet;
