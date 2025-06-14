import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function MotDePasseOublie() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Veuillez entrer votre adresse email');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Dans une vraie application, cette fonction enverrait un email de réinitialisation
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (error) {
      setError('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          className="bg-black/30 backdrop-blur-md rounded-xl p-8 border border-blue-500/20 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {success ? (
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h2 className="text-2xl font-bold mb-2">Email envoyé !</h2>
              <p className="text-blue-300 mb-6">
                Si un compte existe avec cette adresse email, vous recevrez un lien pour réinitialiser votre mot de passe.
              </p>
              <Link 
                to="/connexion" 
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg inline-block text-white font-medium transition-colors"
              >
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-1 text-center">Mot de passe oublié</h2>
              <p className="text-blue-300 text-center mb-6">
                Entrez votre adresse email pour recevoir un lien de réinitialisation
              </p>
              
              {error && (
                <div className="bg-red-900/30 text-red-200 p-3 rounded-lg mb-4">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-blue-300 mb-1">Adresse email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-blue-900/20 border border-blue-800/30 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="votre@email.com"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors"
                >
                  {loading ? 
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi...
                    </span>
                  : "Envoyer le lien de réinitialisation"}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <Link to="/connexion" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                  Retour à la connexion
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
