import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Connexion() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result.success) {
        navigate('/profil');
      } else {
        setError("Erreur lors de la connexion: " + (result.error || "Identifiants incorrects."));
      }
    } catch (error) {
      setError("Erreur lors de la connexion: " + error.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Connexion</h1>
        
        {error && (
          <div className="bg-red-900/30 text-red-200 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-blue-500/20 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-blue-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                required
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm text-blue-300 mb-1">Mot de passe</label>
                <Link to="/mot-de-passe-oublie" className="text-xs text-blue-400 hover:text-blue-300">
                  Mot de passe oublié ?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-2 text-white"
                required
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors"
                disabled={loading}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </div>
            
            <div className="text-center text-sm text-blue-300/70 pt-2">
              <p>Pas encore de compte ? <Link to="/inscription" className="text-blue-400 hover:underline">Inscrivez-vous</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
