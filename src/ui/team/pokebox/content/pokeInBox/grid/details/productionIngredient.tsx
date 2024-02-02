import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {LoadingText} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {pokeInBoxStateOfRate} from '@/ui/team/pokebox/content/pokeInBox/const';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {useCalculatePokeInBoxProduction} from '@/ui/team/pokebox/content/pokeInBox/worker/production/hook';
import {formatFloat} from '@/utils/number/format';


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
      {Object.values(ingredient).map(({id, quantity, energy}) => (
        <Flex key={id} direction="row" noFullWidth className="items-center gap-0.5">
          <PokemonIngredientIcon id={id}/>
          <div>
            x{formatFloat(quantity[pokeInBoxStateOfRate])}
          </div>
          <ColoredEnergyIcon alt={t('Stats.Energy.Name')}/>
          <div>
            {formatFloat(energy[pokeInBoxStateOfRate])}
          </div>
        </Flex>
      ))}
    </Flex>
  );
};
