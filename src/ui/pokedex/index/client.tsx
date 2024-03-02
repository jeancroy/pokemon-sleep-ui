'use client';
import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Grid} from '@/components/layout/grid';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {usePokedexCalc} from '@/ui/pokedex/common/calc/main';
import {usePokedexFilter} from '@/ui/pokedex/index/filter';
import {PokedexInput} from '@/ui/pokedex/index/input/main';
import {PokedexLink} from '@/ui/pokedex/index/link';
import {PokedexDataProps} from '@/ui/pokedex/index/type';
import {getPokemonProducingParams} from '@/utils/game/producing/params';


export const PokedexClient = (props: PokedexDataProps) => {
  const {
    pokedexData,
    preloaded,
  } = props;

  const serverData = useCommonServerData();
  const {pokemonProducingParamsMap} = serverData;

  const {data: session} = useSession();
  const [loading, setLoading] = React.useState(false);
  const {filter, setFilter, isIncluded} = usePokedexFilter({
    data: pokedexData,
    preloadedDisplay: preloaded.display,
    ...serverData,
  });

  const {
    calculatedConfigBundle,
    result,
    count,
  } = usePokedexCalc({
    session,
    pokemonList: pokedexData,
    filter,
    isPokemonIncluded: isIncluded,
    setLoading,
    ...serverData,
  });

  useAutoUpload({
    opts: {
      type: 'pokedex',
      data: {
        level: filter.level,
        sort: filter.sort,
        display: filter.display,
        subSkill: filter.subSkill,
        nature: filter.nature,
        version: filter.version,
      },
    },
    triggerDeps: [
      filter.level,
      filter.sort,
      filter.display,
      filter.subSkill,
      filter.nature,
    ],
  });

  return (
    <>
      <PokedexInput filter={filter} setFilter={setFilter} {...props}/>
      <CompletionResultUI
        completed={count.selected}
        total={count.total}
        className="self-end"
      />
      <AdsUnit hideIfNotBlocked/>
      <LazyLoad loading={loading}>
        <Grid className={clsx(
          filter.display === 'mainSkill' ?
            // Main skill is the only content with long words that's unable to truncate,
            // therefore the column breakpoints should be specialized
            // to avoid making all the other display type having a lot of spaces
            'grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5' :
            'grid-cols-2 gap-1.5 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 2xl:grid-cols-6',
        )}>
          {result.map(({source}) => {
            const ingredientIds = source.ingredients.map(({id}) => id);
            const pokemonId = source.pokemon.id;
            const key = `${pokemonId}-${ingredientIds.join('-')}`;

            // --- Any filtering condition should **NOT** go here as it makes the result count incorrect
            // Filter it at the creation of `sortedFilteredData` instead (`useSortingWorker.data`)

            return (
              <PokedexLink
                key={key}
                pokemon={source.pokemon}
                pokemonProducingParams={getPokemonProducingParams({
                  pokemonId,
                  pokemonProducingParamsMap,
                })}
                display={filter.display}
                level={filter.level}
                subSkill={filter.subSkill}
                nature={filter.nature}
                mainSkillLevel={filter.mainSkillLevel}
                ingredients={source.ingredients}
                snorlaxFavorite={filter.snorlaxFavorite}
                calculatedConfigBundle={calculatedConfigBundle}
                {...props}
              />
            );
          })}
        </Grid>
      </LazyLoad>
    </>
  );
};
