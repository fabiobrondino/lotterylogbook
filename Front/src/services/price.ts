/* eslint-disable prettier/prettier */

// Tableau de prix basé sur le nombre de numéros et d'étoiles choisis
type PrixTable = {
  [key: number]: {
    [key: number]: number;
  };
};

const prixTable: PrixTable = {
  5: { 2: 2.50, 3: 7.50, 4: 15, 5: 25, 6: 37.50, 7: 52.50, 8: 70, 9: 90, 10: 112.50, 11: 137.50, 12: 165 },
  6: { 2: 15, 3: 45, 4: 90, 5: 150, 6: 225, 7: 315, 8: 420, 9: 540, 10: 675, 11: 825, 12: 990 },
  7: { 2: 52.50, 3: 157.50, 4: 315, 5: 525, 6: 787.50 },
  8: { 2: 140, 3: 420, 4: 840 },
  9: { 2: 315, 3: 945 },
  10: { 2: 630 },
};

// Fonction pour calculer le prix en fonction du tableau
function calculerPrixTicket(nombreNumeros: number, nombreEtoiles: number) {
  // Vérifier que le nombre de numéros et d’étoiles sont dans les limites autorisées
  if (
    nombreNumeros < 5 ||
    nombreNumeros > 10 ||
    nombreEtoiles < 2 ||
    nombreEtoiles > 12
  ) {
    throw new Error("Le ticket n'est pas valide.");
  }

  // Récupérer le prix correspondant depuis le tableau de prix
  return prixTable[nombreNumeros][nombreEtoiles];
}
const nombreNumeros = 5;
const nombreEtoiles = 2;

// Exemple d'utilisation
try {
  const prixTicket = calculerPrixTicket(nombreNumeros, nombreEtoiles); 
  console.log(`Le prix du ticket est de : ${prixTicket}€`);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error('An unknown error occurred');
  }
}

export default calculerPrixTicket;