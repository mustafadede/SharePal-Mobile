import { TMDBVideo } from "@/constants/Videos";
import getSelectedVideos from "@/hooks/useGetSelectedVideos";
import { filterBloopers } from "@/utils/videos";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import YoutubePlayer from "react-native-youtube-iframe";
import TrailerCard from "./TrailerCard";

type Props = {
  id: string;
  mediaType: "movie" | "tv";
};

const screenWidth = Dimensions.get("window").width;

const BlooperSection: React.FC<Props> = ({ id, mediaType }) => {
  const { t, i18n } = useTranslation();
  const [bloopers, setBloopers] = useState<TMDBVideo[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const tmdbLanguage = i18n.language === "tr" ? "tr-TR" : "en-US";

  useEffect(() => {
    (async () => {
      try {
        const res = await getSelectedVideos(id, mediaType, tmdbLanguage);
        setBloopers(filterBloopers(res.results));
      } catch (e) {
        console.log("Blooper fetch error", e);
      }
    })();
  }, [id, mediaType, tmdbLanguage]);

  if (bloopers.length === 0) return null;

  return (
    <Animated.View
      entering={FadeInUp.duration(400).delay(1700)}
      className={"mt-4"}
    >
      <Text className="text-2xl mb-4 text-black dark:text-slate-300 mt-1">
        {t("bloopers.title")}
      </Text>

      {/* Cards */}
      {bloopers.length === 0 ? (
        <Text className="text-center text-slate-600 dark:text-slate-400">
          {t("trailer.notrailer")}
        </Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bloopers.map((video) => (
            <TouchableOpacity key={video.key} activeOpacity={0.85}>
              <TrailerCard
                thumbnailUrl={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                title={video.name}
                onPress={() => setSelected(video.key)}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <Modal
        visible={!!selected}
        animationType="fade"
        transparent
        onRequestClose={() => setSelected(null)}
      >
        <View className="flex-1 bg-black/90 items-center justify-center">
          <Pressable
            onPress={() => setSelected(null)}
            className="absolute top-10 right-6 z-20 p-2"
          >
            <Text className="text-white text-4xl font-bold">×</Text>
          </Pressable>

          {selected && (
            <View
              className="rounded-xl overflow-hidden bg-black"
              style={{
                width: screenWidth * 0.95,
                height: (screenWidth * 0.95 * 9) / 16,
              }}
            >
              <YoutubePlayer
                height={(screenWidth * 0.95 * 9) / 16}
                width={screenWidth * 0.95}
                videoId={selected}
                play
                initialPlayerParams={{
                  controls: false,
                  rel: false,
                  modestbranding: true,
                }}
              />
              <TouchableOpacity
                style={{
                  top: 0,
                  height: 50,
                  width: "100%",
                  elevation: 50,
                  zIndex: 50,
                  position: "absolute",
                }}
              />
            </View>
          )}
        </View>
      </Modal>
    </Animated.View>
  );
};

export default BlooperSection;
