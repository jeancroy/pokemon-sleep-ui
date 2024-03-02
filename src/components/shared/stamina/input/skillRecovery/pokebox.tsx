import React from 'react';

import {PokeboxImporterButton} from '@/components/shared/pokebox/importer/button';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {getPokemonProductionSingle} from '@/utils/game/producing/main/entry/single';
import {getPokemonProducingParams, getProductionIndividualParams} from '@/utils/game/producing/params';
import {roundDown} from '@/utils/number/round';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {toCalculatedCookingConfig} from '@/utils/user/config/cooking/main';


export const StaminaConfigSkillRecoveryFromPokebox = ({bundle, setStaminaConfig}: StaminaConfigProps) => {
  const {stamina, snorlaxFavorite} = bundle.userConfig;

  const serverData = useCommonServerData();
  const {
    pokedexMap,
    subSkillMap,
    mealMap,
    berryDataMap,
    mainSkillMap,
    pokemonProducingParamsMap,
  } = serverData;

  return (
    <PokeboxImporterButton
      dimension="size-5"
      noFullWidth
      isPokeInBoxIncluded={(pokeInBox) => {
        const pokemon = pokedexMap[pokeInBox.pokemon];
        if (!pokemon) {
          return false;
        }

        const mainSkill = mainSkillMap[pokemon.skill];
        return mainSkill.effects.some((effect) => effect.type === 'stamina' && effect.target === 'team');
      }}
      onPokeboxPicked={(pokeInBox) => {
        const pokemon = pokedexMap[pokeInBox.pokemon];

        if (!pokemon) {
          return;
        }

        const {intermediate, skill} = getPokemonProductionSingle({
          bundle,
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
          ...serverData,
        }).atStage.final;

        const {activeSkillEffect} = intermediate;

        if (activeSkillEffect?.type !== 'stamina') {
          return;
        }

        setStaminaConfig(cloneMerge(
          stamina,
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
