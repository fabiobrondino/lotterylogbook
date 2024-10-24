/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/20/solid';

// Fonction pour générer des combinaisons de k éléments parmi un tableau
const getCombinations = (array: number[], k: number) => {
  if (k === 1) {
    return array.map((el) => [el]);
  }

  const combinations: number[][] = [];

  array.forEach((current, index) => {
    const smallerCombinations = getCombinations(array.slice(index + 1), k - 1);
    smallerCombinations.forEach((comb) => {
      combinations.push([current, ...comb]);
    });
  });

  return combinations;
};

type LuckyNumberProps = {
  idLuckyNumber: number;
  numbers: number[];
  stars: number[];
  handleDelete: (idLuckyNumber: number) => void;
};

function LuckyNumber({
  idLuckyNumber,
  numbers,
  stars,
  handleDelete,
}: LuckyNumberProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [generatedGames, setGeneratedGames] = useState<
    Array<{ numbers: number[]; stars: number[] }>
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedGames, setSelectedGames] = useState<{
    [key: string]: boolean;
  }>({});

  const onDeleteClick = () => {
    handleDelete(idLuckyNumber);
  };

  const handleNumberSelect = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers((prev) => prev.filter((n) => n !== number));
    } else {
      setSelectedNumbers((prev) => [...prev, number]);
    }
  };

  const handleStarSelect = (star: number) => {
    if (selectedStars.includes(star)) {
      setSelectedStars((prev) => prev.filter((s) => s !== star));
    } else {
      setSelectedStars((prev) => [...prev, star]);
    }
  };

  const validateSelection = () => {
    const numCount = selectedNumbers.length;
    const starCount = selectedStars.length;

    if (numCount < 5 || starCount < 2) {
      setError('Vous devez sélectionner au moins 5 chiffres et 2 étoiles.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleSimulateSingle = () => {
    if (validateSelection()) {
      const allGames: Array<{ numbers: number[]; stars: number[] }> = [];

      // Générer toutes les combinaisons possibles de chiffres et étoiles
      for (let i = 5; i <= selectedNumbers.length; i += 1) {
        for (let j = 2; j <= selectedStars.length; j += 1) {
          const numberCombinations = getCombinations(selectedNumbers, i);
          const starCombinations = getCombinations(selectedStars, j);

          numberCombinations.forEach((numCombo) => {
            starCombinations.forEach((starCombo) => {
              allGames.push({ numbers: numCombo, stars: starCombo });
            });
          });
        }
      }

      // Sélectionner un jeu aléatoire parmi toutes les possibilités générées
      if (allGames.length > 0) {
        const randomGame =
          allGames[Math.floor(Math.random() * allGames.length)];
        setGeneratedGames([randomGame]);
      }
    }
  };

  const handleSimulateAll = () => {
    if (validateSelection()) {
      const allGames: Array<{ numbers: number[]; stars: number[] }> = [];

      // Boucle à travers toutes les combinaisons possibles de chiffres et étoiles
      for (let i = 5; i <= selectedNumbers.length; i += 1) {
        for (let j = 2; j <= selectedStars.length; j += 1) {
          const numberCombinations = getCombinations(selectedNumbers, i);
          const starCombinations = getCombinations(selectedStars, j);

          numberCombinations.forEach((numCombo) => {
            starCombinations.forEach((starCombo) => {
              allGames.push({ numbers: numCombo, stars: starCombo });
            });
          });
        }
      }

      setGeneratedGames(allGames);
    }
  };

  // Fonction pour envoyer les jeux sélectionnés via l'API
  const sendSelectedGames = () => {
    // Filtrer les jeux sélectionnés en utilisant les clés de selectedGames
    const gamesToSend = generatedGames
      .filter(
        (game) =>
          selectedGames[`${game.numbers.join(',')}-${game.stars.join(',')}`]
      )
      .map((game) => ({
        numbers: game.numbers,
        stars: game.stars,
      }));

    // Logique pour envoyer les jeux via une API
    console.log(gamesToSend); // Remplace par ta logique d'envoi
    // handleSendGames(gamesToSend); // Décommentez ceci pour envoyer via l'API
  };

  return (
    <div className="border-4 p-8 w-5/6 lg:w-3/5 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl">Vos numéros porte-bonheur</h2>
        <button type="button" className="p-3" onClick={onDeleteClick}>
          <TrashIcon className="h-6" />
        </button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(50px,_1fr))] w-full place-items-center gap-2">
        {numbers.map((number) => (
          <span
            key={number}
            className={`rounded-full border-2 p-4 w-10 h-10 flex items-center justify-center text-xl ${
              selectedNumbers.includes(number)
                ? 'bg-blue-300 border-blue-500'
                : 'border-gray-300'
            }`}
            onClick={() => handleNumberSelect(number)}
          >
            {number}
          </span>
        ))}
      </div>

      <h2 className="text-xl md:text-2xl mb-4 mt-6">
        Vos étoiles porte-bonheur
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(60px,_1fr))] w-full place-items-center gap-2">
        {stars.map((star) => (
          <span
            key={star}
            className={`border-2 w-12 h-12 flex items-center justify-center text-xl relative bg-gray-300 ${
              selectedStars.includes(star)
                ? 'bg-yellow-300 border-yellow-500'
                : 'border-gray-500'
            }`}
            style={{
              clipPath:
                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            }}
            onClick={() => handleStarSelect(star)}
          >
            {star}
          </span>
        ))}
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="rounded-full bg-blue-500 text-white p-4"
          onClick={handleSimulateSingle}
        >
          Générer un seul jeu
        </button>

        <button
          type="button"
          className="rounded-full bg-green-500 text-white p-4"
          onClick={handleSimulateAll}
        >
          Générer toutes les possibilités
        </button>
      </div>

      {/* Affichage des jeux générés */}
      {generatedGames.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl mb-4">Jeux générés</h3>
          <ul className="">
            {generatedGames.map((game) => {
              const gameKey = `${game.numbers.join(',')}-${game.stars.join(
                ','
              )}`; // Déclaration de gameKey ici
              const isSelected = !!selectedGames[gameKey];

              return (
                <li
                  key={gameKey}
                  className={`rounded-full m-4 p-2 flex items-center ${
                    isSelected ? 'bg-blue-300' : 'bg-gray-300'
                  }`}
                  onClick={() => {
                    setSelectedGames((prev) => ({
                      ...prev,
                      [gameKey]: !prev[gameKey], // Change l'état de sélection
                    }));
                  }}
                >
                  <span className="mx-2">
                    Chiffres : {game.numbers.join(', ')}
                  </span>{' '}
                  |{' '}
                  <span className="mx-2">
                    Étoiles : {game.stars.join(', ')}
                  </span>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={sendSelectedGames}
            className="mt-4 rounded-full bg-purple-500 text-white p-4"
          >
            Envoyer les jeux sélectionnés
          </button>
        </div>
      )}
    </div>
  );
}

export default LuckyNumber;
