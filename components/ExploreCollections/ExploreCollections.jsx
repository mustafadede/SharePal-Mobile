import { ScrollView, FlatList } from "react-native";
import React from "react";
import ExploreCollection from "@/common/ExploreCollection";
import Collection from "@/assets/Collections/explore-collection.json";
const ExploreCollections = () => {
  return (
    <FlatList
      className="my-4"
      key={"Collection"}
      data={Collection}
      horizontal
      renderItem={({ item }) => <ExploreCollection title={item.title} photo={item.uri} />}
      keyExtractor={(item, index) => item.id.toString()}
    />
  );
};

export default ExploreCollections;
