import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonItemStatsFromPokebox} from '@/components/shared/pokemon/icon/itemStats/base/fromPokebox/main';
import {PokemonItemStatsFromPokedex} from '@/components/shared/pokemon/icon/itemStats/base/fromPokedex';
import {PokemonItemStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/base/type';
import {PokemonIngredientStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {Ingredient} from '@/types/game/ingredient';
import {ingredientLevels} from '@/types/game/pokemon/ingredient';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';


type Props = PokemonIngredientStatsCommonProps & {
  input: PokemonIndividualParams,
  ingredient: Ingredient | undefined,
  hidePokebox?: boolean,
};

export const PokemonIngredientStats = ({
  ingredient,
  hidePokebox,
  ...props
}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  if (!ingredient) {
    return null;
  }

  const commonProps: PokemonItemStatsCommonProps = {
    targetSpecialty: specialtyIdMap.ingredient,
    getItemRate: (pokemonRate) => pokemonRate.ingredient[ingredient.id],
    getIcon: (_, dimension) => (
      <PokemonIngredientIcon id={ingredient.id} dimension={dimension} noLink/>
    ),
  };

  return (
    <Flex className="gap-2">
      <PokemonItemStatsFromPokedex
        itemAlt={t('Ingredient')}
        itemImageSrc={`/images/ingredient/${ingredient.id}.png`}
        isProductionIncluded={(productions) => productions.some(({id}) => id === ingredient.id)}
        {...commonProps}
        {...props}
      />
      {
        !hidePokebox &&
        <PokemonItemStatsFromPokebox
          filter={{
            internal: () => true,
            external: {$or: ingredientLevels.map((level) => ({[`ingredients.${level}.id`]: ingredient.id}))},
          }}
          {...commonProps}
          {...props}
        />
      }
    </Flex>
  );
};
