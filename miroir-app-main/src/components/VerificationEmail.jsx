import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verifyCode } from "../services/dbService";
import { useAuth } from "../contexts/AuthContext";

const VerificationEmail = () => {
  const { currentUser } = useAuth();
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = codeDigits.join("");

    if (code.length !== 6) {
      setError("Entrez les 6 chiffres du code.");
      return;
    }

    const email = currentUser?.email;
    if (!email) {
      setError("Aucun utilisateur connecté.");
      return;
    }

    const isValid = await verifyCode(email, code);
    if (isValid) {
      setError("");
      navigate("/profil");
    } else {
      setError("Code incorrect. Vérifie l’e-mail et réessaie.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h2 className="text-2xl font-bold mb-4">Vérifie ton e-mail</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-2">
          {codeDigits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-10 text-xl text-center border border-gray-400 rounded"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Valider
        </button>
      </form>
    </div>
  );
};

export default VerificationEmail;
