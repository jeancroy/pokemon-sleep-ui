import React from 'react';

import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {defaultPokemonIndividualParams} from '@/const/game/pokemon';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {MealContentIngredientProduction} from '@/ui/meal/page/content/production/main';
import {MealPageContentCommonProps} from '@/ui/meal/page/content/type';
import {MealCommonProps} from '@/ui/meal/page/type';


type Props = MealCommonProps & {
  isPremium: boolean,
};

export const MealPageContent = ({isPremium, ...props}: Props) => {
  const {
    subSkillMap,
    pokemonMaxLevel,
  } = props;
  const [input, setInput] = React.useState<PokemonIndividualParams>(
    defaultPokemonIndividualParams,
  );

  const commonProps: MealPageContentCommonProps = {
    input,
    setInput,
  };

  return (
    <>
      <PokemonIndividualParamsPicker
        filter={input}
        setFilter={setInput}
        maxLevel={pokemonMaxLevel}
        isPremium={isPremium}
        subSkillMap={subSkillMap}
        className="info-section"
      />
      <MealContentIngredientProduction {...commonProps} {...props}/>
    </>
  );
};
