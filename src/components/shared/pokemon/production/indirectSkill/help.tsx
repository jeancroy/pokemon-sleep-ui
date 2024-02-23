import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {MainSkillEffectTypeIcon} from '@/components/shared/icon/mainSkill/type';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {ProductionUI} from '@/components/shared/production/rate/main';
import {ProductionContentCommonProps} from '@/components/shared/production/rate/type';
import {MainSkillInstantHelpEffect} from '@/utils/game/mainSkill/bySkill/help/type';


type Props = ProductionContentCommonProps & {
  effect: MainSkillInstantHelpEffect | null,
};

export const PokemonIndirectSkillProductionInstantHelp = ({effect, ...props}: Props) => {
  if (!effect || !effect.helpCount) {
    return null;
  }

  const {production} = effect;
  const {berry, ingredient} = production;

  return (
    <>
      <ProductionUI
        rate={berry}
        getIcon={(dimension) => (
          <Flex direction="row" noFullWidth center>
            <MainSkillEffectTypeIcon type="help" dimension={dimension}/>
            <PokemonBerryIcon id={berry.id} dimension={dimension} noLink/>
          </Flex>
        )}
        {...props}
      />
      {ingredient.map((ingredient) => (
        <ProductionUI
          key={ingredient.id}
          rate={ingredient}
          getIcon={(dimension) => (
            <Flex direction="row" noFullWidth center>
              <MainSkillEffectTypeIcon type="help" dimension={dimension}/>
              <PokemonIngredientIcon id={ingredient.id} dimension={dimension} noLink/>
            </Flex>
          )}
          {...props}
        />
      ))}
    </>
  );
};
