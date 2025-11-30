import { app, auth } from "@/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  endBefore,
  get,
  getDatabase,
  limitToLast,
  orderByChild,
  query,
  ref,
} from "firebase/database";

const dbRef = ref(getDatabase());

const database = getDatabase(app);

const signInWithEmailAction = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return error.code;
    }
  }
};

const getSelectedUser = async (userId: string) => {
  try {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const user = {
        uid: snapshot.key,
        nick: snapshot.val().displayName,
        following: snapshot.val().following,
        followers: snapshot.val().followers,
        email: snapshot.val().email,
        quote: snapshot.val().quote,
        topOne: snapshot.val().topOne,
        instagram: snapshot.val().instagram || "",
        linkedin: snapshot.val().linkedin || "",
        github: snapshot.val().github || "",
        banner: snapshot.val().banner,
        currentlyWatching: snapshot.val().currentlyWatching || "",
        bestMovieYear: snapshot.val().bestMovieYear || "",
        bestSeriesYear: snapshot.val().bestSeriesYear || "",
        photoURL: snapshot.val().photoURL || "",
        online: snapshot.val().online,
        splash: snapshot.val().splash,
        accountPrivate: snapshot.val().accountPrivate || "Public",
        taggingPrivacy: snapshot.val().taggingPrivacy || "Public",
        listPrivacy: snapshot.val().listPrivacy || "Public",
      };
      return user;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return error.code;
    }
  }
};

const getSelectedUserWatched = async (userId: string) => {
  const watchedRef = ref(database, `watched/${userId}`);
  const snapshot = await get(watchedRef);
  const selectedUserWatched = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      selectedUserWatched.push({
        id: childSnapshot.val().id,
        mediaType: childSnapshot.val().mediaType,
        name: childSnapshot.val().name,
        photoURL: childSnapshot.val().photoURL,
      });
    });
  }
  return selectedUserWatched;
};

const getSelectedUserWantToWatch = async (userId: string) => {
  const wantToWatchRef = ref(database, `wanttowatch/${userId}`);
  const snapshot = await get(wantToWatchRef);
  const selectedUserWantToWatch = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      selectedUserWantToWatch.push({
        id: childSnapshot.val().id,
        mediaType: childSnapshot.val().mediaType,
        name: childSnapshot.val().name,
        photoURL: childSnapshot.val().photoURL,
      });
    });
  }
  return selectedUserWantToWatch;
};

const getSelectedUserUnfinished = async (userId: string) => {
  const unfinishedRef = ref(database, `unfinished/${userId}`);
  const snapshot = await get(unfinishedRef);
  const selectedUserUnfinished = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      selectedUserUnfinished.push({
        id: childSnapshot.val().id,
        mediaType: childSnapshot.val().mediaType,
        name: childSnapshot.val().name,
        photoURL: childSnapshot.val().photoURL,
      });
    });
  }
  return selectedUserUnfinished;
};

const getAllPosts = async () => {
  const postsRef = ref(database, "posts");
  const sortedPostsRef = query(postsRef, orderByChild("date"), limitToLast(20));
  const snapshot = await get(sortedPostsRef);

  const allPosts = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const posts = childSnapshot.val();
      const postId = childSnapshot.key;
      allPosts.push({
        photoURL: posts.photoURL || null,
        postId: postId,
        nick: posts.nick,
        content: posts.content,
        spoiler: posts.spoiler,
        attachedFilm: posts.attachedFilm,
        likesList: posts.likesList || null,
        likes: posts.likes,
        comments: posts.comments,
        edited: posts.edited || false,
        repost: posts.repost,
        repostsList: posts.repostsList || null,
        date: posts.date,
        userId: posts.userId.trim(),
        attachedAction: posts.attachedAction || null,
        actionName: posts.actionName || null,
      });
    });
  }
  return allPosts.sort((a, b) => b.date - a.date);
};

