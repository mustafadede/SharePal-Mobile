import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/constants/Colors";
import { DateFormatter } from "@/utils/formatter";

const CommentCards = ({ item, index }) => {
  const newDate = DateFormatter(item[index].date);
  return (
    <View className="flex-row items-center w-full px-2 h-fit">
      <View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity>
              <Image source={{ uri: item[index].photoURL }} style={{ width: 40, height: 40, borderRadius: 20 }} />
            </TouchableOpacity>
            <View className="ml-2">
              <TouchableOpacity>
                <Text className="mr-1 text-fuchsia-600">@{item[index].nick}</Text>
              </TouchableOpacity>
              <Text className="text-xs text-slate-300">{newDate}</Text>
            </View>
          </View>
        </View>
        <View className="flex-1 w-full h-fit">
          <View className="flex-row items-center">
            <Text className="my-1 text-slate-100">{item[index].comment}</Text>
          </View>
        </View>
      </View>
      <View className="items-center ml-4">
        <TouchableOpacity>
          <Entypo name={"heart-outlined"} size={18} color={Colors.dark.tColor1} />
        </TouchableOpacity>
        <Text className="text-slate-300">{item[index].likes || 0}</Text>
      </View>
    </View>
  );
};

export default CommentCards;
