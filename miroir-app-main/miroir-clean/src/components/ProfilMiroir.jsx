import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProfilMiroir() {
  const [niveau_devoilement, setNiveauDevoilement] = useState(0.65);
  
  // Données factices pour la démo
  const profil = {
    nom: "Alex",
    age: 28,
    photo: "https://i.pravatar.cc/300",
    statistiques: {
      positif: 65,
      neutre: 30,
      negatif: 5
    },
    nuage_perception: {
      "créatif": 8,
      "mystérieux": 7,
      "passionné": 6,
      "attentif": 5,
      "intelligent": 5
    },
    perceptions: [
      { id: "p1", texte: "Mystérieux mais chaleureux", auteur: "Sophie", date: "Il y a 2 jours", sentiment: "positif" },
      { id: "p2", texte: "Passionné par les arts", auteur: "Thomas", date: "Il y a 4 jours", sentiment: "neutre" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* En-tête du profil */}
        <motion.div 
          className="bg-black/30 backdrop-blur-md rounded-xl p-6 mb-8 border border-blue-500/20 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Photo de profil avec effet de flou dynamique */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-blue-500/30">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${profil.photo})`,
                  filter: `blur(${(1 - niveau_devoilement) * 10}px)`
                }}
              />
              
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1.5 bg-blue-400"
                initial={{ width: "0%" }}
                animate={{ width: `${niveau_devoilement * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            
            <div className="flex-1">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{profil.nom}, {profil.age}</h2>
                <p className="text-blue-300/80 text-sm mt-1">Niveau de dévoilement: {Math.round(niveau_devoilement * 100)}%</p>
              </div>
              
              {/* Statistiques de perception */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-blue-200 mb-2">Perceptions</h3>
                <div className="flex h-5 w-full rounded-full overflow-hidden bg-gray-800/50">
                  <motion.div 
                    className="h-full bg-green-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${profil.statistiques.positif}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${profil.statistiques.neutre}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                  <motion.div 
                    className="h-full bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${profil.statistiques.negatif}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1 text-gray-400">
                  <span>{profil.statistiques.positif}% positif</span>
                  <span>{profil.statistiques.neutre}% neutre</span>
                  <span>{profil.statistiques.negatif}% négatif</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Comment les autres te perçoivent</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.entries(profil.nuage_perception).map(([trait, valeur]) => (
              <div 
                key={trait}
                className="px-3 py-1 bg-blue-900/30 rounded-full"
                style={{
                  fontSize: `${Math.max(0.8, Math.min(1.5, 0.8 + valeur * 0.1))}rem`,
                  opacity: 0.5 + valeur * 0.05
                }}
              >
                {trait}
              </div>
            ))}
          </div>
          
          <div className="max-w-lg mx-auto">
            <h3 className="text-xl font-medium mb-4">Dernières perceptions</h3>
            <div className="space-y-3">
              {profil.perceptions.map((perception) => (
                <div key={perception.id} className="bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-blue-200">{perception.texte}</p>
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>{perception.auteur}</span>
                    <span>{perception.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
