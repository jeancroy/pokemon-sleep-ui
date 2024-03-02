import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import {Session} from 'next-auth';

import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {MapFilter} from '@/components/shared/map/filter';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useUserActivation} from '@/hooks/userData/activation';
import {AnalysisComparisonFilter, AnalysisPageCommonProps} from '@/ui/analysis/page/type';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


type Props = FilterWithUpdaterProps<AnalysisComparisonFilter> & AnalysisPageCommonProps & {
  session: Session | null,
};

export const AnalysisPageInput = ({
  filter,
  setFilter,
  pokemon,
  pokemonList,
  session,
  sleepStyleMap,
}: Props) => {
  const {fieldMetaMap, ingredientChainMap} = useCommonServerData();

  const collapsible = useCollapsibleControl();
  const {isPremium} = useUserActivation(session);

  return (
    <Flex className="gap-1.5">
      <Collapsible appear control={collapsible} classNameForHeight="h-72 md:h-52" button={
        <Flex direction="row" center className="gap-0.5">
          <FunnelIcon className="size-6"/>
        </Flex>
      }>
        <Flex className="gap-1 pr-1">
          <MapFilter
            mapIds={toUnique(Object
              .values(sleepStyleMap)
              .flatMap((sleepStyle) => sleepStyle?.map(({mapId}) => mapId))
              .filter(isNotNullish)
              .sort((a, b) => a - b))}
            {...getMultiSelectOnClickProps({
              filter,
              setFilter,
              filterKey: 'mapId',
            })}
          />
          <PokemonFilter
            filter={filter}
            setFilter={setFilter}
            pokemonList={pokemonList}
            skipLevelInput
          />
          <SnorlaxFavoriteInput
            filter={filter}
            setFilter={setFilter}
            filterKey="snorlaxFavorite"
            pokemonList={pokemonList}
            fieldMetaMap={fieldMetaMap}
          />
        </Flex>
      </Collapsible>
      <PokemonIngredientPicker
        chain={ingredientChainMap[pokemon.ingredientChain]}
        ingredients={filter.ingredients}
        onSelect={(updated, ingredientLevel) => setFilter((filter) => ({
          ...filter,
          ingredients: {
            ...filter.ingredients,
            [ingredientLevel]: updated,
          },
        } satisfies AnalysisComparisonFilter))}
      />
      <PokemonIndividualParamsPicker
        filter={filter}
        setFilter={setFilter}
        isPremium={isPremium}
        className="bg-plate"
      />
    </Flex>
  );
};
