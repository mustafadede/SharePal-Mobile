import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useDispatch, useSelector } from "react-redux";
import { ListItem } from "../Profile/ListsCard";

const MyListModal = () => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const handleSearch = (text: string) => {
    setSearch(text);
  };
  const router = useRouter();

  const renderItem = useCallback(({ item }: { item: ListItem }) => {
    return (
      <Swipeable
        onSwipeableWillOpen={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        }}
        renderRightActions={() => (
          <>
            <TouchableOpacity
              onPress={() => {
                // Handle delete action here
              }}
              className="ml-4 justify-center px-6 items-center rounded-xl"
            >
              <MaterialIcons name="delete" size={23} color="#b91c1c" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // Handle edit action here
              }}
              className="ml-4 justify-center px-6 items-center rounded-xl"
            >
              <Feather name="edit-3" size={21} color={Colors.dark.cFuc6} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.navigate("/explore");
              }}
              className="ml-4 justify-center px-6 items-center rounded-xl"
            >
              <Ionicons
                name="add-outline"
                size={28}
                color={Colors.dark.cFuc6}
              />
            </TouchableOpacity>
          </>
        )}
        friction={2}
        rightThreshold={40}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            router.push({
              pathname: "/profile/[list]",
              params: { list: item.title, id: item.id },
            })
          }
          className="py-2 mx-4 px-4 border bg-white dark:bg-slate-950 flex-row justify-between border-slate-200 dark:border-slate-200/10 rounded-xl my-1 pt-4 pb-4"
        >
          <Text
            className={`text-base ${
              colorScheme === "dark" ? "text-slate-100" : "text-slate-800"
            }`}
          >
            {item.title}
          </Text>
          {item.isPinned && (
            <MaterialIcons
              name="push-pin"
              size={18}
              color={Colors.dark.cFuc6}
            />
          )}
        </TouchableOpacity>
      </Swipeable>
    );
  }, []);

  return (
    <BottomSheetView className="flex-1">
      <View className="flex flex-row gap-4 px-4 items-center">
        <BottomSheetTextInput
          placeholder={"Yeni liste ismi"}
          value={search}
          onChangeText={handleSearch}
          onSubmitEditing={() => {}}
          style={{
            backgroundColor:
              colorScheme === "dark"
                ? Colors.dark.cGradient2
                : Colors.light.cWhite,
            borderRadius: 12,
            height: 48,
            width: "80%",
            padding: 12,
            color: Colors.dark.cWhite,
          }}
          placeholderTextColor={Colors.dark.icon}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
        <Pressable>
          <Text className="text-black dark:text-cWhite px-4 py-2 rounded-2xl">
            Oluştur
          </Text>
        </Pressable>
      </View>
      <View className="h-full flex-1 mt-4">
        <FlatList
          data={profile?.lists}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={renderItem}
          scrollEnabled={false}
          removeClippedSubviews={false}
        />
      </View>
    </BottomSheetView>
  );
};

export default MyListModal;
