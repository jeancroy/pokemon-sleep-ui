import React from 'react';

import AdjustmentsHorizontalIcon from '@heroicons/react/24/outline/AdjustmentsHorizontalIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {FilterIconInput} from '@/components/input/filter/preset/icon';
import {InputRow} from '@/components/input/filter/row';
import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonKeyLevelInput} from '@/components/shared/pokemon/level/input';
import {RatingBasisSelectionNullable} from '@/components/shared/pokemon/rating/basis/selection/nullable';
import {PokemonSortingPicker} from '@/components/shared/pokemon/sorter/picker';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {PremiumIcon} from '@/components/static/premium/icon';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {usePremiumRequiredToast} from '@/hooks/toast/main';
import {useUserActivation} from '@/hooks/userData/activation';
import {iconFilterButtonStyle, textFilterButtonStyle} from '@/styles/input';
import {inputSectionHeight, pokeboxInputDimension} from '@/ui/team/pokebox/const';
import {
  pokeboxDisplayTypeToI18nId,
  pokeboxDisplayTypeToImageSrc,
  pokeboxViewTypeToIcon,
} from '@/ui/team/pokebox/viewer/const';
import {
  pokeboxDisplayType,
  PokeboxViewerInputCommonProps,
  PokeboxViewType,
  pokeboxViewType,
} from '@/ui/team/pokebox/viewer/type';


export const PokeboxViewerConfig = ({session, pokemonList, ...props}: PokeboxViewerInputCommonProps) => {
  const {filter, setFilter} = props;

  const {fieldMetaMap} = useCommonServerData();

  const {isPremium} = useUserActivation(session);
  const collapsible = useCollapsibleControl();
  const {showPremiumRequiredToast} = usePremiumRequiredToast();
  const t = useTranslations('UI.InPage.Team.Box.DisplayType');
  const t2 = useTranslations('UI.Component.PokemonFilter');

  return (
    <Collapsible control={collapsible} classNameForHeight={inputSectionHeight} button={
      <Flex direction="row" center className="gap-0.5">
        <GenericPokeballIcon alt="Pokemon" dimension={pokeboxInputDimension}/>
        <AdjustmentsHorizontalIcon className={pokeboxInputDimension}/>
      </Flex>
    }>
      <Flex className="gap-1 pr-1">
        <PokemonSortingPicker
          sort={filter.sort}
          updateSort={(sort) => setFilter((original) => ({...original, sort}))}
          exclude={['friendshipPoint']}
        />
        <RatingBasisSelectionNullable
          current={filter.ratingBasis}
          onSelect={(ratingBasis) => setFilter((original) => ({...original, ratingBasis}))}
        />
        <SnorlaxFavoriteInput
          filterKey="snorlaxFavorite"
          fieldMetaMap={fieldMetaMap}
          pokemonList={pokemonList}
          {...props}
        />
        <FilterExpandedInput
          title={
            <Flex center>
              <EyeIcon className="size-6"/>
            </Flex>
          }
          ids={[...pokeboxViewType]}
          idToButton={(type: PokeboxViewType) => (
            <div className="size-6">
              {pokeboxViewTypeToIcon[type]}
            </div>
          )}
          className={iconFilterButtonStyle}
          {...getSingleSelectOnClickProps({
            filter,
            setFilter,
            filterKey: 'viewType',
            allowNull: false,
          })}
        />
        <PokemonKeyLevelInput
          {...getSingleSelectOnClickProps({
            filter,
            setFilter,
            filterKey: 'previewLevel',
            allowNull: false,
          })}
        />
        {
          filter.viewType === 'grid' &&
          <FilterIconInput
            title={
              <Flex center>
                <InformationCircleIcon className="size-6"/>
              </Flex>
            }
            ids={[...pokeboxDisplayType]}
            idToAlt={(type) => t(pokeboxDisplayTypeToI18nId[type])}
            idToImageSrc={(type) => pokeboxDisplayTypeToImageSrc[type]}
            idToImageClassName={(type) => clsx(type === filter.displayOfGrid ? 'invert-on-dark' : 'invert-on-light')}
            {...getSingleSelectOnClickProps({
              filter,
              setFilter,
              filterKey: 'displayOfGrid',
              allowNull: false,
            })}
          />
        }
        {
          filter.viewType === 'table' &&
          <FilterIconInput
            title={
              <Flex center>
                <InformationCircleIcon className="size-6"/>
              </Flex>
            }
            ids={[...pokeboxDisplayType]}
            idToAlt={(type) => t(pokeboxDisplayTypeToI18nId[type])}
            idToImageSrc={(type) => pokeboxDisplayTypeToImageSrc[type]}
            idToImageClassName={(type) => clsx(filter.displayOfTable[type] ? 'invert-on-dark' : 'invert-on-light')}
            {...getMultiSelectOnClickProps({
              filter,
              setFilter,
              filterKey: 'displayOfTable',
            })}
          />
        }
        <InputRow className="justify-end">
          <ToggleButton
            active={filter.previewFinalEvolution}
            onClick={() => {
              if (!isPremium) {
                showPremiumRequiredToast();
                return;
              }

              setFilter((original) => ({
                ...original,
                previewFinalEvolution: !original.previewFinalEvolution,
              }));
            }}
            className={clsx('group gap-1', textFilterButtonStyle)}
          >
            <PremiumIcon isPremium={isPremium}/>
            {t2('FinalEvolution')}
          </ToggleButton>
        </InputRow>
      </Flex>
    </Collapsible>
  );
};
