import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { child, get, getDatabase, orderByChild, orderByValue, push, query, ref, set, update } from "firebase/database";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { app, auth } from "@/firebaseConfig";

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
    const snapshot = await get(child(dbRef, `users/${userId}`));
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
        photoURL: getAuth().currentUser.photoURL || snapshot.val().photoURL || "",
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

const getSelectedUserWatched = async (userId) => {
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

const getAllPosts = async () => {
  const postsRef = ref(database, "posts");
  const sortedPostsRef = query(postsRef, orderByChild("date"));

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

export { signInWithEmailAction, getSelectedUser, getSelectedUserWatched, getAllPosts };
