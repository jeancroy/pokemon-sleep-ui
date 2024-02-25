import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {LoadingText} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {pokeInBoxStateOfRate} from '@/ui/team/pokebox/content/pokeInBox/const';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {useCalculatePokeInBoxProduction} from '@/ui/team/pokebox/content/pokeInBox/worker/production/hook';
import {formatFloat} from '@/utils/number/format/regular';


export const PokeInBoxGridProductionIngredient = (props: PokeInBoxGridDetailsProps) => {
  const {pokemon} = props;

  const t = useTranslations('UI.InPage.Pokedex');
  const {loading, rate} = useCalculatePokeInBoxProduction(props);

  if (loading || !rate) {
    return <LoadingText dimension="size-4"/>;
  }

  const {ingredient} = rate;

  return (
    <Flex noFullWidth className={clsx(
      'w-fit gap-0.5 pr-1.5 text-sm',
      pokemon.specialty === specialtyIdMap.ingredient && 'info-highlight',
    )}>
      {Object.values(ingredient).map(({id, qty, strength}) => (
        <Flex key={id} direction="row" noFullWidth className="items-center gap-0.5">
          <PokemonIngredientIcon id={id}/>
          <div>
            x{formatFloat(qty[pokeInBoxStateOfRate])}
          </div>
          <ColoredStrengthIcon alt={t('Stats.Energy.Name')}/>
          <div>
            {formatFloat(strength[pokeInBoxStateOfRate])}
          </div>
        </Flex>
      ))}
    </Flex>
  );
};
