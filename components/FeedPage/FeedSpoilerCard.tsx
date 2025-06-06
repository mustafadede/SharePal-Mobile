import { View } from "react-native";
import React from "react";
import FeedCardHeader from "./FeedCardComponents/FeedCardHeader";
import FeedCardContent from "./FeedCardComponents/FeedCardContent";
import FeedCardActions from "./FeedCardComponents/FeedCardActions";
import FeedCardAttachment from "./FeedCardComponents/FeedCardAttachment";
import { Post } from "@/constants/Post";

const FeedSpoilerCard = ({ data, index, handleModal }: { data: Post; index: number; handleModal: () => void }) => {
  return (
    <View className={"bg-slate-900 rounded-2xl p-4 h-fit w-full mb-4"}>
      <FeedCardHeader data={data} handleModal={handleModal} />
      <FeedCardContent data={data} haveSpoiler={true} />
      {data?.attachedFilm && <FeedCardAttachment attachedData={data?.attachedFilm} />}
      <FeedCardActions data={data} handleModal={handleModal} />
    </View>
  );
};

export default FeedSpoilerCard;
