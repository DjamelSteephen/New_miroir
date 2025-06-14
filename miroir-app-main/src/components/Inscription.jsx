import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { sendVerificationEmail } from '../services/emailService'; // 💡 À importer
import ProfilForm from '../forms/ProfilForm';

export default function Inscription() {
  const [etape, setEtape] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    interets: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 🔐 Crée le compte avec Firebase Auth
      const result = await signUp(formData.email, formData.password, {
        nom: formData.nom,
        prenom: formData.prenom,
        dateNaissance: formData.dateNaissance,
        interets: formData.interets
      });

      if (result.success) {
        // ✅ Génère un code de vérification
        const code = generateCode();

        // 💾 Stocke le code dans le localStorage
        localStorage.setItem(`verify_${formData.email}`, code);

        // 📧 Envoie le code par email
        const resMail = await sendVerificationEmail(formData.email, code);

        if (!resMail.success) {
          setError("Échec de l'envoi du code : " + resMail.error);
          setLoading(false);
          return;
        }

        // ✅ Redirection vers la vérification
        navigate("/verification-email", { state: { email: formData.email } });
      } else {
        setError("Erreur lors de l'inscription: " + (result.error || "Veuillez réessayer."));
      }
    } catch (error) {
      setError("Erreur lors de l'inscription: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Rejoins Miroir</h1>

        {error && (
          <div className="bg-red-900/30 text-red-200 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-blue-500/20 shadow-lg">
          <div className="mb-4">
            <div className="h-1 w-full bg-gray-800 rounded-full">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${(etape / 3) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>Identité</span>
              <span>Profil</span>
              <span>Préférences</span>
            </div>
          </div>

          {etape === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-semibold mb-4">Crée ton compte</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-blue-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-blue-300 mb-1">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                  />
                </div>
                <button
                  onClick={() => setEtape(2)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium"
                  disabled={!formData.email || !formData.password}
                >
                  Continuer
                </button>
              </div>
            </motion.div>
          )}

          {etape === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-semibold mb-4">Parle-nous de toi</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-blue-300 mb-1">Prénom</label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-blue-300 mb-1">Nom</label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-blue-300 mb-1">Date de naissance</label>
                  <input
                    type="date"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleChange}
                    className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEtape(1)}
                    className="w-1/3 py-2 bg-transparent border border-blue-500/50 rounded-lg text-blue-300"
                  >
                    Retour
                  </button>
                  <button
                    onClick={() => setEtape(3)}
                    className="w-2/3 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium"
                    disabled={!formData.prenom || !formData.nom || !formData.dateNaissance}
                  >
                    Continuer
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {etape === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-semibold mb-4">Finalise ton profil</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-blue-300 mb-2">Sélectionne tes intérêts</label>
                  <div className="flex flex-wrap gap-2">
                    {['Art', 'Musique', 'Voyages', 'Sport', 'Cuisine', 'Photographie', 'Cinéma', 'Littérature'].map(interet => (
                      <button
                        key={interet}
                        type="button"
                        className="px-3 py-1 bg-blue-900/20 hover:bg-blue-900/40 rounded-full text-sm"
                        onClick={() => {
                          const newInterets = formData.interets.includes(interet)
                            ? formData.interets.filter(i => i !== interet)
                            : [...formData.interets, interet];
                          
                          setFormData({
                            ...formData,
                            interets: newInterets
                          });
                        }}
                        style={{
                          backgroundColor: formData.interets.includes(interet) ? 'rgba(59, 130, 246, 0.5)' : undefined
                        }}
                      >
                        {interet}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEtape(2)}
                    className="w-1/3 py-2 bg-transparent border border-blue-500/50 rounded-lg text-blue-300"
                    disabled={loading}
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="w-2/3 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium"
                    disabled={loading || formData.interets.length === 0}
                  >
                    {loading ? "Création..." : "Créer mon profil"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
