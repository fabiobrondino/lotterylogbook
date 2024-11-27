import { useState, useEffect } from 'react';
import { fetchSpecificResult } from '../../services/historical_jackpot';

interface HistoricalJackpot {
  id_results: number;
  number: number[];
  star: number[];
  reference_date: Date;
}

function GetMoreResults() {
  const [historicalJackpots, setHistoricalJackpots] = useState<
    HistoricalJackpot[]
  >([]);
  const [referenceDate, setReferenceDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour vérifier si une date est un mardi ou un vendredi
  const isTuesdayOrFriday = (date: Date) => {
    const day = date.getDay();
    return day === 2 || day === 5; // 2 = Mardi, 5 = Vendredi
  };

  // Fonction pour récupérer les résultats
  const fetchSpecificJackpot = async (date: string) => {
    try {
      setIsLoading(true);
      const fetchedHistoricalJackpots: { result: HistoricalJackpot[] } =
        await fetchSpecificResult(new Date(date).toISOString().split('T')[0]);
      const jackpots = fetchedHistoricalJackpots.result.map((jackpot) => ({
        id_results: jackpot.id_results,
        number: jackpot.number,
        star: jackpot.star,
        reference_date: new Date(jackpot.reference_date),
      }));
      setHistoricalJackpots(jackpots);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    setReferenceDate('');
  };

  // Utiliser useEffect pour récupérer les résultats lors du changement de référence de date
  useEffect(() => {
    if (referenceDate) {
      fetchSpecificJackpot(referenceDate);
    }
  }, [referenceDate]);

  // Fonction pour gérer la sélection de date
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    const date = new Date(selectedDate);
    if (isTuesdayOrFriday(date) && date < new Date()) {
      setReferenceDate(selectedDate);
    } else {
      alert('Veuillez sélectionner une date valide (mardi ou vendredi passé).');
    }
  };

  return (
    <div className="container mx-auto my-8 p-6">
      {/* Titre principal */}
      <p className="text-center text-white text-2xl font-semibold mb-6">
        Résultats antérieurs
      </p>

      {/* Sélecteur de date */}
      <div className="flex justify-center mb-6">
        <input
          type="date"
          onChange={handleDateChange}
          className="p-2 rounded border border-gray-300 text-center shadow-md focus:outline-none"
        />
      </div>

      {/* Affichage des résultats */}
      {isLoading ? (
        <p className="text-white text-center text-lg">
          Chargement des résultats...
        </p>
      ) : (
        <div className="space-y-8">
          {historicalJackpots.map((historicalJackpot) => (
            <div
              key={historicalJackpot.id_results}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <h2 className="text-xl font-bold text-center text-blue-900 mb-4">
                {historicalJackpot.reference_date.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </h2>

              {/* Conteneur des numéros et étoiles */}
              <div className="flex flex-col items-center space-y-6">
                <div className="flex gap-4 justify-center">
                  {historicalJackpot.number.map((num) => (
                    <p
                      key={num}
                      className="rounded-full border-2 p-4 w-12 h-12 font-semibold flex items-center justify-center text-xl text-white bg-blue-700 border-blue-700"
                    >
                      {num}
                    </p>
                  ))}
                </div>

                <div className="flex gap-4 justify-center">
                  {historicalJackpot.star.map((num) => (
                    <p
                      key={num}
                      className="border-2 w-14 h-14 flex items-center font-semibold justify-center text-xl text-white bg-yellow-400 border-yellow-500 rounded-full relative"
                      style={{
                        clipPath:
                          'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                      }}
                    >
                      {num}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetMoreResults;
