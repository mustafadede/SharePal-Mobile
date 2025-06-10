import { Colors } from "@/constants/Colors";
import {
  getSelectedCommentsList,
  getSelectedUser,
} from "@/services/firebaseActions";
import { modalActions } from "@/store/modalSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import { useDispatch } from "react-redux";

const FeedCardCommentAction = ({ data, handleModal }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const handleModalState = () => {
    handleModal();
    dispatch(modalActions.updateModalType("comments"));
    getSelectedCommentsList(data.postId).then((res) => {
      dispatch(modalActions.updateStatus("loading"));
      res.forEach((comment) => {
        getSelectedUser(comment.userId).then((user) => {
          dispatch(
            modalActions.updateModal({
              comment: comment.comment,
              date: comment.date,
              relatedUserId: comment.relatedUserId,
              userId: comment.userId,
              nick: user.nick,
              photoURL: user.photoURL,
              banner: user.banner,
            })
          );
          dispatch(modalActions.updateStatus("done"));
        });
      });
      if (res.length === 0) {
        dispatch(modalActions.updateStatus("noData"));
      }
    });
  };

  return (
    <TouchableOpacity
      className={"flex flex-row items-center gap-2"}
      onPress={handleModalState}
    >
      <Ionicons
        name={"chatbox-outline"}
        size={21}
        color={colorScheme === "dark" ? Colors.dark.tColor1 : "black"}
        className={"ml-4"}
      />
      <Text className={"text-black dark:text-slate-400"}>{data?.comments}</Text>
    </TouchableOpacity>
  );
};

export default FeedCardCommentAction;
