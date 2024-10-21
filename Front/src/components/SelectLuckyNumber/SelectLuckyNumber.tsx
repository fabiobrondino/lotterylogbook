import { useState, useEffect } from 'react';

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
            } p-2 cursor-pointer flex items-center justify-center`}
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

      <h2 className="text-2xl font-bold mb-4">Sélectionnez vos étoiles</h2>
      <div className="grid grid-cols-12 gap-2">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((star) => (
          <span
            key={star}
            role="button"
            tabIndex={0}
            className={`rounded-full border-2 ${
              selectedStars.includes(star)
                ? 'border-blue-500'
                : 'border-gray-300'
            } p-2 cursor-pointer flex items-center justify-center`}
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
    </div>
  );
}

export default SelectLuckyNumber;
