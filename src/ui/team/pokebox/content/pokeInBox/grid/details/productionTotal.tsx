import React from 'react';

import {useTranslations} from 'next-intl';

import {LoadingText} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {pokeInBoxStateOfRate} from '@/ui/team/pokebox/content/pokeInBox/const';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {useCalculatePokeInBoxProduction} from '@/ui/team/pokebox/content/pokeInBox/worker/production/hook';
import {getTotalEnergyOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';
import {formatFloat} from '@/utils/number/format/regular';


export const PokeInBoxGridProductionTotal = (props: PokeInBoxGridDetailsProps) => {
  const {pokemon} = props;

  const t = useTranslations('UI.InPage.Pokedex');
  const {loading, rate} = useCalculatePokeInBoxProduction(props);

  if (loading || !rate) {
    return <LoadingText dimension="size-4"/>;
  }

  return (
    <Flex noFullWidth className="justify-center gap-1">
      <Flex direction="row" className="items-center gap-0.5 p-0.5">
        <ColoredEnergyIcon dimension="size-5" alt={t('Stats.Energy.Name')}/>
        <div>
          {formatFloat(getTotalEnergyOfPokemonProducingRate(rate))}
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
