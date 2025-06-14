// components/Navigation.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import NotificationCenter from './NotificationCenter';

export default function Navigation() {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const avatar = currentUser?.photoURL || 'https://i.pravatar.cc/100';
  const prenom = currentUser?.prenom || 'Utilisateur';
  const email = currentUser?.email || '...';

  return (
    <nav className="bg-black/30 backdrop-blur-md border-b border-blue-900/30 text-white sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Miroir</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {currentUser ? (
            <>
              <Link to="/profil" className="text-blue-300 hover:text-white">Mon profil</Link>
              <Link to="/decouverte" className="text-blue-300 hover:text-white">Découverte</Link>
              <Link to="/messages" className="text-blue-300 hover:text-white">Messages</Link>
              <NotificationCenter />
              <div className="relative">
                <button
                  className="h-8 w-8 rounded-full bg-cover bg-center border-2 border-blue-500/30"
                  style={{ backgroundImage: `url(${avatar})` }}
                  onClick={() => setMenuOpen(!menuOpen)}
                />
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-md rounded-xl border border-blue-500/20 shadow-xl"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 border-b border-blue-900/30">
                        <p className="font-medium">{prenom}</p>
                        <p className="text-xs text-gray-400">{email}</p>
                      </div>
                      <div className="py-1">
                        <Link to="/profil" className="block px-4 py-2 text-sm hover:bg-blue-900/20" onClick={() => setMenuOpen(false)}>Voir mon profil</Link>
                        <Link to="/parametres" className="block px-4 py-2 text-sm hover:bg-blue-900/20" onClick={() => setMenuOpen(false)}>Paramètres</Link>
                        <Link to="/abonnements" className="block px-4 py-2 text-sm hover:bg-blue-900/20" onClick={() => setMenuOpen(false)}>Gérer l'abonnement</Link>
                        <button onClick={() => { handleSignOut(); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20">Déconnexion</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link to="/inscription" className="text-blue-300 hover:text-white">Inscription</Link>
              <Link to="/connexion" className="px-4 py-1 bg-blue-600 hover:bg-blue-500 rounded-full">Connexion</Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="flex items-center md:hidden">
          {currentUser && <NotificationCenter />}
          <button className="ml-3 text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="md:hidden bg-black/90 border-b border-blue-900/30" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
              {currentUser ? (
                <>
                  <div className="flex items-center space-x-3 p-2 mb-2">
                    <div className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-blue-500/30" style={{ backgroundImage: `url(${avatar})` }} />
                    <div>
                      <p className="font-medium">{prenom}</p>
                      <p className="text-xs text-gray-400">{email}</p>
                    </div>
                  </div>
                  <Link to="/profil" onClick={() => setMenuOpen(false)} className="text-blue-300 hover:text-white">Mon profil</Link>
                  <Link to="/decouverte" onClick={() => setMenuOpen(false)} className="text-blue-300 hover:text-white">Découverte</Link>
                  <Link to="/messages" onClick={() => setMenuOpen(false)} className="text-blue-300 hover:text-white">Messages</Link>
                  <Link to="/parametres" onClick={() => setMenuOpen(false)} className="text-blue-300 hover:text-white">Paramètres</Link>
                  <Link to="/abonnements" onClick={() => setMenuOpen(false)} className="text-blue-300 hover:text-white">Abonnement</Link>
                  <button onClick={() => { handleSignOut(); setMenuOpen(false); }} className="text-left text-red-400 hover:text-red-300">Déconnexion</button>
                </>
              ) : (
                <>
                  <Link to="/inscription" onClick={() => setMenuOpen(false)} className="text-blue-300 hover:text-white">Inscription</Link>
                  <Link to="/connexion" onClick={() => setMenuOpen(false)} className="text-blue-300 hover:text-white">Connexion</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
