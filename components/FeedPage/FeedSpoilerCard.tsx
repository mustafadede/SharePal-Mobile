import { Post } from "@/constants/Post";
import React, { useState } from "react";
import { View } from "react-native";
import FeedCardActions from "./FeedCardComponents/FeedCardActions";
import FeedCardAttachment from "./FeedCardComponents/FeedCardAttachment";
import FeedCardContent from "./FeedCardComponents/FeedCardContent";
import FeedCardHeader from "./FeedCardComponents/FeedCardHeader";

const FeedSpoilerCard = ({
  data,
  index,
  postPage,
  handleModal,
  handleOptions,
  setBottomSheetValues,
}: {
  data: Post;
  index: number;
  postPage?: boolean;
  handleModal: () => void;
  handleOptions: () => void;
  setBottomSheetValues: (option: boolean) => void;
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
          setBottomSheetValues={setBottomSheetValues}
          setOptions={handleOptions}
        />
        <FeedCardContent data={data} haveSpoiler={true} />
        {data?.attachedFilm && (
          <FeedCardAttachment attachedData={data?.attachedFilm} />
        )}
        <FeedCardActions
          data={data}
          postPage={postPage}
          handleModal={handleModal}
        />
      </View>
    </>
  );
};

export default FeedSpoilerCard;
