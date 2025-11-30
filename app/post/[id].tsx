import CommentCards from "@/common/CommentCards";
import FeedCard from "@/components/FeedPage/FeedCard";
import StatusLabel from "@/components/StatusLabel/StatusLabel";
import { Post } from "@/constants/Post";
import {
  getSelectedCommentsList,
  getSelectedUser,
  getSpecificPost,
} from "@/services/firebaseActions";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

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

  const handleModal = () => {};

  return (
    <View className="flex-1 dark:bg-cGradient2 pt-4 px-4">
      {loading ? (
        <StatusLabel />
      ) : (
        post && (
          <View>
            <FeedCard
              data={post}
              index={0}
              postPage
              handleModal={handleModal}
            />
            {commentsLoading && (
              <View style={{ paddingVertical: 20 }}>
                <Text
                  style={{ textAlign: "center", color: "#888", fontSize: 14 }}
                >
                  Loading comments...
                </Text>
              </View>
            )}

            {!commentsLoading && comments.length === 0 && (
              <View style={{ paddingVertical: 20 }}>
                <Text
                  style={{ textAlign: "center", color: "#888", fontSize: 14 }}
                >
                  No comments yet. Be the first to comment!
                </Text>
              </View>
            )}

            {!commentsLoading && comments.length > 0 && (
              <FlatList
                data={comments}
                keyExtractor={(item, index) => item.date + item.userId + index}
                renderItem={({ item, index }) => (
                  <CommentCards item={item} index={index} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
              />
            )}
          </View>
        )
      )}
    </View>
  );
};

export default index;
