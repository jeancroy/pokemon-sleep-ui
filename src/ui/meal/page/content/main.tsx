import React from 'react';

import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {defaultPokemonIndividualParams} from '@/const/game/pokemon';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {MealContentCoverage} from '@/ui/meal/page/content/coverage/main';
import {MealContentIngredientProduction} from '@/ui/meal/page/content/production/main';
import {MealPageContentCommonProps} from '@/ui/meal/page/content/type';
import {MealCommonProps} from '@/ui/meal/page/type';
import {getEffectiveIngredientLevel} from '@/utils/game/ingredient/level';


export const MealPageContent = (props: MealCommonProps) => {
  const {isPremium} = props;

  const [input, setInput] = React.useState<PokemonIndividualParams>(
    defaultPokemonIndividualParams,
  );

  const {level} = input;
  const ingredientLevel = React.useMemo(() => getEffectiveIngredientLevel(level), [level]);

  const commonProps: MealPageContentCommonProps = {
    ingredientLevel,
    input,
    setInput,
  };

  return (
    <>
      <PokemonIndividualParamsPicker
        filter={input}
        setFilter={setInput}
        isPremium={isPremium}
        className="info-section"
      />
      <MealContentCoverage {...commonProps} {...props}/>
      <MealContentIngredientProduction {...commonProps} {...props}/>
    </>
  );
};
