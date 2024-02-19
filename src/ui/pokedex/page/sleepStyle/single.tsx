import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {SleepStyleBrief} from '@/components/shared/sleepStyle/components/brief';
import {SleepStyleUnlockRequirement} from '@/components/shared/sleepStyle/components/requirement';
import {useUpdateSleepdex} from '@/hooks/sleepdex/update';
import {getToggleButtonClass} from '@/styles/input';
import {SleepStyleCommon} from '@/types/game/sleepStyle';
import {PokemonSleepStyleRewardCell} from '@/ui/pokedex/page/sleepStyle/reward';
import {PokemonSleepStyleProps} from '@/ui/pokedex/page/sleepStyle/type';
import {isInSleepdex} from '@/utils/game/sleepdex';


type Props<TSleepStyle extends SleepStyleCommon> = PokemonSleepStyleProps & {
  sleepStyle: TSleepStyle,
};

export const PokemonSingleSleepStyle = <TSleepStyle extends SleepStyleCommon>({
  sleepStyle,
  ...props
}: Props<TSleepStyle>) => {
  const {
    pokemon,
    sleepdex,
    setSleepdex,
  } = props;
  const {
    style,
    spo,
    rewards,
  } = sleepStyle;

  const pokemonId = pokemon.id;

  const t = useTranslations('UI.Common');
  const t2 = useTranslations('Game.PokemonCandy');
  const updateSleepdex = useUpdateSleepdex({sleepdex, setSleepdex});

  return (
    <Flex direction="row" center className="gap-1.5 p-2.5" noFullWidth>
      <button className={clsx(
        'z-10 size-9 shrink-0 rounded-lg p-1.5',
        getToggleButtonClass(isInSleepdex({sleepdex, pokemonId, styleId: style}) ?? false),
      )} onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        updateSleepdex({pokemonId, styleId: style});
      }}>
        <BookmarkIcon/>
      </button>
      <Flex className="gap-1">
        <SleepStyleBrief
          sleepStyle={sleepStyle}
          className="justify-center"
        />
        <SleepStyleUnlockRequirement spo={spo} {...props}/>
        <Flex direction="row" center className="gap-1.5">
          <PokemonSleepStyleRewardCell
            iconSrc="/images/generic/research.png"
            iconAlt={t('ResearchExp')}
            value={rewards.exp}
            classImage="scale-125"
          />
          <PokemonSleepStyleRewardCell
            iconSrc="/images/generic/shard.png"
            iconAlt={t('DreamShards')}
            value={rewards.shards}
          />
          <PokemonSleepStyleRewardCell
            iconSrc={`/images/candy/${pokemon.candy.imageId}.png`}
            iconAlt={t2(pokemon.candy.i18nId)}
            value={rewards.candy}
            classImage="scale-150"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
