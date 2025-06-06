import React from "react";
import { FlatList } from "react-native";
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
  return (
    <FlatList
      className="flex-1 w-full bg-slate-400 h-96"
      horizontal
      data={data} // Here, data is the correct array directly
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
      showsHorizontalScrollIndicator={false}
      pagingEnabled
    />
  );
};

export default Slider;
