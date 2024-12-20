/* eslint-disable no-console */
/* eslint-disable no-alert */
import { useState, useEffect } from 'react';
import { sendLuckyNumber } from '../../services/lucky_number';

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
    // Trier les numéros et les étoiles en ordre croissant
    const sortedNumbers = [...selectedNumbers].sort((a, b) => a - b);
    const sortedStars = [...selectedStars].sort((a, b) => a - b);

    console.log(sortedNumbers, sortedStars);

    if (sortedNumbers.length >= 5 && sortedStars.length >= 2) {
      try {
        const response = await sendLuckyNumber(sortedNumbers, sortedStars);
        console.log('Mise à jour réussie', response);
      } catch (error) {
        console.error("Erreur lors de l'envoi", error);
        return;
      }

      // Action à effectuer avec les données triées
      console.log('Numéros sélectionnés:', sortedNumbers);
      console.log('Étoiles sélectionnées:', sortedStars);
      alert('Sélection envoyée avec succès!');
    }

    setSelectedNumbers([]);
    setSelectedStars([]);
  };

  return (
    <div className="container bg-white mx-auto my-4 border-4 p-8 w-5/6 lg:w-4/6 ">
      <h2 className="text-xl md:text-2xl mb-4 mb-4">
        Sélectionnez vos numéros
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(50px,_1fr))] gap-2 place-items-center w-full">
        {Array.from({ length: 50 }, (_, i) => i + 1).map((number) => (
          <span
            key={number}
            role="button"
            tabIndex={0}
            className={`rounded-full border-2 ${
              selectedNumbers.includes(number)
                ? 'border-blue-700 bg-blue-700 text-white'
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

      <h2 className="text-xl md:text-2xl mb-4 mb-4 mt-6">
        Sélectionnez vos étoiles
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(60px,_1fr))] gap-2 place-items-center w-full">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((star) => (
          <span
            key={star}
            role="button"
            tabIndex={0}
            className={`border-2 border-gray-500 p-4 w-12 h-12 cursor-pointer flex items-center justify-center text-xl relative ${
              selectedStars.includes(star)
                ? 'bg-yellow-500 bg-yellow-500 text-white'
                : 'bg-gray-300'
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
        className="mt-6 end-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSendLuckyNumber}
        disabled={selectedNumbers.length < 5 || selectedStars.length < 2}
      >
        Enregistrer
      </button>
    </div>
  );
}

export default SelectLuckyNumber;
