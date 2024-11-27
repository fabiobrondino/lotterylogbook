import { useEffect, useState } from 'react';
import fetchUser from '../../services/user_api';
import SelectLuckyNumber from '../../components/SelectLuckyNumber/SelectLuckyNumber';

interface User {
  id_user: number;
  first_name: string;
  last_name: string;
  email: string;
}

function Home() {
  const [users, setUsers] = useState<{ result: User[] }>({ result: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true); // Indiquer que le chargement est en cours
        const fetchedUsers: User[] = await fetchUser();
        console.log(fetchedUsers);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setUsers(fetchedUsers);
        setIsLoading(false); // Indiquer que le chargement est terminé
      } catch (error) {
        // Gestion des erreurs
        console.error(error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="container mx-auto my-8 p-6">
      {/* Message de chargement */}
      {isLoading ? (
        <p className="text-center text-white text-lg">
          Chargement des utilisateurs...
        </p>
      ) : (
        <div className="space-y-6">
          {/* Affichage des utilisateurs */}
          {users.result.map((user) => (
            <div
              key={user.id_user}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center gap-4"
            >
              <h2 className="text-2xl font-semibold text-blue-900">
                Salut {user.first_name}, chanceux aujourd&apos;hui ?
              </h2>
            </div>
          ))}
        </div>
      )}

      {/* Sélecteur de numéros chanceux */}
      <div className="bg-blue-900 shadow-lg rounded-lg p-6 mt-6 ">
        <SelectLuckyNumber />
      </div>
    </div>
  );
}

export default Home;
