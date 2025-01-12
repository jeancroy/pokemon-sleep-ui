import React from 'react';

import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon';
import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {IngredientIcons} from '@/components/shared/ingredient/icons/main';
import {PokemonClickableIcons} from '@/components/shared/pokemon/icon/clickable/main';
import {PokemonName} from '@/components/shared/pokemon/name/main';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonProductionSplitFromPokemonRate} from '@/components/shared/pokemon/production/split/fromPokemon';
import {PokemonDetailedProduction} from '@/components/shared/pokemon/production/stats/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {PokemonProductionWithPayload} from '@/types/game/producing/rate/main';
import {teamMakerUnitStrengthAtState} from '@/ui/team/maker/result/const';
import {TeamMakerResultCommonProps} from '@/ui/team/maker/result/type';
import {TeamMakerDataProps} from '@/ui/team/maker/type';
import {TeamMakerReferenceUnit} from '@/ui/team/maker/type/common';
import {getTotalPokemonProduction} from '@/utils/game/producing/reducer/total/common';
import {formatFloat} from '@/utils/number/format/regular';


type Props = TeamMakerDataProps & TeamMakerResultCommonProps & {
  rate: PokemonProductionWithPayload<TeamMakerReferenceUnit>,
  compStrength: number,
};

export const TeamMakerResultUnit = ({
  input,
  rate,
  compStrength,
}: Props) => {
  const pokemonRate = rate.atStage.final;
  const {pokeInBox, levelUsed} = rate.payload;
  const {
    pokemon,
    name,
    ingredients,
    subSkill,
    nature,
  } = pokeInBox;

  const {
    pokedexMap,
    subSkillMap,
  } = useCommonServerData();

  const t = useTranslations('UI.Producing');
  const [show, setShow] = React.useState(false);

  const pokemonInfo = pokedexMap[pokemon];
  if (!pokemonInfo) {
    return null;
  }

  const unitStrength = getTotalPokemonProduction({
    rate: pokemonRate,
    state: teamMakerUnitStrengthAtState,
  }).strength;

  return (
    <Flex className="bg-plate gap-1.5">
      <PopupCommon show={show} setShow={setShow}>
        <PokemonDetailedProduction
          rate={rate.atStage.final}
          metadata={rate.metadata}
          specialty={pokemonInfo.specialty}
        />
      </PopupCommon>
      <Flex direction="row" className="items-center gap-1.5">
        <InfoIcon style={input.previewLevel ? 'warn' : 'glow'}>
          {levelUsed}
        </InfoIcon>
        <PokemonName size="base" pokemon={pokemonInfo} override={name}/>
        <button className="button-clickable-bg ml-auto size-7 p-1" onClick={() => setShow(true)}>
          <ChartBarIcon/>
        </button>
      </Flex>
      <Flex direction="row" className="items-center gap-2">
        <PokemonClickableIcons pokemonList={[pokemonInfo]} dimension="size-16"/>
        <Flex className="gap-1">
          <IngredientIcons
            ingredients={[Object.values(ingredients).map((production) => production)]}
            dimension="size-5"
            classOfText="text-base"
            className="self-center"
          />
          <PokemonNatureIndicator nature={nature}/>
          <PokemonSubSkillIndicator
            level={levelUsed}
            subSkill={subSkill}
            subSkillMap={subSkillMap}
            className="self-center"
          />
        </Flex>
      </Flex>
      <PokemonProductionSplitFromPokemonRate
        specialty={pokemonInfo.specialty}
        rate={pokemonRate}
        state={teamMakerUnitStrengthAtState}
      />
      <Flex noFullWidth direction="row" className="items-center self-end">
        <ColoredStrengthIcon dimension="size-5" alt={t('Total')}/>
        <div>{formatFloat(unitStrength)} ({formatFloat(unitStrength / compStrength * 100)}%)</div>
      </Flex>
    </Flex>
  );
};