const getPreviousPosts = async (lastPostDate) => {
  const postsRef = ref(database, "posts");
  // lastPostDate'den önceki verileri getirmek için endBefore kullanıyoruz.
  const sortedPostsRef = query(
    postsRef,
    orderByChild("date"),
    endBefore(lastPostDate), // Bu, belirli bir tarihten önceki verileri getirir.
    limitToLast(15) // Son 15 veriyi getiriyoruz (önceki sayfa)
  );

  const snapshot = await get(sortedPostsRef);
  const allPosts = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const posts = childSnapshot.val();
      const postId = childSnapshot.key;
      allPosts.push({
        photoURL: posts.photoURL || null,
        postId: postId,
        nick: posts.nick,
        content: posts.content,
        spoiler: posts.spoiler,
        attachedFilm: posts.attachedFilm,
        likesList: posts.likesList || null,
        likes: posts.likes,
        comments: posts.comments,
        edited: posts.edited || false,
        repost: posts.repost,
        repostsList: posts.repostsList || null,
        date: posts.date,
        userId: posts.userId.trim(),
        attachedAction: posts.attachedAction || null,
        actionName: posts.actionName || null,
      });
    });
  }
  return allPosts;
};

const getSelectedCommentsList = async (postId: string) => {
  try {
    const commentsRef = ref(database, `commentsList/${postId}`);
    const res = await get(commentsRef);
    const comments = [];
    res.forEach((comment) => {
      comments.push({
        id: comment.key,
        commentId: comment.val().commentId,
        comment: comment.val().comment,
        comments: comment.val().comments,
        isEdited: comment.val().isEdited,
        likes: comment.val().likes,
        relatedPostId: comment.val().relatedPostId,
        relatedUserId: comment.val().relatedUserId,
        reposts: comment.val().reposts,
        date: comment.val().date,
        userId: comment.val().userId,
      });
    });
    return comments;
  } catch (error) {
    return error;
  }
};

const getSelectedUserLists = async (userId: string) => {
  try {
    const pinnedLists = ref(database, `pinnedList/${userId}`);
    const snapshot = await get(pinnedLists);
    const selectedUserLists: Array<{
      id: string;
      title: string;
      isPinned: boolean;
      date: number;
      list: any;
      edited: boolean;
      editedDate: number;
    }> = [];

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        selectedUserLists.push({
          id: childSnapshot.val().id,
          title: childSnapshot.val().title,
          isPinned: childSnapshot.val().isPinned,
          date: childSnapshot.val().date,
          list: childSnapshot.val().list,
          edited: childSnapshot.val().edited,
          editedDate: childSnapshot.val().editedDate,
        });
      });
    }
    return selectedUserLists;
  } catch (error) {
    return error;
  }
};

const getSelectedUserPosts = async (postId: string) => {
  const selectedUserPosts = ref(database, `posts/${postId}`);
  const snapshot = await get(selectedUserPosts);
  const allPosts = [];
  if (snapshot.exists()) {
    allPosts.push(snapshot.val());
  }
  return allPosts;
};

const getSelectedUserPostsList = async (userId: string) => {
  const postsRef = ref(database, `userPostsList/${userId}/posts/`);
  const snapshot = await get(postsRef);
  const posts: any[] = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      posts.push(childSnapshot.val());
    });
  }
  return posts;
};

const getNotifications = async (userId: string) => {
  const notificationsRef = ref(database, `notifications/${userId}`);
  const snapshot = await get(notificationsRef);
  const notifications: any[] = [];
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      notifications.push({
        id: childSnapshot.key,
        from: childSnapshot.val().from,
        date: childSnapshot.val().date,
        type: childSnapshot.val().type,
        isComment: childSnapshot.val().isComment || false,
        isRead: childSnapshot.val().isRead || false,
      });
    });
  }
  return notifications;
};

export {
  getAllPosts,
  getNotifications,
  getPreviousPosts,
  getSelectedCommentsList,
  getSelectedUser,
  getSelectedUserLists,
  getSelectedUserPosts,
  getSelectedUserPostsList,
  getSelectedUserUnfinished,
  getSelectedUserWantToWatch,
  getSelectedUserWatched,
  signInWithEmailAction,
};
