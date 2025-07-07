import { Post, PostAttachment } from "@/constants/Post";
import { View } from "react-native";
import FeedCardActions from "./FeedCardComponents/FeedCardActions";
import FeedCardAttachment from "./FeedCardComponents/FeedCardAttachment";
import FeedCardContent from "./FeedCardComponents/FeedCardContent";
import FeedCardHeader from "./FeedCardComponents/FeedCardHeader";

const FeedAttachmentCard = ({
  data,
  attachedData,
  index,
  handleModal,
}: {
  data: Post;
  attachedData: PostAttachment;
  index: number;
  handleModal: () => void;
}) => {
  return (
    <View
      className={
        "dark:bg-slate-900 bg-slate-400 rounded-2xl p-4 h-fit w-full mb-4"
      }
    >
      <FeedCardHeader data={data} handleModal={handleModal} />
      <FeedCardContent data={data} haveSpoiler={false} />
      <FeedCardAttachment attachedData={attachedData} />
      <FeedCardActions data={data} handleModal={handleModal} />
    </View>
  );
};

export default FeedAttachmentCard;
