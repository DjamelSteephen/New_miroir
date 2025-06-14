import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Citations philosophiques sur l'identité et la perception
const citations = [
  "On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.",
  "Connais-toi toi-même, et tu connaîtras l'univers et les dieux.",
  "Notre véritable identité se forme dans le regard des autres.",
  "Chaque rencontre est un miroir tendu à notre âme.",
  "La vérité n'est pas ce que l'on croit voir, mais ce que l'on parvient à réfléchir."
];

// Composant principal
export default function HomePage() {
  // État pour la citation actuelle et l'historique
  const [citation, setCitation] = useState("");
  const [citationHistory, setCitationHistory] = useState([]);
  
  // État pour la position de la souris (effet halo)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Effet pour charger une citation aléatoire et gérer l'historique
  useEffect(() => {
    // Sélectionne une citation aléatoire
    const random = Math.floor(Math.random() * citations.length);
    const selectedCitation = citations[random];
    setCitation(selectedCitation);
    
    // Gestion de l'historique des citations
    const history = JSON.parse(localStorage.getItem("miroir_citations") || "[]");
    if (!history.includes(selectedCitation)) {
      const updatedHistory = [selectedCitation, ...history].slice(0, 5);
      localStorage.setItem("miroir_citations", JSON.stringify(updatedHistory));
    }
    setCitationHistory(JSON.parse(localStorage.getItem("miroir_citations") || "[]"));
  }, []);
  
  // Effet pour suivre la position de la souris
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Halo interactif qui suit la souris */}
      <motion.div 
        className="absolute bg-blue-400 opacity-10 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: mousePos.x - 150,
          y: mousePos.y - 150,
        }}
        transition={{ type: "spring", damping: 20 }}
        style={{ width: "300px", height: "300px" }}
      />
      
      {/* Contenu principal */}
      <motion.div 
        className="relative z-10 w-full max-w-lg mx-auto px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold mb-8 tracking-tighter"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">Miroir</span>
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl text-blue-100/80 font-light italic mb-10 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          "{citation}"
        </motion.p>
        
        <motion.div 
          className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-3 bg-blue-500 hover:bg-blue-400 rounded-full text-white font-medium shadow-lg shadow-blue-900/30 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/inscription')}
          >
            Inscription
          </motion.button>
          
          <motion.button
            className="px-8 py-3 bg-transparent border border-white/30 hover:border-white/50 rounded-full text-white font-medium shadow-lg shadow-blue-900/20 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Connexion
          </motion.button>
        </motion.div>
      </motion.div>
      
      {/* Signature discrète */}
      <motion.div
        className="absolute bottom-4 left-4 text-xs text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Découvre qui te voit vraiment
      </motion.div>
    </div>
  );
}
