import { useEffect, useState } from 'react';
import NextGame from '../../components/NextGame/NextGame';
import LuckyNumber from '../../components/LuckyNumber/LuckyNumber';
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
    <div>
      <NextGame />
      {isLoading ? (
        <p>Chargement des utilisateurs...</p>
      ) : (
        <div>
          {users.result.map((user) => (
            <div key={user.id_user}>
              <h2>Salut {user.first_name}</h2>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      )}
      <SelectLuckyNumber />
      <LuckyNumber />
    </div>
  );
}

export default Home;
