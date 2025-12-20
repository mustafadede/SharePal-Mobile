import CommentCards from "@/common/CommentCards";
import PostPageCommentFooter from "@/common/PostPageCommentFooter";
import FeedCard from "@/components/FeedPage/FeedCard";
import PostOptionsBottomSheet, {
  PostOptionsValues,
} from "@/components/PostOptions/PostOptionsBottomSheet";
import StatusLabel from "@/components/StatusLabel/StatusLabel";
import { Colors } from "@/constants/Colors";
import { Post } from "@/constants/Post";
import {
  getSelectedCommentsList,
  getSelectedUser,
  getSpecificPost,
} from "@/services/firebaseActions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getAuth } from "firebase/auth";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const index = () => {
  const currentUserId = getAuth().currentUser?.uid;
  const { userId } = useLocalSearchParams();
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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%"], []);
  const defaultBottomSheetValues: PostOptionsValues = {
    title: "",
    release_date: "",
    poster_path: "",
    mediaType: "",
    id: 0,
    wanttowatch: false,
    watched: false,
    unfinished: false,
  };
  const [bottomSheetValues] = useState<PostOptionsValues>(
    defaultBottomSheetValues
  );
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const navigation = useNavigation();
  const { t } = useTranslation();
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
    navigation.setOptions({
      headerRight: () =>
        currentUserId === userId && (
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              handlePresentModalPress();
            }}
          >
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={26}
              color={
                colorScheme === "dark" ? Colors.dark.cWhite : Colors.dark.cBlack
              }
            />
          </TouchableOpacity>
        ),
    });
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
              style={{ flex: 1, paddingTop: 20 }}
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
                    handleOptions={handlePresentModalPress}
                  />

                  {commentsLoading && (
                    <View style={{ paddingVertical: 20 }}>
                      <StatusLabel />
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
                        {t("post.nocomment")}
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
        <PostPageCommentFooter
          isKeyboardVisible={isKeyboardVisible}
          setIsKeyboardVisible={setIsKeyboardVisible}
        />
      </KeyboardAvoidingView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={0}
            appearsOnIndex={1}
            opacity={0.7}
          />
        )}
        onChange={handleSheetChanges}
        keyboardBlurBehavior="none"
        handleIndicatorStyle={{
          backgroundColor: colorScheme === "dark" ? "#4b5563" : "#9ca3af",
        }}
        keyboardBehavior="interactive"
        android_keyboardInputMode="adjustPan"
        backgroundComponent={({ style }) => (
          <View
            style={[
              style,
              {
                backgroundColor:
                  colorScheme === "dark" ? Colors.dark.cGradient2 : "#f9fafb",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          />
        )}
      >
        <BottomSheetView style={{ flex: 1, marginTop: 10 }}>
          <PostOptionsBottomSheet bottomSheetValues={bottomSheetValues} />
        </BottomSheetView>
      </BottomSheetModal>
    </GestureHandlerRootView>
  );
};

export default index;
