// src/services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "./firebase";

export const authService = {
  signUp: async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      return { success: true, uid: user.uid };
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        // On considère comme "success" pour poursuivre l'envoi du code
        return { success: true, uid: null };
      }
      return { success: false, error: error.message };
    }
  },

  signIn: async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, uid: user.uid };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  signOut: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
