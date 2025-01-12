import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import BookmarkSlashIcon from '@heroicons/react/24/outline/BookmarkSlashIcon';
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {ToggleButton} from '@/components/input/toggleButton';
import {CopyButton} from '@/components/layout/copyable/button';
import {Flex} from '@/components/layout/flex/common';
import {DeleteButton} from '@/components/shared/common/button/delete';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonEvolutionCountInput} from '@/components/shared/pokemon/evolution/countInput';
import {PokemonEvolutionSelector} from '@/components/shared/pokemon/evolution/selector';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {SeedUsageInput} from '@/components/shared/pokemon/seed/input/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {defaultSeedUsage} from '@/const/game/seed';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {imageSmallIconSizes} from '@/styles/image';
import {getToggleButtonClass} from '@/styles/input';
import {Dimension} from '@/types/style';
import {PokeInBox} from '@/types/userData/pokebox';
import {PokeInBoxEditCommonProps, PokeInBoxEditStateProps} from '@/ui/team/pokebox/editor/type';
import {toIsoDateString} from '@/utils/date';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon/evolution/count';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {getSubSkillBonus} from '@/utils/game/subSkill/effect';


type Props = PokeInBoxEditCommonProps & PokeInBoxEditStateProps & {
  onCopyPokeInBox: (original: PokeInBox) => void,
};

export const PokeInBoxEditLayout = ({
  onRemovePokeInBox,
  pokeInBox,
  setPokeInBox,
  onCopyPokeInBox,
}: Props) => {
  const {
    uuid,
    dateAdded,
    pokemon: pokemonId,
    name,
    level,
    evolutionCount,
    subSkill,
    nature,
    isShiny,
    isFavorite,
  } = pokeInBox;

  const {
    pokedexMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
  } = useCommonServerData();

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Common');
  const t3 = useTranslations('UI.Pokemon.Individual');
  const t4 = useTranslations('UI.InPage.Team.Box');

  const pokemon = pokedexMap[pokemonId];
  if (!pokemon) {
    return null;
  }

  const isShinyActive = isShiny ?? false;
  const isFavoriteActive = isFavorite ?? false;
  const seeds = pokeInBox.seeds ?? defaultSeedUsage;
  const iconDimension: Dimension = 'size-5';
  const maxEvolutionCount = getPokemonMaxEvolutionCount(toPokemonList(pokedexMap));

  return (
    <Flex className="gap-1.5">
      <Flex className="gap-1.5 truncate md:flex-row-reverse md:items-center">
        <Flex direction="row" center noFullWidth>
          <pre className="text-sm text-slate-500">
            {uuid}
          </pre>
          <CopyButton data={uuid} dimension="size-7"/>
        </Flex>
        <Flex direction="row" className="gap-1.5">
          <ToggleButton
            active={isShinyActive}
            onClick={() => setPokeInBox({
              ...pokeInBox,
              isShiny: !pokeInBox.isShiny,
            })}
            className={clsx('group gap-0.5 rounded-lg p-1', getToggleButtonClass(isShinyActive))}
          >
            <div className="group relative size-5">
              <NextImage
                src="/images/generic/flash.png" alt={t2('Shiny')}
                sizes={imageSmallIconSizes} className={isShinyActive ? 'invert-on-dark' : 'invert-on-light'}
              />
            </div>
            <div>
              {t2('Shiny')}
            </div>
          </ToggleButton>
          <ToggleButton
            active={isFavoriteActive}
            onClick={() => setPokeInBox({
              ...pokeInBox,
              isFavorite: !pokeInBox.isFavorite,
            })}
            className={clsx('group gap-0.5 rounded-lg p-1', getToggleButtonClass(isFavoriteActive))}
          >
            {isFavoriteActive ?
              <BookmarkIcon className={iconDimension}/> :
              <BookmarkSlashIcon className={iconDimension}/>}
            <div>
              {t4('Favorite')}
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
        pokedexMap={pokedexMap}
        onClick={(pokemon) => setPokeInBox({...pokeInBox, pokemon})}
      />
      <PokemonLevelSlider
        value={level}
        setValue={(level) => setPokeInBox({
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
      />
      <PokemonEvolutionCountInput
        evolutionCount={evolutionCount}
        setEvolutionCount={(evolutionCount) => setPokeInBox({
          ...pokeInBox,
          evolutionCount,
        })}
        maxEvolutionCount={maxEvolutionCount}
      />
      <SeedUsageInput
        usage={seeds}
        setUsage={(getUpdated) => setPokeInBox({
          ...pokeInBox,
          seeds: getUpdated(seeds),
        })}
        evolutionCount={evolutionCount}
        subSkillBonus={getSubSkillBonus({level, pokemonSubSkill: subSkill, subSkillMap})}
        mainSkillData={mainSkillMap[pokemon.skill]}
      />
      <Flex className="gap-1.5 md:flex-row">
        <PokemonSubSkillSelector
          subSkill={subSkill}
          setSubSkill={(subSkill) => setPokeInBox({
            ...pokeInBox,
            subSkill,
          })}
          classNameForHeight="h-8"
        />
        <PokemonNatureSelector
          nature={nature}
          setNature={(nature) => setPokeInBox({
            ...pokeInBox,
            nature,
          })}
          classNameForHeight="h-8"
        />
      </Flex>
      <InputRowWithTitle noFixedTitleWidth title={
        <div className="px-2">
          {t3('DateRegistered')}
        </div>
      }>
        <InputBox
          type="date"
          className="text-center"
          value={toIsoDateString(new Date(dateAdded))}
          onChange={({target}) => setPokeInBox({
            ...pokeInBox,
            dateAdded: new Date(target.value || 0).getTime(),
          })}
        />
      </InputRowWithTitle>
      <HorizontalSplitter/>
      <Flex direction="row" className="items-center justify-between">
        <button className="button-clickable-bg p-1" onClick={() => onCopyPokeInBox(pokeInBox)}>
          <DocumentDuplicateIcon className={iconDimension}/>
        </button>
        <DeleteButton iconDimension={iconDimension} onClick={() => onRemovePokeInBox(uuid)} className="self-end"/>
      </Flex>
    </Flex>
  );
};
