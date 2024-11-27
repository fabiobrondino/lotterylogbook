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

  // Trier les dates par ordre croissant
  const sortedDates = Object.entries(gamesByDate).sort(
    ([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime()
  );

  return (
    <div className="p-4 max-w-md mx-auto">
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
                  <div key={game.id_combinations} className="mt-2">
                    <p
                      key={game.id_combinations}
                      className="mt-2 text-gray-700"
                    >
                      Grille {index + 1}: {game.number.join(', ')} | Étoiles:{' '}
                      {game.star.join(', ')}
                    </p>
                    <p>Gain</p>
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
