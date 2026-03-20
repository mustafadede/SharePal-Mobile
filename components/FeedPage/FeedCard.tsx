import { Post, PostAttachment } from "@/constants/Post";
import React from "react";
import { PostOptionsValues } from "../PostOptions/PostOptionsBottomSheet";
import FeedAttachmentCard from "./FeedAttachmentCard";
import FeedCommentCard from "./FeedCommentCard";
import FeedSpoilerCard from "./FeedSpoilerCard";

const FeedCard = ({
  data,
  index,
  postPage = false,
  handleOptions,
  setBottomSheetValues,
}: {
  data: Post;
  index: number;
  postPage?: boolean;
  handleOptions: () => void;
  setBottomSheetValues: React.Dispatch<React.SetStateAction<PostOptionsValues>>;
}) => {
  const hasAttachment =
    data.attachedFilm && Object.keys(data.attachedFilm).length > 0;

  return !hasAttachment && !data.spoiler && !data.actionName ? (
    <FeedCommentCard
      data={data}
      index={index}
      postPage={postPage}
      handleOptions={handleOptions}
      setBottomSheetValues={setBottomSheetValues}
    />
  ) : hasAttachment && !data.actionName && !data.spoiler ? (
    <FeedAttachmentCard
      data={data}
      attachedData={data.attachedFilm as PostAttachment}
      index={index}
      postPage={postPage}
      handleOptions={handleOptions}
      setBottomSheetValues={setBottomSheetValues}
    />
  ) : data.spoiler && !data.actionName ? (
    <FeedSpoilerCard
      data={data}
      index={index}
      postPage={postPage}
      handleOptions={handleOptions}
      setBottomSheetValues={setBottomSheetValues}
    />
  ) : null;
};

export default React.memo(FeedCard);
