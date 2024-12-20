import { useState, useEffect } from 'react';
import { fetchLastResult } from '../../services/historical_jackpot';

interface HistoricalJackpot {
  id_results: number;
  number: number[];
  star: number[];
  reference_date: Date;
}

function GetResults() {
  const [historicalJackpots, setHistoricalJackpots] = useState<{
    result: HistoricalJackpot[];
  }>({
    result: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLastJackpot = async () => {
      try {
        setIsLoading(true);
        const fetchedHistoricalJackpots: { result: HistoricalJackpot[] } =
          await fetchLastResult();
        const jackpots = fetchedHistoricalJackpots.result.map((jackpot) => ({
          id_results: jackpot.id_results,
          number: jackpot.number,
          star: jackpot.star,
          reference_date: new Date(jackpot.reference_date),
        }));
        setHistoricalJackpots({ result: jackpots });
        setIsLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    fetchLastJackpot();
  }, []);

  return (
    <div className="container mx-auto my-8 p-6">
      {isLoading ? (
        <p className="text-white text-center text-lg">
          Chargement des résultats...
        </p>
      ) : (
        <div className="space-y-8">
          {historicalJackpots.result.map((historicalJackpot) => (
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
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="flex gap-4 justify-center">
                  {historicalJackpot.number.map((num) => (
                    <p
                      key={num}
                      className="rounded-full border-2 p-4 w-10 h-10 font-semibold flex items-center justify-center text-lg text-white bg-blue-700 border-blue-700"
                    >
                      {num}
                    </p>
                  ))}
                </div>
                <div className="flex gap-4 justify-center">
                  {historicalJackpot.star.map((num) => (
                    <p
                      key={num}
                      className="border-2 w-12 h-12 flex items-center font-semibold justify-center text-lg text-white bg-yellow-400 border-yellow-500 rounded-full relative"
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

export default GetResults;
