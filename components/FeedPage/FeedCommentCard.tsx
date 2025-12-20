import { Post } from "@/constants/Post";
import React, { useState } from "react";
import { View } from "react-native";
import FeedCardActions from "./FeedCardComponents/FeedCardActions";
import FeedCardContent from "./FeedCardComponents/FeedCardContent";
import FeedCardHeader from "./FeedCardComponents/FeedCardHeader";

const FeedCommentCard = ({
  data,
  postPage,
  handleModal,
  handleOptions,
  setBottomSheetValues,
}: {
  data: Post;
  index: number;
  handleModal: () => void;
  handleOptions: () => void;
  setBottomSheetValues: () => void;
  postPage?: boolean;
}) => {
  const [options, setOptions] = useState(false);
  return (
    <>
      <View
        className={
          "dark:bg-slate-900 bg-white border dark:border-slate-900 border-slate-200 rounded-2xl p-4 h-fit w-full mb-4"
        }
      >
        <FeedCardHeader
          data={data}
          postPage={postPage}
          options={options}
          setOptions={handleOptions}
          setBottomSheetValues={setBottomSheetValues}
        />
        <FeedCardContent data={data} />
        <FeedCardActions
          data={data}
          postPage={postPage}
          handleModal={handleModal}
        />
      </View>
    </>
  );
};

export default FeedCommentCard;
