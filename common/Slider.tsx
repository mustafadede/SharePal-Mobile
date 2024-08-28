import { View, Text, FlatList } from "react-native";
import React from "react";
import ExploreSliderCard from "./ExploreSliderCard";

const Slider = ({ data }: { data: object[] }) => {
  return (
    <FlatList
      className="flex-1 w-full bg-slate-800 h-80"
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
          overview={item?.overview || item?.synopsis}
        />
      )}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
    />
  );
};

export default Slider;
