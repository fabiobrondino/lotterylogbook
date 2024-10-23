import { useState, useEffect } from 'react';
import { deleteLuckyNumber, getLuckyNumber } from '../../services/lucky_number'; // Remplacez par votre service
import LuckyNumber from '../LuckyNumber/LuckyNumber';

type LuckyNumberType = {
  id_lucky_number: number;
  number: number[];
  star: number[];
};

function LuckyNumbersContainer() {
  const [luckyGroups, setLuckyGroups] = useState<LuckyNumberType[]>([]);

  useEffect(() => {
    // Appel à l'API pour récupérer tous les groupes de numéros et étoiles
    getLuckyNumber().then((response) => {
      const luckyData: LuckyNumberType[] = response.result;
      console.log(luckyData);
      setLuckyGroups(luckyData); // Supposons que `response.result` est un tableau de groupes
    });
  }, []);

  const handleDelete = async (idLuckyNumber: number) => {
    try {
      // Passer l'idLuckyNumber à la fonction de suppression
      await deleteLuckyNumber(idLuckyNumber);
      setLuckyGroups(
        (prevGroups) =>
          prevGroups.filter((group) => group.id_lucky_number !== idLuckyNumber) // Mise à jour de l'état local
      );
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  return (
    <div className="container mx-auto my-4 flex flex-col items-center">
      {luckyGroups.map((luckyData) => (
        <LuckyNumber
          key={luckyData.id_lucky_number}
          idLuckyNumber={luckyData.id_lucky_number}
          numbers={luckyData.number}
          stars={luckyData.star}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default LuckyNumbersContainer;
