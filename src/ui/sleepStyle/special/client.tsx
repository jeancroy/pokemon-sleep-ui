'use client';
import React from 'react';

import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {SleepdexSection} from '@/components/shared/sleepdex/section/main';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useUpdateSleepdex} from '@/hooks/sleepdex/update';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {SleepStyleCommon} from '@/types/game/sleepStyle';
import {SleepStyleSpecialServerDataProps} from '@/ui/sleepStyle/special/type';
import {getAvailableSleepStylesFromSpecial} from '@/utils/game/sleepdex';
import {isNotNullish} from '@/utils/type';


export const SleepStyleSpecialClient = ({
  sleepdexMap,
  sleepStyleSpecialMap,
}: SleepStyleSpecialServerDataProps) => {
  const [sleepdex, setSleepdex] = React.useState(sleepdexMap);

  const serverData = useCommonServerData();
  const {pokedexMap} = serverData;

  const t = useTranslations('UI.SleepStyle');
  const updateSleepdex = useUpdateSleepdex({sleepdex, setSleepdex});
  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const {
    pokemonIdWithIncenseOnly,
    pokemonIdWithUnreleased,
  } = React.useMemo(() => {
    const pokemonIdWithIncenseOnly = new Set<PokemonId>();
    const pokemonIdWithUnreleased = new Set<PokemonId>();

    for (const sleepStyles of Object.values(sleepStyleSpecialMap).filter(isNotNullish)) {
      for (const {pokemonId, unreleased} of sleepStyles) {
        if (!unreleased) {
          pokemonIdWithIncenseOnly.add(pokemonId);
        } else {
          pokemonIdWithUnreleased.add(pokemonId);
        }
      }
    }

    return {
      pokemonIdWithIncenseOnly,
      pokemonIdWithUnreleased,
    };
  }, [sleepStyleSpecialMap]);
  const getSleepStylesFromPokemon = React.useCallback((pokemon: PokemonInfo): SleepStyleCommon[] => (
    getAvailableSleepStylesFromSpecial({
      sleepStyles: sleepStyleSpecialMap[pokemon.id],
      extractor: (sleepStyle) => sleepStyle,
      getKey: ({style}) => style,
    })
  ), [sleepStyleSpecialMap]);

  return (
    <Flex className="gap-1">
      <PokemonLinkPopup state={state} setState={setState}/>
      <SleepdexSection
        title={
          <Flex direction="row" noFullWidth className="items-center gap-1">
            <GenericIconLarger src="/images/generic/incense.png" alt={t('IncenseOnly')}/>
            <div>{t('IncenseOnly')}</div>
          </Flex>
        }
        sleepdex={sleepdex}
        updateSleepdex={updateSleepdex}
        showPokemon={showPokemon}
        pokemonListToShow={[...pokemonIdWithIncenseOnly]
          .map((pokemonId) => pokedexMap[pokemonId]).filter(isNotNullish)}
        getSleepStylesFromPokemon={getSleepStylesFromPokemon}
        sleepStyleDependencies={[sleepStyleSpecialMap]}
      />
      <SleepdexSection
        title={
          <Flex direction="row" noFullWidth className="items-center gap-1">
            <LockClosedIcon className="size-6"/>
            <div>{t('Unreleased')}</div>
          </Flex>
        }
        sleepdex={sleepdex}
        updateSleepdex={updateSleepdex}
        showPokemon={showPokemon}
        pokemonListToShow={[...pokemonIdWithUnreleased]
          .map((pokemonId) => pokedexMap[pokemonId]).filter(isNotNullish)}
        getSleepStylesFromPokemon={getSleepStylesFromPokemon}
        sleepStyleDependencies={[sleepStyleSpecialMap]}
        hideButtons
      />
    </Flex>
  );
};
