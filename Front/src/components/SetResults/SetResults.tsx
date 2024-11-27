/* eslint-disable no-console */
import { useState } from 'react';
import { setLastResult } from '../../services/historical_jackpot';

interface HistoricalJackpot {
  number: number[];
  star: number[];
  reference_date: Date;
}

function SetResults() {
  const [referenceDate, setReferenceDate] = useState<string>('');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);

  const handleNumberSelect = (number: number) => {
    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  };

  const handleStarSelect = (star: number) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    selectFunc: (number: number) => void,
    number: number
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Empêche le comportement par défaut de l'espace
      selectFunc(number);
    }
  };

  const handleSubmit = async () => {
    // Validation et envoi des données
    const result: HistoricalJackpot = {
      number: selectedNumbers,
      star: selectedStars,
      reference_date: new Date(referenceDate),
    };

    // Envoi de `result` à l'API
    console.log('Data to send:', result);
    try {
      const response = await setLastResult(result);
      console.log('Mise à jour réussie', response);
    } catch (error) {
      console.error("Erreur lors de l'envoi", error);
    }

    setReferenceDate('');
    setSelectedNumbers([]);
    setSelectedStars([]);
  };

  return (
    <div className="bg-white max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Enregistrer le résultat du dernier jeu</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="block mb-2">
          Date de référence:
          <input
            type="date"
            value={referenceDate}
            onChange={(e) => setReferenceDate(e.target.value)}
            className="border p-2 w-full mt-1"
          />
        </label>

        <div className="mb-4">
          <h3 className="text-xl mb-2">Chiffres gagnants</h3>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(50px,_1fr))] w-full place-items-center gap-2">
            {Array.from({ length: 50 }, (_, i) => i + 1).map((number) => (
              <span
                key={number}
                tabIndex={0} // Rendre l'élément focalisable
                role="button" // Indiquer qu'il s'agit d'un bouton
                className={`rounded-full border-2 p-4 w-10 h-10 flex items-center justify-center text-xl ${
                  selectedNumbers.includes(number)
                    ? 'bg-blue-300 border-blue-500'
                    : 'border-gray-300'
                }`}
                onClick={() => handleNumberSelect(number)}
                onKeyDown={(event) =>
                  handleKeyDown(event, handleNumberSelect, number)
                } // Gestionnaire de clavier
              >
                {number}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl mb-2">Étoiles gagnantes</h3>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(60px,_1fr))] w-full place-items-center gap-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((star) => (
              <span
                key={star}
                tabIndex={0} // Rendre l'élément focalisable
                role="button" // Indiquer qu'il s'agit d'un bouton
                className={`border-2 w-12 h-12 flex items-center justify-center text-xl relative ${
                  selectedStars.includes(star)
                    ? 'bg-yellow-300 border-yellow-500'
                    : 'border-gray-500 bg-gray-300'
                }`}
                style={{
                  clipPath:
                    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                }}
                onClick={() => handleStarSelect(star)}
                onKeyDown={(event) =>
                  handleKeyDown(event, handleStarSelect, star)
                } // Gestionnaire de clavier
              >
                {star}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Enregistrer le résultat
        </button>
      </form>
    </div>
  );
}

export default SetResults;
