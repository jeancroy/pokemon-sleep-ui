import React from 'react';

import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIconOutline from '@heroicons/react/24/outline/SunIcon';
import SunIconSolid from '@heroicons/react/24/solid/SunIcon';

import {ExtraTastyTiming} from '@/types/game/cooking/extraTasty';
import {CookingMeal} from '@/types/userData/config/cooking/meal';


export const mealOfDayIcon: {[type in CookingMeal]: React.ReactNode} = {
  breakfast: <SunIconOutline/>,
  lunch: <SunIconSolid/>,
  dinner: <MoonIcon/>,
};

// Intentionally keeping this as integer for easier calculation regarding extra tasty rate
export const extraTastyBasePercent: {
  [timing in ExtraTastyTiming]: number
} = {
  weekday: 10,
  weekend: 30,
};

export const extraTastyMultiplier: {
  [timing in ExtraTastyTiming]: number
} = {
  weekday: 2,
  weekend: 3,
};

export const extraTastySkillPercentMax = 70;
