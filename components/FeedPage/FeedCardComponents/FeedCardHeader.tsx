import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import ImageComponent from "@/common/ImageComponent";
import DummyImage from "@/common/DummyImage";
import { DateFormatter } from "@/utils/formatter";
import { Post } from "@/constants/Post";
import Feather from "@expo/vector-icons/Feather";

const FeedCardHeader = ({ data }: { data: Post }) => {
  const navigation = useNavigation();
  const newYear = DateFormatter(data.date);
  const handleClick = () => {
    // navigate to post detail
  };
  return (
    <View className={"flex-row justify-between items-center"}>
      <View className={"flex-row gap-2 items-center mb-2"}>
        <TouchableOpacity className={"w-12 h-12 rounded-full bg-slate-800"} onPress={handleClick}>
          {data.photoURL && <ImageComponent url={`${data.photoURL}`} />}
          {!data.photoURL && <DummyImage wide={12} />}
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={handleClick}>
            <Text className={"text-fuchsia-600"}>@{data.nick || data.displayName}</Text>
          </TouchableOpacity>
          <Text className={"text-xs text-slate-400"}>{newYear}</Text>
        </View>
      </View>
      <View className={"flex-row gap-2 items-center"}>
        {data.spoiler && (
          <View className={"gap-1 flex-row items-center"}>
            <Feather name="lock" size={16} color={"#6B7280"} />
            <Text className={"text-xs text-slate-400"}>Spoiler</Text>
          </View>
        )}
        {data.edited && (
          <View className={"gap-1 flex-row items-center"}>
            <Text className={"text-xs text-slate-400"}>( Edited )</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default FeedCardHeader;
