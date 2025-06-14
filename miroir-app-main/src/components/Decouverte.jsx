import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function Decouverte() {
  const { currentUser } = useAuth();
  const [profils, setProfils] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const [showPerception, setShowPerception] = useState(false);
  const [perception, setPerception] = useState('');
  const [sentiment, setSentiment] = useState('neutre');
  
  // Couleurs pour les sentiments
  const couleursSentiment = {
    positif: "rgba(56, 161, 105, 0.8)", // vert
    neutre: "rgba(90, 103, 216, 0.8)",  // bleu
    negatif: "rgba(229, 62, 62, 0.8)"   // rouge
  };
  
  // Charger les profils à découvrir
  useEffect(() => {
    // Simulation de chargement de profils depuis l'API
    setLoading(true);
    setTimeout(() => {
      const profilsTest = [
        {
          id: 'user1',
          nom: 'Emma',
          age: 27,
          photo: 'https://i.pravatar.cc/300?img=5',
          niveau_devoilement: 0.4,
          nuage_perception: {
            "créative": 7,
            "passionnée": 6,
            "curieuse": 5,
            "dynamique": 4
          },
          interets: ['Photographie', 'Voyages', 'Cuisine']
        },
        {
          id: 'user2',
          nom: 'Thomas',
          age: 31,
          photo: 'https://i.pravatar.cc/300?img=12',
          niveau_devoilement: 0.6,
          nuage_perception: {
            "calme": 8,
            "réfléchi": 7,
            "attentif": 6,
            "mystérieux": 5
          },
          interets: ['Musique', 'Cinéma', 'Littérature']
        },
        {
          id: 'user3',
          nom: 'Julie',
          age: 24,
          photo: 'https://i.pravatar.cc/300?img=9',
          niveau_devoilement: 0.3,
          nuage_perception: {
            "spontanée": 8,
            "joyeuse": 7,
            "sociable": 6,
            "aventurière": 5
          },
          interets: ['Sport', 'Danse', 'Art']
        }
      ];
      
      setProfils(profilsTest);
      setLoading(false);
    }, 1500);
  }, []);
  
  // Profil actuel
  const currentProfil = profils[currentIndex];
  
  // Passer au profil suivant
  const nextProfil = () => {
    if (currentIndex < profils.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  // Revenir au profil précédent
  const prevProfil = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  // Ajouter une perception
  const handleAddPerception = () => {
    if (!perception.trim()) return;
    
    // Dans une vraie application, on enverrait cette perception au backend
    console.log('Perception ajoutée:', {
      profil: currentProfil.id,
      texte: perception,
      sentiment,
      auteur: currentUser.uid
    });
    
    // Réinitialiser le formulaire
    setPerception('');
    setSentiment('neutre');
    setShowPerception(false);
    
    // Passer au profil suivant
    setTimeout(() => {
      nextProfil();
    }, 500);
  };
  
  // Variants pour les animations
  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-300">Recherche de profils...</p>
        </div>
      </div>
    );
  }
  
  if (profils.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-blue-500/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h2 className="text-2xl font-bold mb-2">Aucun profil trouvé</h2>
          <p className="text-blue-300 mb-6">Nous n'avons pas trouvé de profils correspondant à tes critères pour le moment.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Découverte</h1>
        
        <div className="relative h-[70vh] mb-6">
          <AnimatePresence mode="wait" custom={direction}>
            {currentProfil && (
              <motion.div
                key={currentProfil.id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-black/30 backdrop-blur-md rounded-xl border border-blue-500/20 shadow-lg overflow-hidden"
              >
                {/* Photo du profil */}
                <div className="h-2/3 relative">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${currentProfil.photo})`,
                      filter: `blur(${(1 - currentProfil.niveau_devoilement) * 10}px)`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  {/* Barre de niveau de dévoilement */}
                  <div className="absolute bottom-0 left-0 right-0 h-1">
                    <div 
                      className="h-full bg-blue-500"
                      style={{ width: `${currentProfil.niveau_devoilement * 100}%` }}
                    />
                  </div>
                  
                  {/* Infos basiques du profil */}
                  <div className="absolute bottom-4 left-6">
                    <h2 className="text-3xl font-bold text-white">{currentProfil.nom}, {currentProfil.age}</h2>
                    
                    {/* Intérêts */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentProfil.interets.map((interet) => (
                        <span 
                          key={interet}
                          className="px-2 py-1 bg-blue-500/30 backdrop-blur-sm rounded-full text-xs font-medium"
                        >
                          {interet}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Nuage de perception */}
                <div className="h-1/3 p-6">
                  <h3 className="text-lg font-medium mb-3">Comment les autres le/la perçoivent :</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(currentProfil.nuage_perception).map(([trait, valeur]) => (
                      <span 
                        key={trait}
                        className="px-3 py-1 bg-blue-900/30 rounded-full"
                        style={{
                          fontSize: `${Math.max(0.8, Math.min(1.2, 0.8 + valeur * 0.05))}rem`,
                          opacity: 0.6 + valeur * 0.05
                        }}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Contrôles de navigation */}
        <div className="flex justify-center space-x-4">
          <motion.button
            onClick={prevProfil}
            disabled={currentIndex === 0}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md
              ${currentIndex === 0
                ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                : "bg-red-500/80 text-white hover:bg-red-400/80"}`}
            whileHover={currentIndex === 0 ? {} : { scale: 1.1 }}
            whileTap={currentIndex === 0 ? {} : { scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={() => setShowPerception(!showPerception)}
            className="w-12 h-12 rounded-full bg-blue-500/80 text-white flex items-center justify-center shadow-md hover:bg-blue-400/80"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={nextProfil}
            disabled={currentIndex >= profils.length - 1}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md
              ${currentIndex >= profils.length - 1
                ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                : "bg-green-500/80 text-white hover:bg-green-400/80"}`}
            whileHover={currentIndex >= profils.length - 1 ? {} : { scale: 1.1 }}
            whileTap={currentIndex >= profils.length - 1 ? {} : { scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
        
        {/* Formulaire d'ajout de perception */}
        <AnimatePresence>
          {showPerception && (
            <motion.div
              className="mt-6 p-4 bg-black/30 backdrop-blur-md rounded-xl border border-blue-500/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-medium mb-3">Partage ta perception</h3>
              <textarea
                value={perception}
                onChange={(e) => setPerception(e.target.value)}
                className="w-full bg-blue-900/20 border border-blue-800/50 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={`Qu'est-ce qui te marque chez ${currentProfil?.nom} ?`}
                rows={3}
              />
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex space-x-2">
                  {Object.entries(couleursSentiment).map(([type, couleur]) => (
                    <button
                      key={type}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${sentiment === type ? 'ring-2 ring-white' : ''}`}
                      style={{ backgroundColor: couleur }}
                      onClick={() => setSentiment(type)}
                    >
                      {sentiment === type && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleAddPerception}
                  disabled={perception.trim() === ""}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${perception.trim() === "" 
                      ? "bg-blue-900/30 text-blue-300/50 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-500 text-white"}`}
                >
                  Envoyer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
