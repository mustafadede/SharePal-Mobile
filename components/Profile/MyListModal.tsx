import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useDispatch, useSelector } from "react-redux";
import { ListItem } from "../Profile/ListsCard";

const MyListModal = ({
  bottomSheetModalRef,
}: {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
}) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editItem, setEditItem] = useState<ListItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const profile = useSelector((state: RootState) => state.profile);
  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const handleModalOpen = useCallback(() => {
    bottomSheetModalRef.current?.snapToIndex(1);
  }, []);

  const handleModalClose = useCallback(() => {
    bottomSheetModalRef.current?.snapToIndex(0);
  }, []);

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
                setEditItem(item);
                setEditTitle(item.title);
                setEditModalVisible(true);
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

  useEffect(() => {
    if (editModalVisible) {
      handleModalClose();
    } else {
      handleModalOpen();
    }
  }, [editModalVisible]);

  return (
    <BottomSheetView className="flex-1">
      <Modal
        visible={editModalVisible}
        animationType="fade"
        transparent
        statusBarTranslucent
        backdropColor={
          colorScheme === "dark" ? Colors.dark.cGradient2 : Colors.dark.cWhite
        }
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor:
              colorScheme === "dark" ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "92%",
              backgroundColor:
                colorScheme === "dark"
                  ? Colors.dark.cGradient2
                  : Colors.dark.cWhite,
              borderRadius: 18,
              padding: 24,
              shadowColor: colorScheme === "dark" ? "#000" : "#334155",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <View className="flex flex-row gap-4">
              <AntDesign
                name="info-circle"
                size={24}
                color={
                  colorScheme === "dark"
                    ? Colors.dark.cWhite
                    : Colors.light.cDarkGray
                }
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  marginBottom: 16,
                  color:
                    colorScheme === "dark"
                      ? Colors.dark.cWhite
                      : Colors.light.cDarkGray,
                }}
              >
                {t("mylist.editmodal.title")}
              </Text>
            </View>
            <TextInput
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder={t("mylist.editmodal.placeholder")}
              placeholderTextColor={
                colorScheme === "dark" ? "#64748b" : "#94a3b8"
              }
              style={{
                borderWidth: 1,
                borderRadius: 14,
                padding: 12,
                borderColor: "transparent",
                marginBottom: 20,
                fontSize: 15,
                color:
                  colorScheme === "dark"
                    ? Colors.dark.cWhite
                    : Colors.light.cDarkGray,
              }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                style={{
                  flex: 1,
                  marginRight: 8,
                  borderRadius: 14,
                  paddingVertical: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color:
                      colorScheme === "dark"
                        ? Colors.dark.cWhite
                        : Colors.light.cDarkGray,
                    fontWeight: "600",
                    fontSize: 15,
                  }}
                >
                  {t("mylist.editmodal.cancel")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // Save edit logic here
                  // Example: dispatch update action
                  if (editItem) {
                    // dispatch(profileActions.updateList({ ...editItem, title: editTitle }));
                  }
                  setEditModalVisible(false);
                }}
                style={{
                  flex: 1,
                  marginLeft: 8,
                  borderRadius: 14,
                  paddingVertical: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: Colors.dark.cFuc6,
                    fontWeight: "700",
                    fontSize: 15,
                  }}
                >
                  {t("mylist.editmodal.save")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View className="flex flex-row gap-4 px-4 items-center">
        <BottomSheetTextInput
          placeholder={t("mylist.placeholder")}
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
            {t("mylist.create")}
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
