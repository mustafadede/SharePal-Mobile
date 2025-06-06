import CustomBottomSheet from "@/common/CustomBottomSheet";
import Line from "@/common/Line";
import Recommendation from "@/common/Recommendation";
import { Colors } from "@/constants/Colors";
import { RootState } from "@/store";
import { modalActions } from "@/store/modalSlice";
import { postsActions } from "@/store/postSlice";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "expo-router";
import React, { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

const createpost = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userId, photoURL, nick } = useSelector(
    (state: RootState) => state.profile
  );
  const { createdPost, createdPostLength, attachedFilm, status, error } =
    useSelector((state: RootState) => state.post);
  const { modalStatus, modalType, modalProps } = useSelector(
    (state: RootState) => state.modal
  );
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    dispatch(modalActions.updateModalType("attach"));
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    if (index < 0) {
      dispatch(modalActions.closeModal());
    }
  }, []);

  const handlePost = () => {
    dispatch(
      postsActions.addPost({
        ...createdPost,
        userId: userId,
        nick: nick,
        date: new Date().toISOString(),
        photoURL: photoURL,
      })
    );
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(modalActions.updateModalType("attach"));
    if (createdPost.spoiler) {
      dispatch(postsActions.setSpoiler());
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        createdPostLength > 0 && createdPostLength <= 280 ? (
          <TouchableOpacity onPress={handlePost}>
            <Feather name="send" size={24} color={Colors.dark.cWhite} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled>
            <Feather name="send" size={24} color={Colors.dark.icon} />
          </TouchableOpacity>
        ),
    });
  }, [createdPostLength, createdPost.spoiler]);

  return (
    <GestureHandlerRootView className="w-full h-full">
      <ScrollView className="flex-1 bg-cGradient2">
        <TextInput
          autoFocus
          style={{
            backgroundColor: "#1e293b",
            borderRadius: 12,
            padding: 8,
            marginHorizontal: 8,
            color: Colors.dark.cWhite,
            height: 100,
            fontSize: 18,
            marginTop: 10,
          }}
          multiline
          selectionColor="#C026D3"
          textAlignVertical="top"
          numberOfLines={6}
          clearButtonMode="while-editing"
          onChange={(e) => {
            dispatch(postsActions.createPostLength(e.nativeEvent.text.length));
            dispatch(
              postsActions.createPost({
                ...createdPost,
                content: e.nativeEvent.text,
              })
            );
          }}
          placeholderTextColor={"#ffffff"}
          placeholder={t("createpost.whats")}
        />
        <View className={"flex-row justify-around items-center pt-4 mx-2"}>
          <TouchableOpacity
            onPress={handlePresentModalPress}
            className="flex-row flex-1 px-4 py-2 mr-4 rounded-md bg-slate-800"
          >
            <Entypo name="attachment" size={18} color="white" />
            <Text className="ml-2 text-white">{t("createpost.attach")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(postsActions.setSpoiler())}
            className={
              createdPost.spoiler
                ? "flex-row flex-1 px-4 py-2 rounded-md bg-slate-600"
                : "flex-row flex-1 px-4 py-2 rounded-md bg-slate-800"
            }
          >
            {!createdPost.spoiler ? (
              <Feather name="unlock" size={18} color="white" />
            ) : (
              <Feather name="lock" size={18} color="white" />
            )}
            <Text className="ml-2 text-white">{t("createpost.spoiler")}</Text>
          </TouchableOpacity>
        </View>
        <Line />
        <Recommendation title="Search History" />
        <Recommendation title="Suggestions" />
        <CustomBottomSheet
          handleSheetChanges={handleSheetChanges}
          bottomSheetModalRef={bottomSheetModalRef}
          snaps={["50%", "60%", "85%"]}
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default createpost;
