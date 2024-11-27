import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNextGame } from '../../services/NextGameContext';
import fetchAllGames from '../../services/historicalGames';

function GetGamePlayed() {
  // États
  const [gamesByDate, setGamesByDate] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});

  const nextGameContext = useNextGame();
  console.log(`nextGameContext`, nextGameContext);

  // Récupérer les données à l'initialisation
  useEffect(() => {
    const fetchData = async () => {
      try {
        const games = await fetchAllGames();
        console.log(`games`, games);
        const groupedGames = games.result.reduce(
          (acc: Record<string, any[]>, game: any) => {
            console.log(`game`, game);
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { reference_date } = game; // On utilise reference_date comme clé
            if (!acc[reference_date]) acc[reference_date] = [];
            acc[reference_date].push(game);
            return acc;
          },
          {}
        );
        console.log(`groupedGames`, groupedGames);
        setGamesByDate(groupedGames);
      } catch (err) {
        setError('Impossible de charger les données.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Gérer l'affichage par date
  const toggleDetails = (date: string) => {
    setShowDetails((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Trier les dates par ordre décroissant
  const sortedDates = Object.entries(gamesByDate).sort(
    ([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime()
  );

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Toutes mes grilles jouées pour le :
      </h1>

      {sortedDates.map(([date, games]) => {
        // Formatage de la date avec la première lettre du jour en majuscule
        const formattedDate = format(new Date(date), 'eeee dd MMMM yyyy', {
          locale: fr,
        });
        const capitalizedDate =
          formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

        return (
          <div
            key={date}
            className="mb-4 p-4 bg-blue-100 rounded-lg shadow-md transition 
                       hover:bg-blue-200 hover:shadow-lg hover:scale-105 cursor-pointer"
            onClick={() => toggleDetails(date)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') toggleDetails(date);
            }}
            role="button"
            tabIndex={0}
          >
            <h2>{capitalizedDate}</h2>

            {showDetails[date] && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-medium">Grilles jouées</h3>
                {games.map((game, index) => (
                  <div key={game.id_combinations} className="mt-4">
                    <p className="text-gray-700 mb-2">
                      <span className="font-bold">Grille {index + 1}:</span>
                    </p>
                    <div className="flex w-full mx-auto">
                      <div className="grid grid-cols-[repeat(auto-fit,_minmax(50px,_1fr))] max-w-sm place-items-center gap-2">
                        {/* Numéros */}
                        {game.number.map((number: number) => (
                          <span
                            key={number}
                            className="rounded-full border-2 p-4 w-10 h-10 flex items-center justify-center text-xl bg-blue-300 border-blue-500"
                          >
                            {number}
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-[repeat(auto-fit,_minmax(60px,_1fr))] max-w-xs place-items-center gap-2 ml-4">
                        {/* Étoiles */}
                        {game.star.map((star: number) => (
                          <span
                            key={star}
                            className="border-2 w-12 h-12 flex items-center justify-center text-xl relative bg-yellow-300 border-yellow-500"
                            style={{
                              clipPath:
                                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                            }}
                          >
                            {star}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p
                        className={`mt-4 font-medium ${
                          game.gain ? 'text-green-600' : 'text-gray-700'
                        } ml-auto`}
                      >
                        Gain: {game.gain || 'Aucun'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default GetGamePlayed;
