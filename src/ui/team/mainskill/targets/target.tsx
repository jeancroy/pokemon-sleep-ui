import React from 'react';

import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import PencilIcon from '@heroicons/react/24/outline/PencilIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';

import {InfoIcon} from '@/components/icons/info';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {PopupCommon} from '@/components/popup/common/main';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {PokemonName} from '@/components/shared/pokemon/name/main';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonConfig} from '@/components/shared/pokemon/predefined/config/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokemonInfo} from '@/types/game/pokemon';
import {SkillTriggerAnalysisTriggerValue} from '@/ui/team/mainskill/targets/triggerValue';
import {SkillTriggerAnalysisCalculatedUnit, SkillTriggerAnalysisCommonProps} from '@/ui/team/mainskill/targets/type';
import {SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';


type Props = SkillTriggerAnalysisCommonProps & {
  pokemon: PokemonInfo,
  unit: SkillTriggerAnalysisCalculatedUnit,
  updateUnit: (update: Partial<SkillTriggerAnalysisUnit>) => void,
  deleteUnit: () => void,
  copyUnit: () => void,
};

export const SkillTriggerAnalysisTarget = (props: Props) => {
  const {
    subSkillMap,
    pokemon,
    unit,
    updateUnit,
    deleteUnit,
    copyUnit,
  } = props;

  const [show, setShow] = React.useState(false);

  const {
    level,
    nature,
    subSkill,
    ingredients,
  } = unit;
  const {skill} = pokemon;

  return (
    <AnimatedCollapseQuick show={unit.show} appear>
      <Flex center className="bg-plate relative h-full gap-1">
        <button onClick={deleteUnit} className="button-clickable absolute right-1 top-1 z-10 size-5 rounded-full">
          <XMarkIcon/>
        </button>
        <PopupCommon show={show} setShow={setShow}>
          <Flex noFullWidth className="sm:w-[60vw]">
            <PokemonConfig
              {...props}
              data={unit}
              onDataUpdated={(update) => updateUnit(update)}
            />
          </Flex>
        </PopupCommon>
        <Flex className="gap-1">
          <PokemonName size="sm" pokemon={pokemon}/>
          <Flex direction="row" center>
            <div className="relative size-28">
              <PokemonImage pokemonId={pokemon.id} image={{type: 'default', image: 'portrait'}} isShiny={false}/>
              <InfoIcon className="absolute bottom-0 right-0">
                {level}
              </InfoIcon>
            </div>
          </Flex>
          <Flex direction="row" className="items-center justify-between">
            <FlexLink
              href={`/info/mainskill/${skill}`}
              className={clsx('p-1', pokemon.specialty === specialtyIdMap.skill && 'bg-blink')}
            >
              <MainSkillIcon id={skill} dimension="size-9"/>
            </FlexLink>
            <Flex className="items-end gap-1">
              <Flex direction="row" noFullWidth className="gap-1">
                <button className="button-clickable-bg size-7 p-1" onClick={copyUnit}>
                  <DocumentDuplicateIcon/>
                </button>
                <button className="button-clickable-bg size-7 p-1" onClick={() => setShow(true)}>
                  <PencilIcon/>
                </button>
              </Flex>
              <Flex noFullWidth className={clsx(
                'px-2 py-1 text-sm',
                pokemon.specialty === specialtyIdMap.ingredient && 'bg-blink',
              )}>
                <PokemonIngredientIcons
                  ingredients={[Object.values(ingredients).map((production) => production)]}
                  className="gap-1"
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <PokemonNatureIndicator nature={nature}/>
        <PokemonSubSkillIndicator
          level={level}
          subSkill={subSkill}
          subSkillMap={subSkillMap}
          className="justify-center"
        />
        <SkillTriggerAnalysisTriggerValue pokemon={pokemon} unit={unit}/>
      </Flex>
    </AnimatedCollapseQuick>
  );
};
