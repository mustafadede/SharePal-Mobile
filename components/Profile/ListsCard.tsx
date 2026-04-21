import InfoLabel from "@/common/InfoLabel";
import { Colors } from "@/constants/Colors";
import { getSelectedUserLists } from "@/services/firebaseActions";
import { RootState } from "@/store";
import { profileActions } from "@/store/profileSlice";
import { userProfileActions } from "@/store/userProfileSlice";
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useDispatch, useSelector } from "react-redux";
import StatusLabel from "../StatusLabel/StatusLabel";

export type ListItem = { title: string; [key: string]: any };

const ListsCard = ({
  user = false,
  handlePresentModalPress = () => {},
}: {
  user?: boolean;
  handlePresentModalPress?: () => void;
}) => {
  const otherProfile = useSelector((state: RootState) => state.userProfile);
  const yourProfile = useSelector((state: RootState) => state.profile);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editItem, setEditItem] = useState<ListItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const profile = user ? otherProfile : yourProfile;
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(profileActions.setStatus("idle"));
        dispatch(userProfileActions.resetLists());
        dispatch(profileActions.resetLists());
        const selectedUserId = user ? String(id) : profile.userId;
        const list = await getSelectedUserLists(selectedUserId);

        if (!list || list instanceof Error) {
          dispatch(profileActions.initilizeLists([]));
          dispatch(userProfileActions.initilizeLists([]));
        } else {
          if (user) {
            dispatch(userProfileActions.initilizeLists(list));
            dispatch(userProfileActions.setStatus("done"));
          } else {
            dispatch(profileActions.initilizeLists(list));
            dispatch(profileActions.setStatus("done"));
          }
        }
        setLoading(false);
      } catch (error) {
        console.log("List fetch error:", error);
        dispatch(profileActions.initilizeLists([]));
        dispatch(userProfileActions.initilizeLists([]));
        dispatch(profileActions.setStatus("done"));
        dispatch(userProfileActions.setStatus("done"));
      }
    };

    fetch();
  }, []);

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
          className="py-2 mx-4 px-4 border bg-white dark:bg-slate-900 flex-row justify-between border-slate-200 dark:border-slate-200/10 rounded-xl my-1 pt-4 pb-4"
        >
          <Text className="text-slate-700 dark:text-white">{item.title}</Text>
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
    <View className="flex-1 h-full">
      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        animationType="fade"
        transparent
        style={{
          flex: 1,
        }}
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
      {/* ...existing code... */}
      {user && (
        <TouchableOpacity
          activeOpacity={1}
          className="rounded-xl px-5 py-4 flex flex-row mb-2 justify-between"
        >
          <Text className="text-slate-600 dark:text-slate-200">
            {t("profile.createlistforuser")}
          </Text>
          <Feather
            name="chevron-right"
            size={18}
            color={colorScheme === "dark" ? "#e2e8f0" : "#475569"}
          />
        </TouchableOpacity>
      )}
      {!user && (
        <View>
          {profile.status !== "done" ? (
            <View className="align-middle">
              <StatusLabel />
            </View>
          ) : (
            <FlatList
              data={profile?.lists}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              renderItem={renderItem}
              scrollEnabled={false}
              removeClippedSubviews={false}
            />
          )}
        </View>
      )}
      {user && loading ? (
        <View className="align-middle">
          <StatusLabel />
        </View>
      ) : (
        otherProfile.lists?.map((list: ListItem, index: number) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() =>
              router.push({
                pathname: "/userprofile/list/[list]",
                params: { list: list.title, id: list.id },
              })
            }
            className="py-2 mx-4 border bg-white dark:bg-slate-900 flex-row justify-between border-slate-200 dark:border-slate-200/10 rounded-xl my-1 px-4 pt-4 pb-4"
          >
            <Text className="text-slate-700 dark:text-white">{list.title}</Text>
            {list.isPinned && (
              <MaterialIcons
                name="push-pin"
                size={18}
                color={Colors.dark.cFuc6}
                style={{
                  transform: [{ rotate: "45deg" }],
                }}
              />
            )}
          </TouchableOpacity>
        ))
      )}
      {!loading && id && !otherProfile.lists.length && (
        <View className="mt-2">
          <InfoLabel status="Kullanıcıya ait bir liste yoktur" small />
        </View>
      )}
    </View>
  );
};

export default ListsCard;
