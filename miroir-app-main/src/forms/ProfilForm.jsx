import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';

const ProfilForm = () => {
  const { currentUser } = useAuth();
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [passions, setPassions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const profilRef = doc(db, 'profils', currentUser.uid);
      await setDoc(profilRef, {
        prenom,
        nom,
        email,
        passions,
        createdAt: Date.now(),
      });

      alert('Profil enregistré avec succès !');
    } catch (error) {
      console.error('Erreur lors de l’enregistrement du profil :', error.message);
    }
  };

  const togglePassion = (passion) => {
    setPassions((prev) =>
      prev.includes(passion)
        ? prev.filter((p) => p !== passion)
        : [...prev, passion]
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
      <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <div>
        <label>
          <input type="checkbox" checked={passions.includes('Art')} onChange={() => togglePassion('Art')} />
          Art
        </label>
        <label>
          <input type="checkbox" checked={passions.includes('Musique')} onChange={() => togglePassion('Musique')} />
          Musique
        </label>
        <label>
          <input type="checkbox" checked={passions.includes('Sport')} onChange={() => togglePassion('Sport')} />
          Sport
        </label>
      </div>

      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default ProfilForm;
