import { View } from "react-native";
import FeedCardHeader from "./FeedCardComponents/FeedCardHeader";
import FeedCardContent from "./FeedCardComponents/FeedCardContent";
import FeedCardAttachment from "./FeedCardComponents/FeedCardAttachment";
import FeedCardActions from "./FeedCardComponents/FeedCardActions";
import { Post, PostAttachment } from "@/constants/Post";

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
    <View className={"bg-slate-900 rounded-2xl p-4 h-fit w-full mb-4"}>
      <FeedCardHeader data={data} handleModal={handleModal} />
      <FeedCardContent data={data} haveSpoiler={false} />
      <FeedCardAttachment attachedData={attachedData} />
      <FeedCardActions data={data} handleModal={handleModal} />
    </View>
  );
};

export default FeedAttachmentCard;
