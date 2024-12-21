import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import CocktailList from './components/CocktailList';
import SearchBar from './components/SearchBar';
import PatronManager from './components/PatronManager';
import { Patron, Drink, Cocktail } from './types';
import Toast from './components/Toast';
import Modal from './components/Modal';
import { calculateAlcoholSaturation } from './utils';

function App() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [patrons, setPatrons] = useState<Patron[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [totalDrinks, setTotalDrinks] = useState<{ [key: string]: number }>({});
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', onConfirm: () => {} });
  const [totalDrinkCount, setTotalDrinkCount] = useState(0);

  useEffect(() => {
    const storedPatrons = localStorage.getItem('patrons');
    if (storedPatrons) {
      setPatrons(JSON.parse(storedPatrons));
    }
    const storedTheme = localStorage.getItem('theme');
    setIsDarkMode(storedTheme === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('patrons', JSON.stringify(patrons));
    const drinkTally = patrons.reduce((acc, patron) => {
      patron.drinks.forEach(drink => {
        acc[drink.name] = (acc[drink.name] || 0) + 1;
      });
      return acc;
    }, {} as { [key: string]: number });
    setTotalDrinks(drinkTally);
    setTotalDrinkCount(patrons.reduce((acc, patron) => acc + patron.drinks.length, 0));
  }, [patrons]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const searchCocktails = async (query: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      setCocktails(data.drinks || []);
    } catch (err) {
      setError('Failed to fetch cocktails. Please try again.');
      setCocktails([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: string) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const addDrinkToPatron = (patronId: string, drink: Drink, quantity: number) => {
    const patron = patrons.find(p => p.id === patronId);
    if (!patron) return;

    setPatrons(prevPatrons =>
      prevPatrons.map(patron => {
        if (patron.id === patronId) {
          const newDrinks = Array(quantity).fill(drink);
          const updatedPatron = { ...patron, drinks: [...patron.drinks, ...newDrinks] };
          const saturation = calculateAlcoholSaturation(updatedPatron);
          
          // First show the confirmation modal
          setModalContent({
            title: '🍸 Drink Added',
            message: `Added ${quantity} ${drink.name}(s) to ${patron.name}`,
            onConfirm: () => {
              setShowModal(false);
              // Check alcohol limit after confirmation
              if (saturation > 0.08) {
                setTimeout(() => {
                  setModalContent({
                    title: '⚠️ Alcohol Limit Warning',
                    message: `${patron.name} has exceeded the recommended alcohol limit! Current blood alcohol content: ${saturation.toFixed(3)}%. Please ensure patron safety.`,
                    onConfirm: () => setShowModal(false)
                  });
                  setShowModal(true);
                }, 500);
              }
            }
          });
          setShowModal(true);
          return updatedPatron;
        }
        return patron;
      })
    );
  };

  const removePatron = (id: string) => {
    setModalContent({
      title: 'Confirm Removal',
      message: `Are you sure you want to remove this patron?`,
      onConfirm: () => {
        setPatrons(prev => prev.filter(patron => patron.id !== id));
        setShowModal(false);
      }
    });
    setShowModal(true);
  };

  const editPatron = (id: string, name: string, bodyMass: number) => {
    setPatrons(prevPatrons =>
      prevPatrons.map(patron =>
        patron.id === id ? { ...patron, name, bodyMass } : patron
      )
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">🍸 Mixology Mate</h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-300"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </header>
          <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">🎉 Cocktail Search</h2>
              <SearchBar onSearch={searchCocktails} />
              {loading && <p className="text-center mt-4">Loading...</p>}
              {error && <p className="text-center mt-4 text-red-600">{error}</p>}
              <CocktailList cocktails={cocktails} patrons={patrons} addDrinkToPatron={addDrinkToPatron} />
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">👥 Patron Management</h2>
              <PatronManager
                patrons={patrons}
                setPatrons={setPatrons}
                removePatron={removePatron}
                editPatron={editPatron}
              />
              <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">📊 Statistics</h3>
                <p className="text-gray-600 dark:text-gray-400">Total Patrons: {patrons.length}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Total Drinks Served: {totalDrinkCount}</p>
                <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2">Drinks Breakdown:</h4>
                <ul className="list-disc pl-5">
                  {Object.entries(totalDrinks).map(([drink, count]) => (
                    <li key={drink} className="text-gray-600 dark:text-gray-400">
                      {drink}: {count}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>
      <Toast message={toast.message} type={toast.type} />
      <Modal
        show={showModal}
        title={modalContent.title}
        message={modalContent.message}
        onConfirm={modalContent.onConfirm}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default App;