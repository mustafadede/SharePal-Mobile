import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/constants/Colors";
import { DateFormatter } from "@/utils/formatter";

const CommentCards = ({ item, index }) => {
  const newDate = DateFormatter(item?.date || 0);

  return (
    <View key={index} className="flex-row items-center flex-1 px-2 h-fit">
      <View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity>
              {item?.photoURL ? (
                <Image source={{ uri: item.photoURL }} style={{ width: 40, height: 40, borderRadius: 20 }} />
              ) : (
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.dark.icon }}></View>
              )}
            </TouchableOpacity>
            <View className="ml-2">
              <TouchableOpacity>
                <Text className="mr-1 text-fuchsia-600">@{item.nick}</Text>
              </TouchableOpacity>
              <Text className="text-xs text-slate-300">{newDate}</Text>
            </View>
          </View>
        </View>
        <View className="flex-1 w-80 h-fit">
          <View className="flex-row items-center">
            <Text className="my-1 text-slate-100">{item.comment}</Text>
          </View>
        </View>
      </View>
      <View className="items-end flex-1 mr-2">
        <TouchableOpacity>
          <Entypo name={"heart-outlined"} size={18} color={Colors.dark.tColor1} />
        </TouchableOpacity>
        <Text className="w-3 text-slate-300">{item.likes || 0}</Text>
      </View>
    </View>
  );
};

export default CommentCards;
