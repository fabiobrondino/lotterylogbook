/* eslint-disable no-console */
/* eslint-disable no-alert */
import { useState, useEffect } from 'react';
import sendLuckyNumber from '../../services/lucky_number';

function SelectLuckyNumber() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);

  // Fonction pour gérer la sélection d'un nombre
  const handleNumberSelect = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  // Fonction pour gérer la sélection d'une étoile
  const handleStarSelect = (selectedStar: number) => {
    if (selectedStars.includes(selectedStar)) {
      setSelectedStars(selectedStars.filter((star) => star !== selectedStar));
    } else {
      setSelectedStars([...selectedStars, selectedStar]);
    }
  };

  // Effet pour vérifier le nombre minimum de sélections
  useEffect(() => {
    if (selectedNumbers.length < 5) {
      console.log('Veuillez sélectionner au moins 5 numéros');
    }
    if (selectedStars.length < 2) {
      console.log('Veuillez sélectionner au moins 2 étoiles');
    }
  }, [selectedNumbers, selectedStars]);

  // Fonction pour gérer l'envoi des données
  const handleSendLuckyNumber = async () => {
    console.log(selectedNumbers, selectedStars);
    if (selectedNumbers.length >= 5 && selectedStars.length >= 2) {
      try {
        const response = await sendLuckyNumber(selectedNumbers, selectedStars);
        console.log(selectedNumbers, selectedStars);
        console.log('Mise à jour réussie', response);
      } catch (error) {
        console.error("Erreur lors de l'envoi", error);
        return;
      }
      // Action à effectuer avec les données (ex : les envoyer à une API)
      console.log('Numéros sélectionnés:', selectedNumbers);
      console.log('Étoiles sélectionnées:', selectedStars);
      alert('Sélection envoyée avec succès!');
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sélectionnez vos numéros</h2>
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: 50 }, (_, i) => i + 1).map((number) => (
          <span
            key={number}
            role="button"
            tabIndex={0}
            className={`rounded-full border-2 ${
              selectedNumbers.includes(number)
                ? 'border-blue-500'
                : 'border-gray-300'
            } p-4 w-10 h-10 cursor-pointer flex items-center justify-center text-xl`}
            onClick={() => handleNumberSelect(number)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNumberSelect(number);
              }
            }}
          >
            {number}
          </span>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-6">Sélectionnez vos étoiles</h2>
      <div className="grid grid-cols-12 gap-2">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((star) => (
          <span
            key={star}
            role="button"
            tabIndex={0}
            className={`border-2 border-gray-500 p-4 w-12 h-12 cursor-pointer flex items-center justify-center text-xl relative ${
              selectedStars.includes(star) ? 'bg-yellow-500' : 'bg-gray-300'
            }`}
            style={{
              clipPath:
                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              padding: '1em',
            }}
            onClick={() => handleStarSelect(star)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleStarSelect(star);
              }
            }}
          >
            <span>{star}</span>
          </span>
        ))}
      </div>

      <button
        type="button"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSendLuckyNumber}
        disabled={selectedNumbers.length < 5 || selectedStars.length < 2}
      >
        Soumettre
      </button>
    </div>
  );
}

export default SelectLuckyNumber;
