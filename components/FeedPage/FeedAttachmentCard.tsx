import { Post, PostAttachment } from "@/constants/Post";
import { useState } from "react";
import { View } from "react-native";
import FeedCardActions from "./FeedCardComponents/FeedCardActions";
import FeedCardAttachment from "./FeedCardComponents/FeedCardAttachment";
import FeedCardContent from "./FeedCardComponents/FeedCardContent";
import FeedCardHeader from "./FeedCardComponents/FeedCardHeader";
import FeedOptions from "./FeedOptions";

const FeedAttachmentCard = ({
  data,
  attachedData,
  index,
  postPage,
  handleModal,
}: {
  data: Post;
  attachedData: PostAttachment;
  index: number;
  postPage?: boolean;
  handleModal: () => void;
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
          setOptions={setOptions}
        />
        <FeedCardContent data={data} haveSpoiler={false} />
        <FeedCardAttachment attachedData={attachedData} />
        <FeedCardActions
          data={data}
          postPage={postPage}
          handleModal={handleModal}
        />
      </View>
      {options && <FeedOptions postId={data.postId} />}
    </>
  );
};

export default FeedAttachmentCard;
