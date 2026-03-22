import { Colors } from "@/constants/Colors";
import { Movie } from "@/constants/Movie";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";

type ExploreBottomSheetProps = {
  title: string;
  release_date: string;
  poster_path: string;
  mediaType: string;
  id: number;
  wanttowatch: boolean;
  watched: boolean;
  unfinished: boolean;
};

const ExploreCard = React.memo(
  ({
    item,
    loading = false,
    sliderType,
    openBottomSheet,
    explore,
    feed,
  }: {
    item: Movie;
    loading?: boolean;
    sliderType: string;
    openBottomSheet: (values: ExploreBottomSheetProps) => void;
    explore?: boolean;
    feed?: boolean;
  }) => {
    const router = useRouter();
    const shimmerAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
      if (!loading) return;

      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]),
      );

      loop.start();

      return () => loop.stop();
    }, []);

    return (
      <TouchableOpacity
        className={
          feed
            ? "relative w-32 rounded-2xl mr-4"
            : explore
              ? "relative w-full rounded-2xl mr-4"
              : "relative w-48 rounded-2xl mr-4"
        }
        onLongPress={() => {
          if (feed) return;
          openBottomSheet({
            title: item.title || item.name,
            release_date: item.release_date || item.first_air_date,
            poster_path: item.poster_path || item.backdrop_path,
            mediaType: sliderType || item.media_type,
            id: item.id,
            wanttowatch: false,
            watched: false,
            unfinished: false,
          });

          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        }}
        onPress={() => {
          router.navigate({
            pathname: "/searchdetail",
            params: {
              title: item.title || item.name,
              release_date: item.release_date || item.first_air_date,
              poster_path: item.poster_path || item.backdrop_path,
              mediaType: sliderType || item.media_type,
              id: item.id,
              backdrop_path: item.backdrop_path || item.poster_path,
            },
          });
        }}
      >
        {(item.poster_path || item.backdrop_path) && (
          <Animated.View
            style={{
              position: "absolute",
              width: "100%",
              height: feed ? "91%" : "100%",
              borderRadius: 16,
              backgroundColor: shimmerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["#374151", "#1f2937"], // slate-700 to slate-800
              }),
            }}
          >
            <Animated.Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${item.poster_path || item.backdrop_path}`,
              }}
              className={
                feed
                  ? "absolute w-full h-48 rounded-2xl"
                  : "absolute w-full h-full rounded-2xl"
              }
              style={{
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                opacity: opacityAnim,
              }}
              blurRadius={0}
              onLoad={() => {
                setImageLoaded(true);
                Animated.timing(opacityAnim, {
                  toValue: 1,
                  duration: 500,
                  useNativeDriver: true,
                }).start();
              }}
            />
          </Animated.View>
        )}
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.8)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.2 }}
          className="absolute bottom-0 w-full h-full rounded-b-2xl"
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
        {!feed && (
          <TouchableOpacity className="absolute top-2 right-0 pr-1 mr-1 rounded-full">
            <Feather name="plus" size={24} color={Colors.dark.cWhite} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  },
);

export default ExploreCard;
