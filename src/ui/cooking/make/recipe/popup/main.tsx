import React from 'react';

import FireIcon from '@heroicons/react/24/outline/FireIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {PopupProps} from '@/components/popup/type';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {IngredientInventoryInput} from '@/components/shared/input/ingredient/inventory';
import {MealMeta} from '@/components/shared/meal/meta';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {IngredientCounter} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {MealMakerPopupCommonProps} from '@/ui/cooking/make/recipe/popup/type';
import {MealMakerFilter} from '@/ui/cooking/make/type';
import {
  toIngredientCounterFromMealIngredient,
  toMealIngredientFromIngredientCounter,
} from '@/utils/game/cooking/meal/ingredients';
import {subtractIngredientCount} from '@/utils/game/ingredient/counter';
import {getMealFinalStrength} from '@/utils/game/meal/strength/final/recipe';
import {formatInt} from '@/utils/number/format/regular';


type Props = PopupProps & MealMakerPopupCommonProps & {
  meal: Meal,
  filter: MealMakerFilter,
};

export const MealMakerPopup = ({filter, calculatedUserConfig, status, onCook, ...props}: Props) => {
  const {meal, ingredientMap, setShow} = props;
  const {mapMultiplier, strengthMultiplier} = calculatedUserConfig.bonus;

  const t = useTranslations('UI.InPage.Cooking');
  const requiredIngredients = React.useMemo(() => toIngredientCounterFromMealIngredient(meal.ingredients), [meal]);
  const [usages, setUsages] = React.useState<IngredientCounter>(requiredIngredients);

  const {strengthFinal, bonus} = getMealFinalStrength({
    ...props,
    level: filter.recipeLevel[meal.id] ?? 1,
    filler: toMealIngredientFromIngredientCounter(subtractIngredientCount(usages, requiredIngredients)),
    mapMultiplier,
    strengthMultiplier: strengthMultiplier.cooking,
  });

  const isRequirementSatisfied = Object.values(subtractIngredientCount(requiredIngredients, usages))
    .every((count) => !count);

  return (
    <PopupCommon {...props}>
      <Flex className="gap-1 md:w-[60vw] lg:w-[70vw]">
        <Flex className="gap-1 lg:flex-row">
          <MealMeta meal={meal} className="bg-plate"/>
          <Flex className="bg-plate justify-center gap-2">
            <IngredientInventoryInput
              ingredientMap={ingredientMap}
              counter={usages}
              minCount={requiredIngredients}
              showIngredient={() => true}
              onValueChanged={({id}, count) => setUsages((original) => ({
                ...original,
                [id]: count,
              }))}
              onReset={() => setUsages(requiredIngredients)}
            />
            <HorizontalSplitter className="w-full"/>
            <Flex direction="row" className="justify-between text-xl">
              <Flex direction="row" noFullWidth className="items-center gap-1">
                <ColoredStrengthIcon dimension="size-6" alt={t('Energy')}/>
                <div>
                  {isRequirementSatisfied ? formatInt(strengthFinal) : '-'}
                </div>
              </Flex>
              {
                isRequirementSatisfied &&
                <div>+{(bonus.total * 100 - 100).toFixed(1)}%</div>
              }
            </Flex>
          </Flex>
        </Flex>
        <Flex className="items-end">
          <button
            disabled={!isRequirementSatisfied || status !== 'waiting'}
            onClick={async () => {
              await onCook(usages);
              setShow(false);
            }}
            className="enabled:button-clickable-bg disabled:button-disabled size-8 p-1"
          >
            <UserActionStatusIcon status={status} onWaitingOverride={<FireIcon/>}/>
          </button>
        </Flex>
      </Flex>
    </PopupCommon>
  );
};
