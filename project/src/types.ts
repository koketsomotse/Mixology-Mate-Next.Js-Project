export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strAlcoholic: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
}

export interface Drink {
  id: string;
  name: string;
  alcoholContent: number;
  timestamp: number;
}

export interface Patron {
  id: string;
  name: string;
  bodyMass: number;
  drinks: Drink[];
}

export const alcoholContent: { [key: string]: number } = {
  'Gin': 40,
  'Vodka': 40,
  'Rum': 40,
  'Tequila': 40,
  'Whiskey': 40,
  'Bourbon': 40,
  'Brandy': 40,
  'Cognac': 40,
  'Liqueur': 20,
  'Wine': 12,
  'Beer': 5,
};