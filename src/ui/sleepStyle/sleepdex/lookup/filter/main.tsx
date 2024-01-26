import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import {clsx} from 'clsx';
import {Session} from 'next-auth';
import {useTranslations} from 'next-intl';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {InputRow} from '@/components/input/filter/row';
import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {MapFilter} from '@/components/shared/map/filter';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {DrowsyPowerMultiplierInput} from '@/components/shared/sleepStyle/input/drowsyPowerMultiplier';
import {DrowsyPowerRequirementInput} from '@/components/shared/sleepStyle/input/drowsyPowerRequirement';
import {textFilterButtonStyle} from '@/styles/input';
import {SleepdexLookupFilter, sleepdexLookupSortType} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';
import {SleepdexLookupSortTypeUi} from '@/ui/sleepStyle/sleepdex/lookup/sort/main';
import {SleepdexLookupServerDataProps} from '@/ui/sleepStyle/sleepdex/lookup/type';
import {toPokemonList} from '@/utils/game/pokemon/utils';


type Props = SleepdexLookupServerDataProps & FilterWithUpdaterProps<SleepdexLookupFilter> & {
  isPremium: boolean,
  session: Session | null,
};

export const SleepdexLookupInput = ({
  isPremium,
  session,
  ...props
}: Props) => {
  const {
    pokedexMap,
    eventDrowsyPowerMultiplierData,
    mapIds,
    filter,
    setFilter,
  } = props;
  const {
    drowsyPowerMultiplier,
    drowsyPowerRequirement,
    incenseOnly,
  } = filter;

  const collapsible = useCollapsible();
  const t = useTranslations('UI.SleepStyle');

  return (
    <Collapsible state={collapsible} classNameForHeight="h-96 md:h-72" button={
      <Flex direction="row" center className="gap-0.5">
        <FunnelIcon className="size-6"/>
      </Flex>
    }>
      <Flex className="gap-1 pr-1">
        <MapFilter
          premiumOnly
          session={session}
          mapIds={mapIds}
          {...getSingleSelectOnClickProps({
            filter,
            setFilter,
            filterKey: 'mapId',
            allowNull: true,
          })}
        />
        <DrowsyPowerMultiplierInput
          premiumOnly
          session={session}
          multiplier={drowsyPowerMultiplier}
          setMultiplier={(drowsyPowerMultiplier) => setFilter((original) => ({
            ...original,
            drowsyPowerMultiplier,
          }))}
          maxMultiplier={eventDrowsyPowerMultiplierData.max}
        />
        <DrowsyPowerRequirementInput
          premiumOnly
          session={session}
          drowsyPowerRequirement={drowsyPowerRequirement}
          setDrowsyPowerRequirement={(drowsyPowerRequirement) => setFilter((original) => ({
            ...original,
            drowsyPowerRequirement,
          }))}
          step={drowsyPowerMultiplier}
        />
        <PokemonFilter
          pokemonList={toPokemonList(pokedexMap)}
          {...props}
        />
        <FilterExpandedInput
          title={
            <Flex center>
              <InformationCircleIcon className="size-6"/>
            </Flex>
          }
          idToButton={(display) => (
            <SleepdexLookupSortTypeUi isPremium={isPremium} sort={display}/>
          )}
          ids={[...sleepdexLookupSortType]}
          {...getSingleSelectOnClickProps({
            filter,
            setFilter,
            filterKey: 'display',
            allowNull: false,
          })}
          className={textFilterButtonStyle}
        />
        <FilterExpandedInput
          title={
            <Flex center>
              <Bars3BottomLeftIcon className="size-6"/>
            </Flex>
          }
          idToButton={(sort) => (
            <SleepdexLookupSortTypeUi isPremium={isPremium} sort={sort}/>
          )}
          ids={[...sleepdexLookupSortType]}
          {...getSingleSelectOnClickProps({
            filter,
            setFilter,
            filterKey: 'sort',
            allowNull: false,
          })}
          className={textFilterButtonStyle}
        />
        <InputRow className="justify-end">
          <ToggleButton
            active={incenseOnly}
            onClick={() => setFilter(({incenseOnly, ...original}) => ({
              ...original,
              incenseOnly: !incenseOnly,
            } satisfies SleepdexLookupFilter))}
            className={clsx('group gap-1', textFilterButtonStyle)}
          >
            {t('IncenseOnly')}
          </ToggleButton>
        </InputRow>
      </Flex>
    </Collapsible>
  );
};
