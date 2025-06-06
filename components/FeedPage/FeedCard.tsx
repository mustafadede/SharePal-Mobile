import FeedCommentCard from "./FeedCommentCard";
import FeedSpoilerCard from "./FeedSpoilerCard";
import FeedAttachmentCard from "./FeedAttachmentCard";
import { Post } from "@/constants/Post";

const FeedCard = ({ data, index, handleModal }: { data: Post; index: number; handleModal: () => void }) => {
  return !data.attachedFilm && !data.spoiler && !data.actionName ? (
    <FeedCommentCard data={data} index={index} handleModal={handleModal} />
  ) : data.attachedFilm && !data.actionName && !data.spoiler ? (
    <FeedAttachmentCard data={data} attachedData={data.attachedFilm} index={index} handleModal={handleModal} />
  ) : data.spoiler && !data.actionName ? (
    <FeedSpoilerCard data={data} index={index} handleModal={handleModal} />
  ) : null;
};

export default FeedCard;
