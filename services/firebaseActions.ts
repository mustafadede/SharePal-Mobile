import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, database, storage } from "@/firebaseConfig";
import { child, get, getDatabase, orderByValue, push, query, ref, set, update } from "firebase/database";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { FirebaseError } from "firebase/app";

const dbRef = ref(getDatabase());

const signInWithEmailAction = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error(error.code);
    }
  }
};

export { signInWithEmailAction };
