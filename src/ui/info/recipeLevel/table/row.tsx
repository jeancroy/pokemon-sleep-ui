import React from 'react';

import {RecipeLevelDataToShow} from '@/ui/info/recipeLevel/type';
import {formatFloat, formatInt} from '@/utils/number/format';


type Props = {
  entry: RecipeLevelDataToShow,
};

export const RecipeLevelDataRow = ({entry}: Props) => {
  const {level, bonus, toNext, totalRequired, accumulated} = entry;

  return (
    <tr>
      <td>{level}</td>
      <td>{formatFloat(1 + bonus)}x</td>
      <td>{formatInt(toNext)}</td>
      <td>{formatInt(totalRequired)}</td>
      <td>{formatInt(accumulated)}</td>
    </tr>
  );
};
