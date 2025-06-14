import React, { createContext, useState, useContext, useEffect } from 'react';

// Créer le contexte
const AuthContext = createContext(null);

// Fournisseur d'authentification
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = localStorage.getItem('miroir_user');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signUp = async (email, password, userData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = { uid: 'user_' + Date.now(), email, ...userData };
      setCurrentUser(user);
      localStorage.setItem('miroir_user', JSON.stringify(user));
      return { success: true, user };
    } catch (error) {
      return { success: false, error: 'Erreur lors de l\'inscription' };
    }
  };

  const signIn = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = { uid: 'user_123', email };
      setCurrentUser(user);
      localStorage.setItem('miroir_user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la connexion' };
    }
  };

  const signOut = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentUser(null);
      localStorage.removeItem('miroir_user');
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la déconnexion' };
    }
  };

  const value = {
    currentUser,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook pour utiliser le contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};
