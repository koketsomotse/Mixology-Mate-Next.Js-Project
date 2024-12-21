import React, { useState } from 'react';
import { Patron } from '../types';
import { calculateAlcoholSaturation } from '../utils';

interface PatronManagerProps {
  patrons: Patron[];
  setPatrons: React.Dispatch<React.SetStateAction<Patron[]>>;
  removePatron: (id: string) => void;
  editPatron: (id: string, name: string, bodyMass: number) => void;
}

const PatronManager: React.FC<PatronManagerProps> = ({ patrons, setPatrons, removePatron, editPatron }) => {
  const [name, setName] = useState('');
  const [bodyMass, setBodyMass] = useState('');
  const [editingPatron, setEditingPatron] = useState<Patron | null>(null);
  const [error, setError] = useState('');

  const addPatron = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && bodyMass) {
      if (patrons.some(p => p.name.toLowerCase() === name.toLowerCase())) {
        setError('A patron with this name already exists.');
        return;
      }
      const newPatron: Patron = {
        id: Date.now().toString(),
        name,
        bodyMass: parseFloat(bodyMass),
        drinks: [],
      };
      setPatrons(prev => [...prev, newPatron]);
      setName('');
      setBodyMass('');
      setError('');
    } else {
      setError('Please fill in all fields.');
    }
  };

  const handleEdit = (patron: Patron) => {
    setEditingPatron(patron);
    setName(patron.name);
    setBodyMass(patron.bodyMass.toString());
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPatron && name && bodyMass) {
      if (patrons.some(p => p.name.toLowerCase() === name.toLowerCase() && p.id !== editingPatron.id)) {
        setError('A patron with this name already exists.');
        return;
      }
      editPatron(editingPatron.id, name, parseFloat(bodyMass));
      setEditingPatron(null);
      setName('');
      setBodyMass('');
      setError('');
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <form onSubmit={editingPatron ? saveEdit : addPatron} className="mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Patron Name"
          className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="number"
          value={bodyMass}
          onChange={(e) => setBodyMass(e.target.value)}
          placeholder="Body Mass (kg)"
          className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button type="submit" className="w-full p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-300">
          {editingPatron ? 'Save Changes' : 'Add Patron'}
        </button>
      </form>
      <div className="space-y-4">
        {patrons.map(patron => {
          const saturation = calculateAlcoholSaturation(patron);
          const textColor = saturation > 0.08 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';
          return (
            <div key={patron.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
              <h3 className={`text-lg font-semibold ${textColor}`}>{patron.name}</h3>
              <p className="dark:text-gray-300">Body Mass: {patron.bodyMass} kg</p>
              <p className="dark:text-gray-300">Drinks: {patron.drinks.length}</p>
              <p className={textColor}>Saturation: {saturation.toFixed(3)}</p>
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => handleEdit(patron)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => removePatron(patron.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatronManager;