import FeedCommentCard from "./FeedCommentCard";
import FeedSpoilerCard from "./FeedSpoilerCard";
import FeedAttachmentCard from "./FeedAttachmentCard";
import Post from "@/constants/Post";

const FeedCard = ({ data, index }: { data: Post; index: number }) => {
  return !data.attachedFilm && !data.spoiler && !data.actionName ? (
    <FeedCommentCard data={data} index={index} />
  ) : data.attachedFilm && !data.actionName && !data.spoiler ? (
    <FeedAttachmentCard data={data} attachedData={data.attachedFilm} index={index} />
  ) : data.spoiler && !data.actionName ? (
    <FeedSpoilerCard data={data} index={index} />
  ) : null;
};

export default FeedCard;
