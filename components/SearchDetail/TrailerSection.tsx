import { TMDBVideo, TrailerSectionProps } from "@/constants/Videos";
import getSelectedVideos from "@/hooks/useGetSelectedVideos";
import { filterTrailers } from "@/utils/videos";
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
import YoutubePlayer from "react-native-youtube-iframe";
import StatusLabel from "../StatusLabel/StatusLabel";
import TrailerCard from "./TrailerCard";

const screenWidth = Dimensions.get("window").width;

const TrailerSection: React.FC<TrailerSectionProps> = ({ id, mediaType }) => {
  const [trailers, setTrailers] = useState<TMDBVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const { i18n, t } = useTranslation();

  const tmdbLanguage =
    i18n.language === "tr"
      ? "tr-TR"
      : i18n.language === "en"
        ? "en-US"
        : "en-US";

  useEffect(() => {
    (async () => {
      try {
        const res = await getSelectedVideos(id, mediaType, tmdbLanguage);
        const filtered = filterTrailers(res.results || []);
        setTrailers(filtered);
      } catch (e) {
        console.error("Trailer fetch error", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, mediaType, tmdbLanguage]);

  if (loading) {
    return <StatusLabel />;
  }

  return (
    <View className={"mt-4"}>
      <Text className="text-2xl px-4 mb-4 text-black dark:text-slate-300 mt-1">
        {t("trailer.title")}
      </Text>

      {trailers.length === 0 ? (
        <Text className="text-center px-4 text-slate-600 dark:text-slate-400">
          {t("trailer.notrailer")}
        </Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trailers.map((trailer) => (
            <TrailerCard
              key={trailer.key}
              thumbnailUrl={`https://img.youtube.com/vi/${trailer.key}/mqdefault.jpg`}
              title={trailer.name}
              onPress={() => setSelected(trailer.key)}
            />
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
    </View>
  );
};

export default TrailerSection;
