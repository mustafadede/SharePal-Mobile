import Collection from "@/assets/collections/explore-collections.json";
import ExploreCollection from "@/common/ExploreCollection";
import React from "react";
import { FlatList } from "react-native";
const ExploreCollections = () => {
  return (
    <FlatList
      className="my-4 w-full h-fit flex-1 flex-row"
      key={"Collection"}
      data={Collection}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <ExploreCollection title={item.title} photo={item.uri} />}
      keyExtractor={(item, index) => item.id.toString()}
    />
  );
};

export default ExploreCollections;
