import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { DateFormatter } from "@/utils/formatter";
import ActionPill from "@/common/ActionPill";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

type ExploreBottomSheetProps = {
  title: string;
  release_date: string;
  poster_path: string;
  mediaType: string;
  id: number;
};

const ExploreBottomSheet = React.memo(({ bootomSheetValues }: { bootomSheetValues: ExploreBottomSheetProps }) => {
  const NewYear = DateFormatter(bootomSheetValues.release_date, "Explore");
  const thisYear = new Date().getFullYear();
  const { t } = useTranslation();
  return (
    <>
      <View className="flex items-center justify-center">
        <Text className="text-lg text-center text-slate-100">
          {bootomSheetValues.title}
          <Text className="text-slate-100"> {t("actions.title")}</Text>
        </Text>
      </View>
      <View className="flex items-center justify-center">
        <ActionPill title={t("actions.wanttowatch")} icon={<FontAwesome name="bookmark-o" size={24} color="white" />} />
        <ActionPill title={t("actions.watched")} icon={<FontAwesome name="bookmark" size={24} color="white" />} />
        <ActionPill title={t("actions.currentlywatching")} icon={<FontAwesome name="eye" size={24} color="white" />} />
        <ActionPill title={t("actions.unfinished")} icon={<Ionicons name="pause-outline" size={24} color="white" />} />
        {bootomSheetValues.mediaType === "movie" && bootomSheetValues.release_date.slice(0, 4) === thisYear.toString() && (
          <ActionPill title={t("actions.bestmovies")} icon={<Entypo name="star" size={24} color="white" />} />
        )}
        {bootomSheetValues.mediaType === "tv" && bootomSheetValues.release_date.slice(0, 4) === thisYear.toString() && (
          <ActionPill title={t("actions.bestseries")} icon={<Entypo name="star" size={24} color="white" />} />
        )}
      </View>
    </>
  );
});

export default ExploreBottomSheet;
