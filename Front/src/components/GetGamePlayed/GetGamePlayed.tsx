import { useState } from 'react';

function GetGamePlayed() {
  // État pour contrôler la visibilité
  const [showDetails, setShowDetails] = useState(false);

  // Fonction pour gérer le clic
  const handleToggle = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Toutes mes grilles jouées</h1>

      {/* Div principale avec la date de jeu */}
      <div
        className="cursor-pointer p-4 bg-blue-100 rounded-lg shadow-md transition 
                   hover:bg-blue-200 hover:shadow-lg hover:scale-105"
        onClick={handleToggle}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleToggle();
        }}
        role="button"
        tabIndex={0}
      >
        <h1 className="text-xl font-semibold">Date de jeu</h1>

        {/* Affichage conditionnel */}
        {showDetails && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <h1 className="text-lg font-medium">Date de référence</h1>
            <p className="mt-2 text-gray-700">Grille 1</p>
            <p className="text-gray-700">Grille 2</p>
            <p className="text-gray-700">Grille 3</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetGamePlayed;
