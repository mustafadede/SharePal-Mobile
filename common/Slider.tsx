import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import ExploreSliderCard from "./ExploreSliderCard";

type DataItem = {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  name: string;
  media_type: string;
  release_date: string;
  first_air_date: string;
  overview: string;
};

type SliderProps = {
  data: DataItem[];
};

const Slider = ({ data }: SliderProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (data && data.length === 0) return;
    if (isInteracting) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [data, isInteracting]);

  return (
    <>
      <FlatList
        ref={flatListRef}
        className="flex-1 w-full bg-slate-400 h-96"
        horizontal
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExploreSliderCard
            photo={item?.poster_path || item?.backdrop_path}
            title={item?.title || item?.name}
            index={item?.id}
            key={item?.id}
            mediaType={item?.media_type || "movie"}
            backdrop={item?.backdrop_path || item?.poster_path}
            releaseDate={item?.release_date || item?.first_air_date}
            overview={item?.overview}
          />
        )}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => {
          setTimeout(() => setIsInteracting(false), 2000);
        }}
      />
      <View
        className="flex-row justify-center mt-2 space-x-2 bg-red-400"
        style={{
          zIndex: 50,
        }}
      >
        {data?.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 z-auto  rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </View>
    </>
  );
};

export default Slider;
