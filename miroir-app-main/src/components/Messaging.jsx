import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Messaging() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [hasSubscription, setHasSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Vérifier si l'utilisateur a un abonnement
  useEffect(() => {
    // Dans une vraie application, cette vérification serait faite via une requête API
    const checkSubscription = async () => {
      setLoading(true);
      try {
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Pour la démo, on considère qu'il n'y a pas d'abonnement par défaut
        // Dans une vraie app, on vérifierait dans la base de données
        setHasSubscription(false);
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'abonnement:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSubscription();
  }, [currentUser]);
  
  // Rediriger vers la page d'abonnement si nécessaire
  useEffect(() => {
    if (!loading && !hasSubscription) {
      // Dans une vraie app, on afficherait peut-être un message avant la redirection
      setTimeout(() => {
        navigate('/abonnements');
      }, 2000);
    }
  }, [loading, hasSubscription, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-300">Vérification de votre abonnement...</p>
        </div>
      </div>
    );
  }
  
  if (!hasSubscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-blue-500/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2 className="text-2xl font-bold mb-2">Messagerie verrouillée</h2>
          <p className="text-blue-300 mb-6">La messagerie est accessible uniquement avec un abonnement. Vous allez être redirigé vers nos offres...</p>
          <div className="w-full h-1 bg-blue-900/50 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
            />
          </div>
        </div>
      </div>
    );
  }
  
  // Le reste du code de la messagerie (inchangé)...
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        
        <div className="text-center p-10">
          <p className="text-blue-300">Cette fonctionnalité sera disponible après souscription à un abonnement</p>
        </div>
      </div>
    </div>
  );
}
