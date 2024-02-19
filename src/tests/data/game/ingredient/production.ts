import {IngredientProduction} from '@/types/game/pokemon/ingredient';


export const testIngredientProductions: {[id in string]: IngredientProduction[]} = {
  axx: [
    {id: 13, qty: 2},
  ],
  aax: [
    {id: 13, qty: 2}, {id: 13, qty: 5},
  ],
  abx: [
    {id: 13, qty: 2}, {id: 5, qty: 8},
  ],
  aaa: [
    {id: 13, qty: 2}, {id: 13, qty: 5}, {id: 13, qty: 7},
  ],
  aab: [
    {id: 13, qty: 2}, {id: 13, qty: 5}, {id: 5, qty: 12},
  ],
  abc: [
    {id: 13, qty: 2}, {id: 5, qty: 8}, {id: 2, qty: 7},
  ],
};
