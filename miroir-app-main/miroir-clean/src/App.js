import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProfilMiroir from './components/ProfilMiroir';
import Inscription from './components/Inscription';
import Messaging from './components/Messaging';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profil" element={<ProfilMiroir />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/messages" element={<Messaging />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
