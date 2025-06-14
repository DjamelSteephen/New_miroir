// src/services/dbService.js

import { db } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const usersCollection = collection(db, "profils");
const codesCollection = collection(db, "codes");

// Créer un nouveau profil utilisateur
export const createUserProfile = async (userId, profileData) => {
  try {
    const userDocRef = doc(usersCollection, userId);
    await setDoc(userDocRef, profileData);
  } catch (error) {
    console.error("Erreur lors de la création du profil:", error);
  }
};

// Récupérer un profil utilisateur
export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(usersCollection, userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.warn("Aucun profil trouvé pour cet utilisateur.");
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    return null;
  }
};

// Ajouter un code de vérification
export const saveVerificationCode = async (email, code) => {
  try {
    await setDoc(doc(codesCollection, email), {
      code,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du code:", error);
  }
};

// Vérifier un code de vérification
export const verifyCode = async (email, inputCode) => {
  try {
    const codeDoc = await getDoc(doc(codesCollection, email));
    if (codeDoc.exists() && codeDoc.data().code === inputCode) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du code:", error);
    return false;
  }
};

// Ajouter une perception
export const addPerception = async (userId, perception) => {
  try {
    const userDocRef = doc(usersCollection, userId);
    const userProfile = await getUserProfile(userId);
    if (!userProfile) return;

    const updatedPerceptions = [
      ...(userProfile.perceptions || []),
      perception,
    ];

    await updateDoc(userDocRef, { perceptions: updatedPerceptions });
    await updateStats(userId);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la perception:", error);
  }
};

// Mettre à jour les statistiques de perception
export const updateStats = async (userId) => {
  try {
    const userDocRef = doc(usersCollection, userId);
    const userProfile = await getUserProfile(userId);
    if (!userProfile) return;

    const stats = { positif: 0, neutre: 0, negatif: 0 };
    (userProfile.perceptions || []).forEach((p) => {
      if (stats[p.sentiment] !== undefined) {
        stats[p.sentiment]++;
      }
    });

    await updateDoc(userDocRef, { stats });
  } catch (error) {
    console.error("Erreur lors de la mise à jour des statistiques:", error);
  }
};