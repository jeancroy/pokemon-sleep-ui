import React from 'react';

import {PokeboxImporterButton} from '@/components/shared/pokebox/importer/button';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {getPokemonProductionSingle} from '@/utils/game/producing/main/entry/single';
import {getPokemonProducingParams, getProductionIndividualParams} from '@/utils/game/producing/params';
import {roundDown} from '@/utils/number/round';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {toCalculatedCookingConfig} from '@/utils/user/config/cooking/main';


export const StaminaConfigSkillRecoveryFromPokebox = ({
  config,
  setConfig,
  berryDataMap,
  mainSkillMap,
  pokemonProducingParamsMap,
  ...props
}: StaminaConfigProps) => {
  const {
    bundle,
    pokedexMap,
    subSkillMap,
    mealMap,
  } = props;
  const {snorlaxFavorite} = bundle.userConfig;

  return (
    <PokeboxImporterButton
      {...props}
      dimension="size-6"
      noFullWidth
      onPokeboxPicked={(pokeInBox) => {
        const pokemon = pokedexMap[pokeInBox.pokemon];

        if (!pokemon) {
          return;
        }

        const {intermediate, skill} = getPokemonProductionSingle({
          pokemon,
          pokemonProducingParams: getPokemonProducingParams({
            pokemonId: pokemon.id,
            pokemonProducingParamsMap,
          }),
          berryData: berryDataMap[pokemon.berry.id],
          ingredients: getEffectiveIngredientProductions(pokeInBox),
          skillData: mainSkillMap[pokemon.skill],
          individual: getProductionIndividualParams({
            input: pokeInBox,
            pokemon,
            subSkillMap,
          }),
          snorlaxFavorite,
          calculatedCookingConfig: toCalculatedCookingConfig({...bundle, mealMap}),
          // Do not calculate as single, otherwise the recovery settings before this calc gets applied
          // This causes each calc to gradually increase the daily count until it reaches the optima
          calcBehavior: {asSingle: false},
          ...props,
        }).atStage.final;

        const {activeSkillEffect} = intermediate;

        if (activeSkillEffect?.type !== 'stamina') {
          return;
        }

        setConfig(cloneMerge(
          config,
          {
            skillRecovery: {
              recovery: {
                dailyCount: roundDown({value: skill.qty.equivalent, decimals: 2}),
                amount: activeSkillEffect.value,
              },
            },
          },
        ));
      }}
    />
  );
};
