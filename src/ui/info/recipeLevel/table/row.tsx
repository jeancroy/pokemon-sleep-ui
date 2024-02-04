import React from 'react';

import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {formatFloat, formatInt} from '@/utils/number/format';


type Props = {
  data: RecipeLevelData,
};

export const RecipeLevelDataRow = ({data}: Props) => {
  const {level, bonus, toNext, accumulated} = data;

  return (
    <tr>
      <td>{level}</td>
      <td>{formatFloat(1 + bonus)}x</td>
      <td>{formatInt(toNext)}</td>
      <td>{formatInt(accumulated)}</td>
    </tr>
  );
};
