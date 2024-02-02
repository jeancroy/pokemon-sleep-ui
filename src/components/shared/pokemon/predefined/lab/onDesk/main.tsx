import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {OcrPokemonInfoImporter} from '@/components/ocr/importer/pokemonInfo/main';
import {ButtonToStartTheSorcery} from '@/components/shared/common/button/sorcery';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonEvolutionCountInput} from '@/components/shared/pokemon/evolution/countInput';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientPicker} from '@/components/shared/pokemon/ingredients/picker';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonName} from '@/components/shared/pokemon/name/main';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonOnDeskExportButton} from '@/components/shared/pokemon/predefined/lab/onDesk/export';
import {PokemonOnDeskCommonProps, PokemonOnDeskState} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';


export type PokemonOnDeskProps<TOnDesk extends PokemonOnDeskState> = PokemonOnDeskCommonProps<TOnDesk> & {
  initialSetup: TOnDesk,
};

const PokemonOnDeskInternal = <TOnDesk extends PokemonOnDeskState>({
  ingredientChainMap,
  subSkillMap,
  pokemonMaxLevel,
  ocrTranslations,
  maxEvolutionCount,
  onRun,
  immediateUpdate,
  renderAdditional,
  initialSetup,
}: PokemonOnDeskProps<TOnDesk>, ref: React.ForwardedRef<HTMLDivElement>) => {
  const [setup, setSetup] = React.useState(initialSetup);
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  const t = useTranslations('UI.Metadata.Pokedex');
  const t2 = useTranslations('Game.PokemonName');

  const {pokemon} = setup;
  const {
    ingredients,
    subSkill,
    nature,
    evolutionCount,
  } = setup;

  // This allows this component to trigger an update if `initialSetup` is changed
  React.useEffect(() => setSetup((original) => ({
    ...initialSetup,
    ...(
      // Keep the original nature/subskill if the origin is Pokédex
      initialSetup.origin === 'pokedex' && {
        nature: original.nature,
        subSkill: original.subSkill,
      }
    ),
  })), [initialSetup]);
  React.useEffect(() => {
    if (immediateUpdate) {
      onRun(setup);
    }
  }, [setup]);

  return (
    <Flex ref={ref} center className="relative gap-1.5">
      <PokemonLinkPopup state={state} setState={setState}/>
      <button
        className="button-clickable group absolute left-1 top-1 size-8 rounded-full"
        onClick={() => showPokemon(pokemon)}
      >
        <GenericPokeballIcon alt={t('Main.Page.Title', {name: t2(pokemon.id.toString())})} noWrap/>
      </button>
      <PokemonName size="lg" pokemon={pokemon}/>
      <div className="relative size-48">
        <PokemonImage pokemonId={pokemon.id} image={{type: 'default', image: 'portrait'}} isShiny={false}/>
      </div>
      <PokemonIngredientPicker
        chain={ingredientChainMap[pokemon.ingredientChain]}
        ingredients={ingredients}
        onSelect={(production, level) => setSetup((setup) => ({
          ...setup,
          ingredients: {
            ...setup.ingredients,
            [level]: production,
          },
        }))}
      />
      <Flex direction="row" className="h-8 gap-1.5">
        <PokemonSubSkillSelector
          subSkill={subSkill}
          setSubSkill={(subSkill) => setSetup((setup) => ({
            ...setup,
            subSkill,
          }))}
          subSkillMap={subSkillMap}
        />
        <PokemonNatureSelector
          nature={nature}
          setNature={(nature) => setSetup((setup) => ({
            ...setup,
            nature,
          }))}
        />
      </Flex>
      <PokemonEvolutionCountInput
        evolutionCount={evolutionCount}
        setEvolutionCount={(evolutionCount) => setSetup((setup) => ({
          ...setup,
          evolutionCount,
        }))}
        maxEvolutionCount={maxEvolutionCount}
      />
      {renderAdditional && renderAdditional(setup, setSetup)}
      <Flex direction="row" center className="gap-1.5">
        <OcrPokemonInfoImporter
          ocrTranslations={ocrTranslations}
          onCompleteImport={(_, {subSkill, nature}) => setSetup((original) => ({
            ...original,
            subSkill,
            nature,
          }))}
          subSkillMap={subSkillMap}
          pokemonIdOverride={pokemon.id}
          noFullWidth={!immediateUpdate}
        />
        {!immediateUpdate && <ButtonToStartTheSorcery onClick={() => onRun(setup)}/>}
        <PokemonOnDeskExportButton setup={setup} pokemon={setup.pokemon} pokemonMaxLevel={pokemonMaxLevel}/>
      </Flex>
    </Flex>
  );
};

export const PokemonOnDesk = React.forwardRef(PokemonOnDeskInternal);
