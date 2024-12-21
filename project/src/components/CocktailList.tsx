import React, { useState } from 'react';
import { Cocktail, Patron, Drink } from '../types';
import { calculateAlcoholContent } from '../utils';

interface CocktailListProps {
  cocktails: Cocktail[];
  patrons: Patron[];
  addDrinkToPatron: (patronId: string, drink: Drink, quantity: number) => void;
}

const CocktailList: React.FC<CocktailListProps> = ({ cocktails, patrons, addDrinkToPatron }) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [expandedCocktail, setExpandedCocktail] = useState<string | null>(null);

  if (cocktails.length === 0) {
    return <p className="text-center mt-8 text-gray-700 dark:text-gray-300">No cocktails found. Try a different search!</p>;
  }

  const handleAddDrink = (e: React.FormEvent, cocktail: Cocktail) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const patronId = (form.elements.namedItem('patron') as HTMLSelectElement).value;
    const quantity = quantities[cocktail.idDrink] || 1;
    
    if (patronId) {
      const drink: Drink = {
        id: cocktail.idDrink,
        name: cocktail.strDrink,
        alcoholContent: calculateAlcoholContent(cocktail),
        timestamp: Date.now(),
      };
      addDrinkToPatron(patronId, drink, quantity);
    }
  };

  const toggleIngredients = (cocktailId: string) => {
    setExpandedCocktail(expandedCocktail === cocktailId ? null : cocktailId);
  };

  const getIngredients = (cocktail: Cocktail) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail];
      const measure = cocktail[`strMeasure${i}` as keyof Cocktail];
      if (ingredient) {
        ingredients.push(`${measure || ''} ${ingredient}`);
      }
    }
    return ingredients;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {cocktails.map((cocktail) => (
        <div key={cocktail.idDrink} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{cocktail.strDrink}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-3">{cocktail.strInstructions}</p>
            <button
              onClick={() => toggleIngredients(cocktail.idDrink)}
              className="mb-2 px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
            >
              {expandedCocktail === cocktail.idDrink ? 'Hide Ingredients' : 'Show Ingredients'}
            </button>
            {expandedCocktail === cocktail.idDrink && (
              <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-400 text-sm">
                {getIngredients(cocktail).map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            )}
            <form onSubmit={(e) => handleAddDrink(e, cocktail)} className="mt-4">
              <div className="flex items-center mb-2">
                <input
                  type="number"
                  min="1"
                  value={quantities[cocktail.idDrink] || 1}
                  onChange={(e) => setQuantities({ ...quantities, [cocktail.idDrink]: parseInt(e.target.value) })}
                  className="w-16 p-1 text-sm border rounded mr-2 dark:bg-gray-700 dark:text-white"
                />
                <select
                  name="patron"
                  className="flex-grow p-1 text-sm border rounded dark:bg-gray-700 dark:text-white"
                  defaultValue=""
                >
                  <option value="" disabled>Select patron</option>
                  {patrons.map(patron => (
                    <option key={patron.id} value={patron.id}>
                      {patron.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-300"
              >
                Add Drink
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CocktailList;