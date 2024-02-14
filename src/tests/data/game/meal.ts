import {Meal, MealId} from '@/types/game/meal/main';


export const testMealData: {[id in MealId]: Meal} = {
  1003: {
    type: 1,
    id: 1003,
    ingredients: [
      {id: 12, quantity: 10},
      {id: 6, quantity: 5},
    ],
    ingredientCount: 15,
    baseStrength: 1943,
  },
  1007: {
    type: 1,
    id: 1007,
    ingredients: [
      {id: 9, quantity: 12},
      {id: 5, quantity: 11},
      {id: 3, quantity: 8},
      {id: 4, quantity: 4},
    ],
    ingredientCount: 35,
    baseStrength: 4523,
  },
  3006: {
    type: 3,
    id: 3006,
    ingredients: [
      {id: 3, quantity: 15},
      {id: 5, quantity: 10},
      {id: 8, quantity: 10},
      {id: 9, quantity: 20},
    ],
    ingredientCount: 55,
    baseStrength: 7594,
  },
};
