import React from 'react';

import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {getToggleButtonClass} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {CopyButton} from '@/components/layout/copyable/button';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonEvolutionCountInput} from '@/components/shared/pokemon/evolution/countInput';
import {PokemonEvolutionSelector} from '@/components/shared/pokemon/evolution/selector';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {imageSmallIconSizes} from '@/styles/image';
import {PokeInBox} from '@/types/game/pokebox';
import {pokemonSubSkillLevel} from '@/types/game/pokemon/subSkill';
import {Dimension} from '@/types/style';
import {PokeInBoxEditCommonProps, PokeInBoxEditStateProps} from '@/ui/team/pokebox/editor/type';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon';
import {isNotNullish} from '@/utils/type';


type Props = PokeInBoxEditCommonProps & PokeInBoxEditStateProps & {
  onCopyPokeInBox: (original: PokeInBox) => void,
};

export const PokeInBoxEditLayout = ({
  pokedexMap,
  ingredientChainMap,
  subSkillMap,
  onRemovePokeInBox,
  pokeInBox,
  setPokeInBox,
  onCopyPokeInBox,
}: Props) => {
  const {
    uuid,
    pokemon: pokemonId,
    name,
    level,
    evolutionCount,
    subSkill,
    nature,
    isShiny,
  } = pokeInBox;
  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Common');

  const pokemon = pokedexMap[pokemonId];
  if (!pokemon) {
    return <></>;
  }

  const isShinyActive = isShiny ?? false;
  const iconDimension: Dimension = 'h-5 w-5';
  const maxEvolutionCount = getPokemonMaxEvolutionCount(Object.values(pokedexMap).filter(isNotNullish));

  return (
    <Flex className="gap-2">
      <Flex className="gap-1.5 truncate md:flex-row-reverse md:items-center">
        <Flex direction="row" center>
          <pre className="text-sm text-slate-500">
            {uuid}
          </pre>
          <CopyButton data={uuid} dimension="h-7 w-7"/>
        </Flex>
        <Flex direction="row" className="gap-1.5">
          <ToggleButton
            id="markPokeInBoxShiny"
            active={isShinyActive}
            onClick={() => setPokeInBox({
              ...pokeInBox,
              isShiny: !pokeInBox.isShiny,
            })}
            className={clsx('group rounded-lg p-1', getToggleButtonClass(isShiny ?? false))}
          >
            <div className="group relative h-5 w-5">
              <NextImage
                src="/images/generic/flash.png" alt={t2('Shiny')}
                sizes={imageSmallIconSizes} className={isShinyActive ? 'invert-on-dark' : 'invert-on-light'}
              />
            </div>
          </ToggleButton>
          <InputBox
            value={name ?? ''}
            type="text"
            placeholder={t(`PokemonName.${pokemonId}`)}
            className="w-full"
            onChange={({target}) => setPokeInBox({
              ...pokeInBox,
              name: target.value || null,
            })}
          />
        </Flex>
      </Flex>
      <PokemonEvolutionSelector
        pokemon={pokemon}
        pokedex={pokedexMap}
        onClick={(pokemon) => setPokeInBox({...pokeInBox, pokemon})}
      />
      <PokemonLevelSlider
        level={level}
        maxLevel={Math.max(...pokemonSubSkillLevel)}
        setLevel={(level) => setPokeInBox({
          ...pokeInBox,
          level,
        })}
      />
      <PokemonIngredientPicker
        chain={ingredientChainMap[pokemon.ingredientChain]}
        ingredients={pokeInBox.ingredients}
        onSelect={(updated, ingredientLevel) => setPokeInBox({
          ...pokeInBox,
          ingredients: {
            ...pokeInBox.ingredients,
            [ingredientLevel]: updated,
          },
        })}
        idPrefix={pokeInBox.uuid}
      />
      <PokemonEvolutionCountInput
        idPrefix="Pokebox"
        evolutionCount={evolutionCount}
        setEvolutionCount={(evolutionCount) => setPokeInBox({
          ...pokeInBox,
          evolutionCount,
        })}
        maxEvolutionCount={maxEvolutionCount}
      />
      <Flex className="gap-1.5 md:flex-row">
        <Flex className="h-8">
          <PokemonSubSkillSelector
            subSkill={subSkill}
            subSkillMap={subSkillMap}
            setSubSkill={(subSkill) => setPokeInBox({
              ...pokeInBox,
              subSkill,
            })}
          />
        </Flex>
        <Flex className="h-8">
          <PokemonNatureSelector
            nature={nature}
            setNature={(nature) => setPokeInBox({
              ...pokeInBox,
              nature,
            })}
          />
        </Flex>
      </Flex>
      <HorizontalSplitter/>
      <Flex direction="row" className="items-center">
        <button className="button-clickable-bg p-1" onClick={() => onCopyPokeInBox(pokeInBox)}>
          <DocumentDuplicateIcon className={iconDimension}/>
        </button>
        <button
          className="transform-smooth button-alert-bg ml-auto rounded-lg p-1"
          onClick={() => onRemovePokeInBox(uuid)}
        >
          <div className={iconDimension}>
            <TrashIcon/>
          </div>
        </button>
      </Flex>
    </Flex>
  );
};
