import CommentCards from "@/common/CommentCards";
import PostPageCommentFooter from "@/common/PostPageCommentFooter";
import FeedCard from "@/components/FeedPage/FeedCard";
import StatusLabel from "@/components/StatusLabel/StatusLabel";
import { Colors } from "@/constants/Colors";
import { Post } from "@/constants/Post";
import {
  getSelectedCommentsList,
  getSelectedUser,
  getSpecificPost,
} from "@/services/firebaseActions";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const index = () => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<
    Array<{
      comment: string;
      date: string;
      relatedUserId: string;
      userId: string;
      nick: string;
      photoURL: string;
      banner: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSpecificPost(String(id))
      .then((res) => {
        setPost(res);
        setLoading(false);
      })
      .then(() => {
        setCommentsLoading(true);
        getSelectedCommentsList(String(id)).then((res) => {
          // If there are no comments, stop loading immediately
          if (!res || res.length === 0) {
            setCommentsLoading(false);
            return;
          }

          res.forEach((comment: { userId: string }) => {
            getSelectedUser(comment.userId).then((user) => {
              setComments((prev) => [
                ...prev,
                {
                  comment: comment.comment,
                  date: comment.date,
                  relatedUserId: comment.relatedUserId,
                  userId: comment.userId,
                  nick: user.nick,
                  photoURL: user.photoURL,
                  banner: user.banner,
                },
              ]);
              setCommentsLoading(false);
            });
          });
        });
      });
  }, [id]);

  useEffect(() => {
    const platformSpecificShowHandlerName =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";

    const platformSpecificHideHandlerName =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const showSubscription = Keyboard.addListener(
      platformSpecificShowHandlerName,
      handleKeyboardShow
    );
    const hideSubscription = Keyboard.addListener(
      platformSpecificHideHandlerName,
      handleKeyboardHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleKeyboardShow = () => {
    setIsKeyboardVisible(true);
  };

  const handleKeyboardHide = () => {
    setIsKeyboardVisible(false);
  };

  const handleModal = () => {};

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark" ? Colors.dark.cGradient2 : "transparent",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0}
      >
        {loading ? (
          <StatusLabel />
        ) : (
          post && (
            <FlatList
              style={{ flex: 1 }}
              data={comments}
              keyExtractor={(item, index) => item.date + item.userId + index}
              renderItem={({ item, index }) => (
                <CommentCards item={item} index={index} />
              )}
              ListHeaderComponent={
                <>
                  <FeedCard
                    data={post}
                    index={0}
                    postPage
                    handleModal={handleModal}
                  />

                  {commentsLoading && (
                    <View style={{ paddingVertical: 20 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#888",
                          fontSize: 14,
                        }}
                      >
                        Loading comments...
                      </Text>
                    </View>
                  )}

                  {!commentsLoading && comments.length === 0 && (
                    <View style={{ paddingVertical: 20 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#888",
                          fontSize: 14,
                        }}
                      >
                        No comments yet. Be the first to comment!
                      </Text>
                    </View>
                  )}
                </>
              }
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: isKeyboardVisible ? 220 : 120,
                paddingHorizontal: 20,
              }}
            />
          )
        )}
        <PostPageCommentFooter isKeyboardVisible={isKeyboardVisible} />
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default index;
