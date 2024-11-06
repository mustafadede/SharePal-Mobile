import { View, Text } from "react-native";
import React from "react";
import PrimaryTitle from "../Registration/PrimaryTitle";
import { FlatList } from "react-native";
import ExploreCard from "../ExploreCard/ExploreCard";
import { Movie } from "@/constants/Movie";

const ExploreListSection = ({
  exploreTitle,
  data,
  sliderType,
  setBottomSheetVisible,
  setBootomSheetValues,
}: {
  exploreTitle: string;
  data: object[];
  sliderType: string;
  setBottomSheetVisible: () => void;
  setBootomSheetValues: (value: object) => void;
}) => {
  return (
    <>
      <PrimaryTitle title={exploreTitle} additionalClassnames="text-slate-200 pl-4" />
      {!data && (
        <FlatList
          key={"nowPlaying"}
          className="flex-1 px-4 mb-2 h-72"
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          horizontal
          renderItem={({ item }: { item: number }) => <ExploreCard loading={true} />}
          keyExtractor={(item) => item}
        />
      )}
      {data && (
        <FlatList
          className="flex-1 px-4 mb-2 h-72"
          data={data}
          key={exploreTitle}
          horizontal
          renderItem={({ item }: { item: Movie }) => (
            <ExploreCard
              item={item}
              sliderType={sliderType}
              setBottomSheetVisible={setBottomSheetVisible}
              setBootomSheetValues={setBootomSheetValues}
            />
          )}
          keyExtractor={(item: Movie) => item.id.toString()}
        />
      )}
    </>
  );
};

export default ExploreListSection;
