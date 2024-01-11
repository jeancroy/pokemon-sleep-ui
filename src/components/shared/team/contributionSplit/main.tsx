import React from 'react';

import {useTranslations} from 'next-intl';

import {ProgressBarMulti} from '@/components/progressBar/multi/main';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {TeamContributionData} from '@/components/shared/team/contributionSplit/type';
import {isNotNullish} from '@/utils/type';


type Props = {
  data: TeamContributionData[],
};

export const TeamContributionSplitIndicator = ({data}: Props) => {
  const t = useTranslations('Game.PokemonName');

  return (
    <ProgressBarMulti
      data={data.map(({pokemonId, production}) => {
        return {
          value: production,
          icon: (
            <div className="relative h-6 w-6">
              <PokemonImage
                pokemonId={pokemonId}
                image="icon"
                isShiny={false}
                className="relative h-6 w-6 rounded-full"
                alt={t(pokemonId.toString())}
              />
            </div>
          ),
        };
      }).filter(isNotNullish)}
    />
  );
};
