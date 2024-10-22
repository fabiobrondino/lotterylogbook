import { useState, useEffect } from 'react';
import { getLuckyNumber } from '../../services/lucky_number';

function LuckyNumber() {
  const [numbers, setNumbers] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Appel à l'API pour récupérer les numéros et les étoiles
    getLuckyNumber().then((response) => {
      const luckyData = response.result[0];
      setNumbers(luckyData.number); // Mise à jour de l'état des numéros
      setStars(luckyData.star); // Mise à jour de l'état des étoiles
    });
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Vos numéros porte-bonheur</h2>
      <div className="grid grid-cols-10 gap-2">
        {numbers.map((number) => (
          <span
            key={number}
            className="rounded-full border-2 border-gray-300 p-4 w-10 h-10 flex items-center justify-center text-xl"
          >
            {number}
          </span>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-6">
        Vos étoiles porte-bonheur
      </h2>
      <div className="grid grid-cols-12 gap-2">
        {stars.map((star) => (
          <span
            key={star}
            className="border-2 border-gray-500 p-4 w-12 h-12 flex items-center justify-center text-xl relative bg-gray-300"
            style={{
              clipPath:
                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              padding: '1em',
            }}
          >
            <span>{star}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default LuckyNumber;
