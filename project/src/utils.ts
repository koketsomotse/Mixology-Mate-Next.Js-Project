import { Cocktail, Patron, alcoholContent } from './types';

export const calculateAlcoholContent = (cocktail: Cocktail): number => {
  let totalAlcohol = 0;
  for (let i = 1; i <= 5; i++) {
    const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail] as string | undefined;
    const measure = cocktail[`strMeasure${i}` as keyof Cocktail] as string | undefined;
    
    if (ingredient && measure) {
      const alcoholPercentage = alcoholContent[ingredient] || 0;
      const volume = parseFloat(measure) || 0;
      totalAlcohol += (alcoholPercentage / 100) * volume;
    }
  }
  return totalAlcohol;
};

export const calculateAlcoholSaturation = (patron: Patron): number => {
  const currentTime = Date.now();
  const totalAlcohol = patron.drinks.reduce((acc, drink) => {
    const hoursSinceDrink = (currentTime - drink.timestamp) / (1000 * 60 * 60);
    const remainingAlcohol = drink.alcoholContent * Math.exp(-0.15 * hoursSinceDrink);
    return acc + remainingAlcohol;
  }, 0);

  return totalAlcohol / (patron.bodyMass * 0.68);
};