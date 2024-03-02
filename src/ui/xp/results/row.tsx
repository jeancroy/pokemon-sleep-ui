import React from 'react';

import {clsx} from 'clsx';

import {handyCandyConversionRate, handyCandyItemId} from '@/const/game/xp';
import {PokemonExpCalculatorCandyCount} from '@/ui/xp/results/candyCount';
import {PokemonLevelUpRequirements} from '@/ui/xp/results/type';
import {PokemonExpCalculatorInput} from '@/ui/xp/type';
import {formatToAbbreviation} from '@/utils/number/format/abbreviation';
import {formatFloat3, formatInt} from '@/utils/number/format/regular';


type Props = {
  isKeyLevel: boolean,
  input: PokemonExpCalculatorInput,
  data: PokemonLevelUpRequirements,
};

export const PokemonExpCalculatorTableRow = ({isKeyLevel, input, data}: Props) => {
  const {showNonKeyLevel} = input;
  const {lv, xp, candy, shard} = data;

  if (!showNonKeyLevel && !isKeyLevel) {
    return null;
  }

  return (
    <tr className={clsx(isKeyLevel && 'bg-blink')}>
      <td>{lv}</td>
      <td>{formatInt(xp)}</td>
      <td>
        <PokemonExpCalculatorCandyCount count={candy}/>
      </td>
      <td>
        <PokemonExpCalculatorCandyCount count={candy / handyCandyConversionRate[handyCandyItemId.small]}/>
      </td>
      <td>
        <PokemonExpCalculatorCandyCount count={candy / handyCandyConversionRate[handyCandyItemId.medium]}/>
      </td>
      <td>
        <PokemonExpCalculatorCandyCount count={candy / handyCandyConversionRate[handyCandyItemId.large]}/>
      </td>
      <td className="whitespace-nowrap">
        {formatToAbbreviation({num: shard})}
      </td>
      <td>{formatFloat3(shard / xp)}</td>
    </tr>
  );
};
