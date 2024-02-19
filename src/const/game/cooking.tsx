import React from 'react';

import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIconOutline from '@heroicons/react/24/outline/SunIcon';
import SunIconSolid from '@heroicons/react/24/solid/SunIcon';

import {UserCookingMeal} from '@/types/userData/settings/cooking/common';


export const mealOfDayIcon: {[type in UserCookingMeal]: React.ReactNode} = {
  breakfast: <SunIconOutline/>,
  lunch: <SunIconSolid/>,
  dinner: <MoonIcon/>,
};
