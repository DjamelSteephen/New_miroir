import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProfilMiroir from './components/ProfilMiroir';
import Inscription from './components/Inscription';
import Connexion from './components/Connexion';
import Messaging from './components/Messaging';
import Decouverte from './components/Decouverte';
import Abonnements from './components/Abonnements';
import VerificationEmail from './components/VerificationEmail';
import MotDePasseOublie from './components/MotDePasseOublie';
import Navigation from './components/Navigation';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Composant pour protéger les routes qui nécessitent une authentification
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/connexion" />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/verification-email" element={<VerificationEmail />} />
        <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />
        <Route 
          path="/profil" 
          element={
            <ProtectedRoute>
              <ProfilMiroir />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/messages" 
          element={
            <ProtectedRoute>
              <Messaging />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/decouverte" 
          element={
            <ProtectedRoute>
              <Decouverte />
            </ProtectedRoute>
          } 
        />
        <Route path="/abonnements" element={<Abonnements />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
