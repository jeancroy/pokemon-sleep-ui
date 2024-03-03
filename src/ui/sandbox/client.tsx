'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {MainSkillIcon} from '@/components/shared/icon/mainSkill/main';
import {NumberInputRequired} from '@/components/shared/input/number/required/main';
import {mealOfDayIcon} from '@/const/game/cooking';
import {cookingMeals} from '@/types/userData/config/cooking/meal';
import {getExtraTastyInfo} from '@/utils/game/cooking/extraTasty/main';
import {
  getExtraTastySkillBoostPercentByMeal,
  GetExtraTastySkillBoostPercentByMealOpts,
} from '@/utils/game/cooking/extraTasty/skillBoosts';
import {formatFloat} from '@/utils/number/format/regular';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const SandboxClient = () => {
  const [state, setState] = React.useState<GetExtraTastySkillBoostPercentByMealOpts>({
    triggersPerMeal: {
      breakfast: 1,
      lunch: 1,
      dinner: 1,
    },
    percentBoostPerSkill: 10,
  });

  const {triggersPerMeal, percentBoostPerSkill} = state;

  const extraTastyInfo = getExtraTastyInfo({
    skillBoostPercentByMeal: getExtraTastySkillBoostPercentByMeal(state),
  });

  return (
    <Flex className="gap-2 md:flex-row">
      <Flex center className="gap-2">
        {cookingMeals.map((mealOfDay) => (
          <Flex direction="row" key={mealOfDay} center className="items-center gap-1">
            <div className="size-6 shrink-0">
              {mealOfDayIcon[mealOfDay]}
            </div>
            <NumberInputRequired
              text={null}
              value={triggersPerMeal[mealOfDay]}
              valueType="float"
              setValue={(value) => setState((original) => cloneMerge(
                original,
                {triggersPerMeal: {[mealOfDay]: value}},
              ))}
            />
          </Flex>
        ))}
        <Flex direction="row" center className="gap-1">
          <MainSkillIcon id={14} dimension="size-6"/>
          <NumberInputRequired
            text="Extra Tasty % per Stack"
            value={percentBoostPerSkill}
            setValue={(value) => setState((original) => cloneMerge(
              original,
              {percentBoostPerSkill: value},
            ))}
          />
        </Flex>
      </Flex>
      <Flex className="info-section">
        <div>
          Expected Extra Tasty rate for each meal: {formatFloat(extraTastyInfo.overall.rate * 100)}%
        </div>
        <div>
          Expected Extra Tasty gain for each meal: {extraTastyInfo.overall.multiplier.toFixed(4)}x
        </div>
      </Flex>
    </Flex>
  );
};
