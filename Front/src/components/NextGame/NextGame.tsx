import { useEffect, useState } from 'react';
import fetchNextGame from '../../services/next_game_api';
import { useNextGame } from '../../services/NextGameContext';

interface NextJackpot {
  referenceDate: Date;
  jackpot: number;
  id_next_game: number;
}

function NextGame() {
  const [nextJackpots, setNextJackpots] = useState<{ result: NextJackpot[] }>({
    result: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const nextGameContext = useNextGame();
  if (!nextGameContext) {
    throw new Error('useNextGame must be used within a NextGameProvider');
  }
  const { setNextGameData } = nextGameContext;

  useEffect(() => {
    const fetchNextJackpot = async () => {
      try {
        setIsLoading(true);
        const fetchedNextJackpot: NextJackpot[] = await fetchNextGame();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const jackpots = fetchedNextJackpot.result.map((jackpot) => ({
          id_next_game: jackpot.id_next_game,
          referenceDate: new Date(jackpot.reference_date), // Convertir en objet Date
          jackpot: parseFloat(jackpot.jackpot), // Assurer que jackpot est un nombre
        }));
        setNextJackpots({ result: jackpots });
        setNextGameData({ result: jackpots });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNextJackpot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setNextGameData]);

  return (
    <div className="bg-blue-900 my-8">
      {isLoading ? (
        <p>Chargement du prochain jeu...</p>
      ) : (
        <div className="py-4">
          {nextJackpots.result.map((nextJackpot) => (
            <div
              key={nextJackpot.id_next_game}
              className="flex flex-col items-center justify-center gap-sm text-center"
            >
              <h2 className="flex w-full items-center justify-center gap-xs text-white text-xl">
                {nextJackpot.referenceDate.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </h2>
              <div className="flex flex-col justify-center">
                <p className="text-white">Près de</p>
                <p className="text-4xl text-yellow-400 font-semibold">
                  {nextJackpot.jackpot} millions €
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NextGame;
