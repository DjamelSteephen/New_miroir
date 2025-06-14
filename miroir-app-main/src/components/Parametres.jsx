import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function Parametres() {
  const { currentUser, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profil');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  // État du formulaire de profil
  const [profileForm, setProfileForm] = useState({
    prenom: '',
    nom: '',
    bio: '',
    ville: '',
    emploi: '',
    interets: []
  });
  
  // État du formulaire de confidentialité
  const [privacyForm, setPrivacyForm] = useState({
    visibilite_profil: true,
    mode_invisible: false,
    autoriser_messages: true,
    montrer_activite: true,
    notifications_email: true,
    notifications_push: true
  });
  
  // État du formulaire de mot de passe
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Référence pour l'input de fichier (photo)
  const fileInputRef = useRef(null);
  
  // Charger les données de l'utilisateur
  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        prenom: currentUser.prenom || '',
        nom: currentUser.nom || '',
        bio: currentUser.bio || '',
        ville: currentUser.ville || '',
        emploi: currentUser.emploi || '',
        interets: currentUser.interets || []
      });
      
      // Dans une vraie application, on chargerait aussi les paramètres de confidentialité
    }
  }, [currentUser]);
  
  // Gérer les changements dans le formulaire de profil
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };
  
  // Gérer les changements dans le formulaire de confidentialité
  const handlePrivacyChange = (e) => {
    const { name, checked } = e.target;
    setPrivacyForm({
      ...privacyForm,
      [name]: checked
    });
  };
  
  // Gérer les changements dans le formulaire de mot de passe
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
  };
  
  // Gérer les intérêts
  const toggleInteret = (interet) => {
    if (profileForm.interets.includes(interet)) {
      setProfileForm({
        ...profileForm,
        interets: profileForm.interets.filter(i => i !== interet)
      });
    } else {
      setProfileForm({
        ...profileForm,
        interets: [...profileForm.interets, interet]
      });
    }
  };
  
  // Gérer le changement de photo
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Dans une vraie application, on enverrait le fichier au serveur
      // Ici, on simule un délai
      setLoading(true);
      setTimeout(() => {
        // URL temporaire pour la prévisualisation
        const photoURL = URL.createObjectURL(file);
        updateProfile({ photoURL });
        setLoading(false);
        setSuccess('Photo de profil mise à jour avec succès!');
        
        // Effacer le message de succès après 3 secondes
        setTimeout(() => setSuccess(''), 3000);
      }, 1500);
    }
  };
  
  // Soumettre le formulaire de profil
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // Dans une vraie application, on enverrait ces données au serveur
      await updateProfile(profileForm);
      setSuccess('Profil mis à jour avec succès!');
      
      // Effacer le message de succès après 3 secondes
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };
  
  // Soumettre le formulaire de confidentialité
  const handlePrivacySubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // Dans une vraie application, on enverrait ces données au serveur
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Paramètres de confidentialité mis à jour avec succès!');
      
      // Effacer le message de succès après 3 secondes
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Erreur lors de la mise à jour des paramètres de confidentialité');
    } finally {
      setLoading(false);
    }
  };
  
  // Soumettre le formulaire de mot de passe
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Vérifier que les mots de passe correspondent
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    setLoading(true);
    
    try {
      // Dans une vraie application, on enverrait ces données au serveur
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Mot de passe mis à jour avec succès!');
      
      // Réinitialiser le formulaire
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Effacer le message de succès après 3 secondes
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Erreur lors de la mise à jour du mot de passe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Paramètres</h1>
        
        {/* Messages de succès et d'erreur */}
        {success && (
          <div className="bg-green-900/30 text-green-200 p-3 rounded-lg mb-4">
            {success}
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/30 text-red-200 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <div className="bg-black/30 backdrop-blur-md rounded-xl border border-blue-500/20 shadow-lg overflow-hidden">
          {/* Onglets */}
          <div className="flex border-b border-blue-900/30">
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'profil' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('profil')}
            >
              Profil
            </button>
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'confidentialite' ? 'className={`px-4 py-3 font-medium ${activeTab === 'confidentialite' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('confidentialite')}
            >
              Confidentialité
            </button>
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'mot-de-passe' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('mot-de-passe')}
            >
              Mot de passe
            </button>
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'abonnement' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('abonnement')}
            >
              Abonnement
            </button>
          </div>
          
          {/* Contenu des onglets */}
          <div className="p-6">
            {/* Onglet Profil */}
            {activeTab === 'profil' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  {/* Photo de profil */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative">
                      <div 
                        className="h-32 w-32 rounded-full bg-cover bg-center border-4 border-blue-500/30"
                        style={{ backgroundImage: `url(${currentUser?.photoURL || 'https://i.pravatar.cc/300'})` }}
                      />
                      
                      {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium"
                      disabled={loading}
                    >
                      Changer la photo
                    </button>
                    
                    <p className="text-xs text-gray-400 text-center">
                      JPG, PNG ou GIF<br />
                      5 Mo maximum
                    </p>
                  </div>
                  
                  {/* Formulaire de profil */}
                  <div className="flex-1">
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-blue-300 mb-1">Prénom</label>
                          <input
                            type="text"
                            name="prenom"
                            value={profileForm.prenom}
                            onChange={handleProfileChange}
                            className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-blue-300 mb-1">Nom</label>
                          <input
                            type="text"
                            name="nom"
                            value={profileForm.nom}
                            onChange={handleProfileChange}
                            className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-blue-300 mb-1">Bio</label>
                        <textarea
                          name="bio"
                          value={profileForm.bio}
                          onChange={handleProfileChange}
                          rows={3}
                          className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                          placeholder="Parlez un peu de vous..."
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-blue-300 mb-1">Ville</label>
                          <input
                            type="text"
                            name="ville"
                            value={profileForm.ville}
                            onChange={handleProfileChange}
                            className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-blue-300 mb-1">Emploi / Études</label>
                          <input
                            type="text"
                            name="emploi"
                            value={profileForm.emploi}
                            onChange={handleProfileChange}
                            className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-blue-300 mb-2">Intérêts</label>
                        <div className="flex flex-wrap gap-2">
                          {['Art', 'Musique', 'Voyages', 'Sport', 'Cuisine', 'Photographie', 'Cinéma', 'Littérature', 'Nature', 'Technologie', 'Jeux'].map(interet => (
                            <button
                              key={interet}
                              type="button"
                              className="px-3 py-1 bg-blue-900/20 hover:bg-blue-900/40 rounded-full text-sm transition-colors"
                              onClick={() => toggleInteret(interet)}
                              style={{
                                backgroundColor: profileForm.interets.includes(interet) ? 'rgba(59, 130, 246, 0.5)' : undefined
                              }}
                            >
                              {interet}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium"
                          disabled={loading}
                        >
                          {loading ? "Enregistrement..." : "Enregistrer les modifications"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Onglet Confidentialité */}
            {activeTab === 'confidentialite' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <form onSubmit={handlePrivacySubmit} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Visibilité du profil</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">Profil visible dans les recherches</p>
                          <p className="text-xs text-gray-400">Les autres utilisateurs peuvent voir et découvrir votre profil</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="visibilite_profil"
                            checked={privacyForm.visibilite_profil}
                            onChange={handlePrivacyChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">Mode invisible</p>
                          <p className="text-xs text-gray-400">Parcourez les profils sans laisser de traces de visite</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="mode_invisible"
                            checked={privacyForm.mode_invisible}
                            onChange={handlePrivacyChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Messages et interactions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">Autoriser les messages</p>
                          <p className="text-xs text-gray-400">Recevoir des messages de nouveaux contacts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="autoriser_messages"
                            checked={privacyForm.autoriser_messages}
                            onChange={handlePrivacyChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">Montrer votre activité</p>
                          <p className="text-xs text-gray-400">Afficher quand vous êtes en ligne ou récemment actif</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="montrer_activite"
                            checked={privacyForm.montrer_activite}
                            onChange={handlePrivacyChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">Notifications par email</p>
                          <p className="text-xs text-gray-400">Recevoir des emails pour les nouvelles perceptions et messages</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="notifications_email"
                            checked={privacyForm.notifications_email}
                            onChange={handlePrivacyChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">Notifications push</p>
                          <p className="text-xs text-gray-400">Recevoir des notifications sur votre appareil</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="notifications_push"
                            checked={privacyForm.notifications_push}
                            onChange={handlePrivacyChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium"
                      disabled={loading}
                    >
                      {loading ? "Enregistrement..." : "Enregistrer les préférences"}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Onglet Mot de passe */}
            {activeTab === 'mot-de-passe' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <form onSubmit={handlePasswordSubmit} className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="block text-sm text-blue-300 mb-1">Mot de passe actuel</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-blue-300 mb-1">Nouveau mot de passe</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">Au moins 8 caractères, avec des lettres et des chiffres</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-blue-300 mb-1">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium"
                      disabled={loading}
                    >
                      {loading ? "Modification..." : "Modifier le mot de passe"}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Onglet Abonnement */}
            {activeTab === 'abonnement' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Votre abonnement actuel</h3>
                  <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-lg border border-purple-500/40 mb-3">
                    <span className="font-semibold">Plan Essentiel</span>
                  </div>
                  <p className="text-gray-400 mb-1">Renouvellement le 15 mai 2025</p>
                  <p className="text-sm text-gray-400">9,99€ par mois</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-black/30 rounded-xl p-4 border border-blue-900/30">
                    <h4 className="font-medium mb-2">Fonctionnalités actuelles</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-gray-300">
                        <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Messages limités (10 par jour)
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Profil mis en avant 1x par semaine
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Filtres de base
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Voir qui a visité votre profil
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/30 rounded-xl p-4 border border-blue-900/30">
                    <h4 className="font-medium mb-2">Fonctionnalités Premium</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-gray-300">
                        <svg className="h-5 w-5 text-gray-600 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Messages illimités
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <svg className="h-5 w-5 text-gray-600 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Profil mis en avant quotidiennement
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <svg className="h-5 w-5 text-gray-600 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Voir qui vous apprécie avant match
                      </li>
                      <li className="flex items-center text-sm text-gray-300">
                        <svg className="h-5 w-5 text-gray-600 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Mode incognito
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <button 
                    onClick={() => navigate('/abonnements')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Mettre à niveau mon abonnement
                  </button>
                  
                  <button className="px-6 py-2 border border-red-500/30 text-red-400 hover:bg-red-900/20 rounded-lg">
                    Annuler mon abonnement
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
