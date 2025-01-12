import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {GenericMainSkillIcon} from '@/components/shared/icon/mainSkill/generic';
import {MainSkillIcon} from '@/components/shared/icon/mainSkill/main';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonProductionSingle} from '@/components/shared/pokemon/production/single/main';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {PokemonDetailedProductionLayout} from '@/components/shared/pokemon/production/stats/tabs/content/common/item';
import {PokemonDetailedProductionProps} from '@/components/shared/pokemon/production/stats/type';
import {ProductionUI} from '@/components/shared/production/rate/main';
import {applyMultiplierTargets} from '@/types/game/producing/apply';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {applyMultiplierToPokemonRate} from '@/utils/game/producing/apply/common';
import {getFrequencyOfStateFromPokemonRate} from '@/utils/game/producing/frequency';
import {getTotalPokemonProduction} from '@/utils/game/producing/reducer/total/common';


type Props = PokemonDetailedProductionProps & {
  title: React.ReactNode,
} & ({
  state: ProducingStateCalculated,
  targetMultiplier?: never,
} | {
  state: 'base',
  targetMultiplier: number,
});

export const PokemonDetailedProductionOfState = ({
  rate,
  specialty,
  title,
  state,
  targetMultiplier,
}: Props) => {
  if (targetMultiplier) {
    rate = applyMultiplierToPokemonRate({
      rate,
      target: [...applyMultiplierTargets],
      multiplier: {original: 1, target: targetMultiplier},
    });
  }

  const {berry, ingredient, skill} = rate;

  const t = useTranslations('UI.Pokemon.Info');

  return (
    <Flex className="bg-plate gap-1">
      <Flex className="text-lg">
        {title}
      </Flex>
      <Flex className="button-bg rounded-lg p-1">
        <PokemonFrequency
          normalText
          frequency={getFrequencyOfStateFromPokemonRate({rate, state})}
        />
      </Flex>
      <Flex className="gap-1 md:flex-row">
        <PokemonDetailedProductionLayout icon={<GenericBerryIcon alt={t('Berry')} noWrap/>}>
          <PokemonProductionSingle
            key={berry.id}
            rate={berry}
            state={state}
            getIcon={(dimension) => <PokemonBerryIcon id={berry.id} dimension={dimension}/>}
            display="item"
          />
        </PokemonDetailedProductionLayout>
        <PokemonDetailedProductionLayout
          icon={<GenericIngredientIcon alt={t('Ingredient')} dimension="size-10"/>}
        >
          <Flex className="gap-1.5">
            {Object.values(ingredient).map((rate) => (
              <PokemonProductionSingle
                key={rate.id}
                rate={rate}
                state={state}
                getIcon={(dimension) => <PokemonIngredientIcon id={rate.id} dimension={dimension}/>}
                display="item"
              />
            ))}
          </Flex>
        </PokemonDetailedProductionLayout>
        <PokemonDetailedProductionLayout icon={<GenericMainSkillIcon alt={t('MainSkill')} noWrap/>}>
          <PokemonProductionSingle
            key={skill.id}
            rate={skill}
            state={state}
            getIcon={(dimension) => <MainSkillIcon id={skill.id} dimension={dimension}/>}
            display="item"
          />
        </PokemonDetailedProductionLayout>
      </Flex>
      <Flex className="items-end gap-1 sm:flex-row">
        <PokemonProductionSplitFromPokemonRate rate={rate} state={state} specialty={specialty}/>
        <ProductionUI
          className="button-bg rounded-lg px-2"
          rate={getTotalPokemonProduction({rate, state})}
          hideQuantity
          normalSize
        />
      </Flex>
    </Flex>
  );
};
