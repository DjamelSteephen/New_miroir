import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Abonnements() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const plans = [
    {
      id: 'basic',
      name: 'Essentiel',
      price: '9,99€',
      period: 'par mois',
      features: [
        'Messages limités (10 par jour)',
        'Profil mis en avant 1x par semaine',
        'Filtres de base',
        'Voir qui a visité votre profil'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '19,99€',
      period: 'par mois',
      popular: true,
      features: [
        'Messages illimités',
        'Profil mis en avant quotidiennement',
        'Tous les filtres avancés',
        'Voir qui vous apprécie avant match',
        'Niveau de dévoilement accéléré',
        'Mode incognito'
      ],
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'unlimited',
      name: 'Cristal',
      price: '29,99€',
      period: 'par mois',
      features: [
        'Tout Premium +',
        'Priorité dans les suggestions',
        'Statistiques détaillées des perceptions',
        'Support prioritaire',
        'Badges premium exclusifs',
        'Visualisation complète des profils'
      ],
      color: 'from-emerald-500 to-teal-600'
    }
  ];
  
  const handleSubscribe = async (plan) => {
    setLoading(true);
    
    // Simuler un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Dans une vraie application, ici on redirigerait vers une page de paiement
    console.log(`Abonnement au plan ${plan.name} demandé`);
    
    // Rediriger l'utilisateur vers la messagerie après "paiement"
    // Dans une vraie app, cette redirection se ferait après confirmation du paiement
    navigate('/messages');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Abonnements Miroir</h1>
        
        <div className="text-center mb-12">
          <p className="text-xl text-blue-300 mb-4">Découvrez qui vous voit vraiment avec nos formules adaptées</p>
          <p className="text-gray-400 max-w-2xl mx-auto">Pour accéder à la messagerie et autres fonctionnalités premium, choisissez l'abonnement qui vous correspond. Tous nos abonnements incluent un accès complet à la plateforme.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-blue-500/20 shadow-lg ${plan.popular ? 'md:scale-105' : ''}`}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-center py-2 text-white text-sm font-medium">
                  PLUS POPULAIRE
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
                
                <hr className="border-blue-900/30 mb-6" />
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-medium transition-all 
                    ${loading 
                      ? "bg-gray-600 cursor-not-allowed" 
                      : `bg-gradient-to-r ${plan.color} hover:opacity-90`}`}
                >
                  {loading ? "Traitement..." : "Choisir ce plan"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm mb-2">Les abonnements sont renouvelés automatiquement et peuvent être annulés à tout moment</p>
          <p className="text-gray-400 text-sm">En vous abonnant, vous acceptez nos <a href="#" className="text-blue-400 hover:underline">conditions d'utilisation</a> et notre <a href="#" className="text-blue-400 hover:underline">politique de confidentialité</a></p>
        </div>
      </div>
    </div>
  );
}
