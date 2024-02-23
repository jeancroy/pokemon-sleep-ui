import {IngredientIconMark} from '@/components/shared/ingredient/icons/type';


export const ingredientIconMarkToStyle: {[mark in IngredientIconMark]: string} = {
  green: 'text-safe',
  red: 'text-danger',
};
