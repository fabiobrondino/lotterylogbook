import React, { useEffect, useState } from 'react';
import createNextGame from '../../services/role_api';

function CreateNextGame() {
  const [nextDate, setNextDate] = useState<string>('');
  const [number, setNumber] = useState<number | ''>('');
  const [dayName, setDayName] = useState<string>('');

  useEffect(() => {
    const findNextDate = () => {
      const today = new Date();
      const nextTuesday = new Date(today);
      const nextFriday = new Date(today);

      // Trouver le prochain mardi
      nextTuesday.setDate(
        today.getDate() + ((2 - today.getDay() + 7) % 7) || 7
      );
      // Trouver le prochain vendredi
      nextFriday.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7) || 7);

      // Prendre la date la plus proche
      const next = nextTuesday < nextFriday ? nextTuesday : nextFriday;
      setNextDate(next.toISOString().split('T')[0]);

      // Déterminer si c'est mardi ou vendredi
      setDayName(next.getDay() === 2 ? 'Mardi' : 'Vendredi');
    };

    findNextDate();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Date:', nextDate);
    console.log('Nombre:', number);
    const dateObject = new Date(nextDate);
    createNextGame(dateObject, typeof number === 'number' ? number : 0);

    setNumber('');
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Prochain tirage du loto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nextDate" className="block mb-1">
            {dayName}:
          </label>
          <input
            type="date"
            id="nextDate"
            value={nextDate}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="number" className="block mb-1">
            Jackpot:
          </label>
          <input
            type="number"
            id="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value) || '')}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Soumettre
        </button>
      </form>
    </div>
  );
}

export default CreateNextGame;
