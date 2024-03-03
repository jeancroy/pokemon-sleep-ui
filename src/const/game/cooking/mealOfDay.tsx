import React from 'react';

import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIconOutline from '@heroicons/react/24/outline/SunIcon';
import SunIconSolid from '@heroicons/react/24/solid/SunIcon';

import {CookingMeal} from '@/types/userData/config/cooking/meal';


export const mealOfDayIcon: {[type in CookingMeal]: React.ReactNode} = {
  breakfast: <SunIconOutline/>,
  lunch: <SunIconSolid/>,
  dinner: <MoonIcon/>,
};
