import ActionPill from "@/common/ActionPill";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

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
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          alignItems: "center",
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
            color: "#f1f5f9",
          }}
        >
          {bottomSheetValues.title}{" "}
          <Text style={{ fontWeight: "500", color: "#f1f5f9" }}>
            {t("actions.title")}
          </Text>
        </Text>

        {/* Actions */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <ActionPill
            title={t("actions.wanttowatch")}
            status={bottomSheetValues.wanttoWatch}
            icon={
              <FontAwesome
                name="bookmark-o"
                size={22}
                color={bottomSheetValues.wanttoWatch ? "#C026D3" : "#fff"}
              />
            }
            pillStyle={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 20,
              backgroundColor: bottomSheetValues.wanttoWatch
                ? "rgba(192,38,211,0.15)"
                : "rgba(255,255,255,0.05)",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 2,
            }}
          />
          <ActionPill
            title={t("actions.watched")}
            status={bottomSheetValues.watched}
            icon={
              <FontAwesome
                name="bookmark"
                size={22}
                color={bottomSheetValues.watched ? "#C026D3" : "#fff"}
              />
            }
            pillStyle={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 20,
              backgroundColor: bottomSheetValues.watched
                ? "rgba(192,38,211,0.15)"
                : "rgba(255,255,255,0.05)",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 2,
            }}
          />
          <ActionPill
            title={t("actions.currentlywatching")}
            icon={<FontAwesome name="eye" size={22} color="#fff" />}
            pillStyle={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 20,
              backgroundColor: "rgba(255,255,255,0.05)",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 2,
            }}
          />
          <ActionPill
            title={t("actions.unfinished")}
            status={bottomSheetValues.unfinished}
            icon={
              <Ionicons
                name="pause-outline"
                size={22}
                color={bottomSheetValues.unfinished ? "#C026D3" : "#fff"}
              />
            }
            pillStyle={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 20,
              backgroundColor: bottomSheetValues.unfinished
                ? "rgba(192,38,211,0.15)"
                : "rgba(255,255,255,0.05)",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 2,
            }}
          />
          {bottomSheetValues.mediaType === "movie" &&
            bottomSheetValues.release_date.slice(0, 4) ===
              thisYear.toString() && (
              <ActionPill
                title={t("actions.bestmovies")}
                icon={<Entypo name="star" size={22} color="#fff" />}
                pillStyle={{
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  shadowColor: "#000",
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              />
            )}
          {bottomSheetValues.mediaType === "tv" &&
            bottomSheetValues.release_date.slice(0, 4) ===
              thisYear.toString() && (
              <ActionPill
                title={t("actions.bestseries")}
                icon={<Entypo name="star" size={22} color="#fff" />}
                pillStyle={{
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  shadowColor: "#000",
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              />
            )}
        </View>
      </ScrollView>
    );
  }
);

export default ExploreBottomSheet;
