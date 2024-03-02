import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonEvolutionCountInput} from '@/components/shared/pokemon/evolution/countInput';
import {PokemonEvolutionSelector} from '@/components/shared/pokemon/evolution/selector';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonConfigProps} from '@/components/shared/pokemon/predefined/config/type';
import {SeedUsageInput} from '@/components/shared/pokemon/seed/input/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {getSubSkillBonus} from '@/utils/game/subSkill/effect';


export const PokemonConfig = (props: PokemonConfigProps) => {
  const {
    data,
    onDataUpdated,
    pokemon,
    pokemonMaxLevel,
    maxEvolutionCount,
    showSeeds,
  } = props;
  const {ingredientChain, skill} = pokemon;

  const {
    pokedexMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
  } = useCommonServerData();

  const mainSkillData = mainSkillMap[skill];

  return (
    <Flex className="gap-1.5">
      <PokemonEvolutionSelector
        pokemon={pokemon}
        pokedexMap={pokedexMap}
        onClick={(pokemonId) => onDataUpdated({pokemonId})}
      />
      <PokemonIngredientPicker
        chain={ingredientChainMap[ingredientChain]}
        ingredients={data.ingredients}
        onSelect={(updated, ingredientLevel) => onDataUpdated({
          ...data,
          ingredients: {
            ...data.ingredients,
            [ingredientLevel]: updated,
          },
        })}
      />
      <Flex className="h-20 gap-1.5">
        <PokemonSubSkillSelector
          subSkill={data.subSkill}
          setSubSkill={(subSkill) => onDataUpdated({subSkill})}
          subSkillMap={subSkillMap}
        />
        <PokemonNatureSelector
          nature={data.nature}
          setNature={(nature) => onDataUpdated({nature})}
        />
      </Flex>
      <PokemonLevelSlider
        value={data.level}
        setValue={(level) => onDataUpdated({level})}
        max={pokemonMaxLevel}
        noSameLine
      />
      <PokemonEvolutionCountInput
        evolutionCount={data.evolutionCount}
        setEvolutionCount={(evolutionCount) => onDataUpdated({evolutionCount})}
        maxEvolutionCount={maxEvolutionCount}
      />
      {
        showSeeds &&
        <SeedUsageInput
          usage={data.seeds}
          setUsage={(getOriginal) => onDataUpdated({seeds: getOriginal(data.seeds)})}
          evolutionCount={data.evolutionCount}
          subSkillBonus={getSubSkillBonus({
            level: data.level,
            pokemonSubSkill: data.subSkill,
            subSkillMap,
          })}
          mainSkillData={mainSkillData}
        />
      }
    </Flex>
  );
};
