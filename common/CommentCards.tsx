import { Colors } from "@/constants/Colors";
import { DateFormatter } from "@/utils/formatter";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CommentCards = ({ item, index }) => {
  const newDate = DateFormatter(item?.date || 0);
  console.log(item);

  return (
    <View
      key={index}
      className="dark:bg-slate-900 bg-white border dark:border-slate-900 border-slate-200 rounded-2xl p-4 h-fit w-full mb-4"
      style={{
        flexDirection: "row",
        width: "100%",
        paddingVertical: 8,
        paddingHorizontal: 12,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ gap: 6 }}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity>
              {item?.photoURL ? (
                <Image
                  source={{ uri: item.photoURL }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />
              ) : (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#ccc",
                  }}
                />
              )}
            </TouchableOpacity>
            <View className="ml-2 gap-1">
              <TouchableOpacity>
                <Text className="mr-1 text-fuchsia-600">@{item.nick}</Text>
              </TouchableOpacity>
              <Text className="text-xs text-black dark:text-white">
                {newDate}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexShrink: 1 }}>
          <View className="flex-row items-center w-80">
            <Text className="text-black text-base dark:text-white">
              {item.comment}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 8,
        }}
      >
        <TouchableOpacity>
          <Entypo
            name={"heart-outlined"}
            size={18}
            color={Colors.dark.tColor1}
          />
        </TouchableOpacity>
        <Text className="w-3 text-black dark:text-white">
          {item.likes || 0}
        </Text>
      </View>
    </View>
  );
};

export default CommentCards;
