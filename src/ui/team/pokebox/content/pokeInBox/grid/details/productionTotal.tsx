import React from 'react';

import {useTranslations} from 'next-intl';

import {LoadingText} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {pokeInBoxStateOfRate} from '@/ui/team/pokebox/content/pokeInBox/const';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {useCalculatePokeInBoxProduction} from '@/ui/team/pokebox/content/pokeInBox/worker/production/hook';
import {getTotalStrengthOfPokemonProduction} from '@/utils/game/producing/reducer/total/strength';
import {formatFloat} from '@/utils/number/format/regular';


export const PokeInBoxGridProductionTotal = (props: PokeInBoxGridDetailsProps) => {
  const {pokemon} = props;

  const t = useTranslations('UI.Common');
  const {loading, rate} = useCalculatePokeInBoxProduction(props);

  if (loading || !rate) {
    return <LoadingText dimension="size-4"/>;
  }

  return (
    <Flex noFullWidth className="justify-center gap-1">
      <Flex direction="row" className="items-center gap-0.5 p-0.5">
        <ColoredStrengthIcon dimension="size-5" alt={t('Strength')}/>
        <div>
          {formatFloat(getTotalStrengthOfPokemonProduction(rate))}
        </div>
      </Flex>
      <Flex noFullWidth className="w-3/4">
        <PokemonProductionSplitFromPokemonRate
          rate={rate}
          state={pokeInBoxStateOfRate}
          specialty={pokemon.specialty}
        />
      </Flex>
    </Flex>
  );
};
