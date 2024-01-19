import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/preset/icon';
import {InputRow} from '@/components/input/filter/row';
import {FilterInclusionMap} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {PokemonFilterTitle} from '@/components/shared/pokemon/filter/title';
import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {PokemonSortingPicker} from '@/components/shared/pokemon/sorter/picker';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {textFilterButtonStyle} from '@/styles/input';
import {IngredientId} from '@/types/game/ingredient';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {pokedexTierListBasis, PokedexTierListInput, PokedexTierListInputFilter} from '@/ui/pokedex/tier/input/type';
import {PokedexTierListDataProps} from '@/ui/pokedex/tier/type';
import {isNotNullish, KeysOfType} from '@/utils/type';


type Props = PokedexTierListDataProps & {
  input: PokedexTierListInput,
  setInput: ReactStateUpdaterFromOriginal<PokedexTierListInput>,
  isPremium: boolean,
};

export const PokedexTierListInputUI = ({
  pokemonList,
  pokemonMaxLevel,
  ingredientMap,
  subSkillMap,
  mapMeta,
  input,
  setInput,
  isPremium,
}: Props) => {
  const {filter, showDetails} = input;
  const setFilter: ReactStateUpdaterFromOriginal<PokedexTierListInputFilter> = (getUpdated) => (
    setInput(({filter, ...original}) => ({
      ...original,
      filter: getUpdated(filter),
    }))
  );

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex.Tier');

  return (
    <Flex className="gap-1">
      <SnorlaxFavoriteInput
        filterKey="snorlaxFavorite"
        pokemonList={pokemonList}
        mapMeta={mapMeta}
        filter={filter}
        setFilter={setFilter}
      />
      <FilterIconInput
        title={<PokemonFilterTitle type="ingredient"/>}
        idToAlt={(id) => t(`Food.${id}`)}
        idToImageSrc={(id) => `/images/ingredient/${id}.png`}
        ids={Object.values(ingredientMap).filter(isNotNullish).map(({id}) => id).sort((a, b) => a - b)}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'ingredient' as KeysOfType<PokedexTierListInputFilter, FilterInclusionMap<IngredientId>>,
        })}
      />
      <PokemonSortingPicker
        sort={filter.sort}
        updateSort={(sort) => setFilter((original) => ({
          ...original,
          sort,
          display: sort,
        } satisfies PokedexTierListInputFilter))}
        options={[...pokedexTierListBasis]}
      />
      <PokemonIndividualParamsPicker
        filter={filter}
        setFilter={setFilter}
        maxLevel={pokemonMaxLevel}
        isPremium={isPremium}
        subSkillMap={subSkillMap}
        className="bg-plate"
      />
      <InputRow className="justify-end">
        <ToggleButton
          active={showDetails}
          onClick={() => setInput((original) => ({
            ...original,
            showDetails: !showDetails,
          } satisfies PokedexTierListInput))}
          className={textFilterButtonStyle}
        >
          <Flex direction="row" noFullWidth className="gap-1">
            <div className="h-5 w-5">
              {showDetails ? <EyeIcon/> : <EyeSlashIcon/>}
            </div>
            <div>
              {t2('Details')}
            </div>
          </Flex>
        </ToggleButton>
      </InputRow>
    </Flex>
  );
};
