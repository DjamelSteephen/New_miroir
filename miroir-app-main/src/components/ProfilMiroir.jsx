import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';

const ProfilMiroir = () => {
  const { currentUser } = useAuth();
  const [profil, setProfil] = useState(null);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const profilRef = doc(db, 'profils', currentUser.uid);
        const profilSnap = await getDoc(profilRef);
        if (profilSnap.exists()) {
          setProfil(profilSnap.data());
        } else {
          setErreur('Aucun profil trouvé.');
        }
      } catch (err) {
        console.error('Erreur :', err);
        setErreur('Erreur lors de la récupération du profil: ' + err.message);
      }
    };

    if (currentUser?.uid) {
      fetchProfil();
    }
  }, [currentUser]);

  if (erreur) return <p>{erreur}</p>;
  if (!profil) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Bienvenue, {profil.prenom} {profil.nom}</h2>
      <p>Email : {profil.email}</p>
      <p>Passions : {profil.passions.join(', ')}</p>
    </div>
  );
};

export default ProfilMiroir;
