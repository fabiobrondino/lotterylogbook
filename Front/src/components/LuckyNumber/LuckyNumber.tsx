import { TrashIcon } from '@heroicons/react/20/solid';

type LuckyNumberProps = {
  idLuckyNumber: number; // Type pour l'identifiant du numéro porte-bonheur
  numbers: number[]; // Type pour le tableau des numéros
  stars: number[]; // Type pour le tableau des étoiles
  handleDelete: (idLuckyNumber: number) => void;
};

// Utilisation d'une déclaration de fonction
function LuckyNumber({
  idLuckyNumber,
  numbers,
  stars,
  handleDelete,
}: LuckyNumberProps) {
  const onDeleteClick = () => {
    handleDelete(idLuckyNumber); // Appeler handleDelete avec l'ID
  };

  return (
    <div className="border-4 p-8 w-5/6 lg:w-3/5 mb-4">
      <h2 className="text-xl md:text-2xl mb-4">Vos numéros porte-bonheur</h2>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(50px,_1fr))] w-full place-items-center gap-2">
        {numbers.map((number) => (
          <span
            key={number}
            className="rounded-full border-2 border-gray-300 p-4 w-10 h-10 flex items-center justify-center text-xl"
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
            className="border-2 border-gray-500 w-12 h-12 flex items-center justify-center text-xl relative bg-gray-300"
            style={{
              clipPath:
                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            }}
          >
            {star}
          </span>
        ))}
      </div>
      <button type="button" className="p-3" onClick={onDeleteClick}>
        <TrashIcon className="h-6" />
      </button>
    </div>
  );
}

export default LuckyNumber;
