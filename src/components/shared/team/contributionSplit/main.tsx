import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ProgressBarMulti} from '@/components/progressBar/multi/main';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {TeamContributionData} from '@/components/shared/team/contributionSplit/type';
import {formatFloat1} from '@/utils/number/format';


type Props = {
  data: TeamContributionData[],
};

export const TeamContributionSplitIndicator = ({data}: Props) => {
  const t = useTranslations('Game.PokemonName');

  return (
    <ProgressBarMulti
      className="gap-0.5"
      data={data.map((entry) => ({
        value: entry.production,
        data: entry,
      }))}
      renderSummary={({percent, data}) => (
        <Flex direction="row" noFullWidth center className="gap-1.5">
          <div className="relative size-6">
            <PokemonImage
              pokemonId={data.pokemonId}
              image={{type: 'default', image: 'icon'}}
              isShiny={false}
              className="relative size-6 rounded-full"
              alt={t(data.pokemonId.toString())}
            />
          </div>
          <span className="text-sm">{formatFloat1(percent)}%</span>
        </Flex>
      )}
    />
  );
};
