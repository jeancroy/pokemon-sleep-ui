import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {isFilterIncludingSome} from '@/components/input/filter/utils/match';
import {Flex} from '@/components/layout/flex/common';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {pokeInBoxStateOfRate} from '@/ui/team/pokebox/content/pokeInBox/const';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {PokeboxDisplayType} from '@/ui/team/pokebox/viewer/type';
import {getTotalStrengthOfPokemonProduction} from '@/utils/game/producing/reducer/total/strength';
import {formatFloat} from '@/utils/number/format/regular';


export const PokeInBoxTableProduction = ({
  pokemon,
  rateOfPokemon,
  display,
}: PokeInBoxTableDetailsProps) => {
  const {berry, ingredient} = rateOfPokemon;
  const rateOfIngredients = Object.values(ingredient);

  const t = useTranslations('UI.Common');

  const strengthText = t('Strength');

  return (
    <>
      {
        isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['productionBerry'] satisfies PokeboxDisplayType[],
        }) &&
        <Flex direction="row" center noFullWidth className={clsx(
          'w-52 gap-1',
          pokemon.specialty === specialtyIdMap.berry && 'info-highlight',
        )}>
          <PokemonBerryIcon id={pokemon.berry.id}/>
          <div>
            x{formatFloat(berry.qty[pokeInBoxStateOfRate])}
          </div>
          <ColoredStrengthIcon alt={strengthText}/>
          <div>
            {formatFloat(berry.strength[pokeInBoxStateOfRate])}
          </div>
        </Flex>
      }
      {
        isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['productionIngredient'] satisfies PokeboxDisplayType[],
        }) &&
        <Flex direction="row" wrap center noFullWidth className={clsx(
          'w-72 gap-x-3 gap-y-0.5 p-0.5 text-xs',
          pokemon.specialty === specialtyIdMap.ingredient && 'info-highlight',
        )}>
          {rateOfIngredients.map(({id, qty, strength}) => (
            <Flex key={id} direction="row" noFullWidth className="items-center gap-0.5">
              <PokemonIngredientIcon id={id} dimension="size-3.5"/>
              <div>
                x{formatFloat(qty[pokeInBoxStateOfRate])}
              </div>
              <ColoredStrengthIcon alt={strengthText} dimension="size-3"/>
              <div>
                {formatFloat(strength[pokeInBoxStateOfRate])}
              </div>
            </Flex>
          ))}
        </Flex>
      }
      {
        isFilterIncludingSome({
          filter: display,
          filterKey: 'displayOfTable',
          ids: ['productionTotal'] satisfies PokeboxDisplayType[],
        }) &&
        <Flex direction="row" center noFullWidth className="w-32 gap-0.5 text-lg">
          <ColoredStrengthIcon dimension="size-6" alt={strengthText}/>
          <div>
            {formatFloat(getTotalStrengthOfPokemonProduction(rateOfPokemon))}
          </div>
        </Flex>
      }
      <Flex noFullWidth className="w-40">
        <PokemonProductionSplitFromPokemonRate
          rate={rateOfPokemon}
          state={pokeInBoxStateOfRate}
          specialty={pokemon.specialty}
        />
      </Flex>
    </>
  );
};
