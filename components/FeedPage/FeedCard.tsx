import { Post } from "@/constants/Post";
import React from "react";
import FeedAttachmentCard from "./FeedAttachmentCard";
import FeedCommentCard from "./FeedCommentCard";
import FeedSpoilerCard from "./FeedSpoilerCard";

const FeedCard = ({
  data,
  index,
  postPage = false,
  handleModal,
  handleOptions,
}: {
  data: Post;
  index: number;
  postPage?: boolean;
  handleOptions: () => void;
  handleModal: () => void;
}) => {
  return !data.attachedFilm && !data.spoiler && !data.actionName ? (
    <FeedCommentCard
      data={data}
      index={index}
      postPage={postPage}
      handleOptions={handleOptions}
      handleModal={handleModal}
    />
  ) : data.attachedFilm && !data.actionName && !data.spoiler ? (
    <FeedAttachmentCard
      data={data}
      attachedData={data.attachedFilm}
      index={index}
      postPage={postPage}
      handleOptions={handleOptions}
      handleModal={handleModal}
    />
  ) : data.spoiler && !data.actionName ? (
    <FeedSpoilerCard
      data={data}
      index={index}
      postPage={postPage}
      handleOptions={handleOptions}
      handleModal={handleModal}
    />
  ) : null;
};

export default React.memo(FeedCard);
