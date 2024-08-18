import { View, Text } from "react-native";
import React from "react";
import PrimaryTitle from "../Registration/PrimaryTitle";
import { FlatList } from "react-native";
import ExploreCard from "../ExploreCard/ExploreCard";
import { Movie } from "@/constants/Movie";

const ExploreListSection = ({
  exploreTitle,
  data,
  setBottomSheetVisible,
  setBootomSheetValues,
}: {
  exploreTitle: string;
  data: object[];
  setBottomSheetVisible: (value: boolean) => void;
  setBootomSheetValues: (value: object) => void;
}) => {
  return (
    <>
      <PrimaryTitle title={exploreTitle} additionalClassnames="text-slate-200 pl-4" />
      {data ? (
        <FlatList
          className="flex-1 px-4 mb-2 h-72"
          data={data}
          key={exploreTitle}
          horizontal
          renderItem={({ item }: { item: Movie }) => (
            <ExploreCard
              title={item.title || item.name}
              release_date={item.release_date}
              poster_path={item.poster_path}
              setBottomSheetVisible={setBottomSheetVisible}
              setBootomSheetValues={setBootomSheetValues}
            />
          )}
          keyExtractor={(item: Movie) => item.id.toString()}
        />
      ) : (
        <FlatList
          key={"nowPlaying"}
          className="flex-1 px-4 mb-2 h-72"
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          horizontal
          renderItem={({ item }: { item: number }) => <ExploreCard loading={true} />}
          keyExtractor={(item) => item}
        />
      )}
    </>
  );
};

export default ExploreListSection;
