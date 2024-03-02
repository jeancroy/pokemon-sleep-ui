import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Copyable} from '@/components/layout/copyable/main';
import {Flex} from '@/components/layout/flex/common';
import {StrengthGrowthChart} from '@/components/shared/chart/strength/main';
import {StrengthGrowthDataEntry} from '@/components/shared/chart/strength/type';
import {MealCoverageCombo} from '@/components/shared/meal/coverage/combo/main';
import {PokeboxLinker} from '@/components/shared/pokebox/linker/main';
import {PokemonDetailedProduction} from '@/components/shared/pokemon/production/stats/main';
import {PokemonSpecialtyIcon} from '@/components/shared/pokemon/specialty/icon';
import {TeamMemberConfig} from '@/components/shared/team/member/popup/config';
import {
  TeamMemberPopupCommonProps,
  TeamMemberStrengthGrowthDataType,
  teamMemberStrengthGrowthDataTypes,
} from '@/components/shared/team/member/popup/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {getTotalPokemonIngredientProduction} from '@/utils/game/producing/reducer/total/common';
import {getTotalStrengthOfPokemonProduction} from '@/utils/game/producing/reducer/total/strength';
import {formatFloat} from '@/utils/number/format/regular';
import {generateNumberTicks} from '@/utils/number/generator';
import {toTeamMemberFromPokeInBox} from '@/utils/team/toMember';
import {isNotNullish} from '@/utils/type';


export const TeamMemberPopupContent = ({
  state,
  ...props
}: TeamMemberPopupCommonProps) => {
  const {
    member,
    setMember,
    teamMetadata,
    calculatedCookingConfig,
    memberIdForShare,
    pokemonMaxLevel,
    pokemon,
    production,
    stateOfRate,
    getProductionByLevel,
  } = props;
  const {linkedPokeInBoxUuid} = member;
  const {control, hide} = state;
  const {type} = control;

  const {mealMap} = useCommonServerData();

  const t = useTranslations('UI.Producing');
  const t2 = useTranslations('UI.Component.Team.Member');

  if (type === 'memberConfig') {
    return <TeamMemberConfig {...props}/>;
  }

  if (type === 'detailedStats') {
    return (
      <PokemonDetailedProduction
        rate={production.rate}
        metadata={production.metadata}
        specialty={pokemon.specialty}
      />
    );
  }

  if (type === 'sharableLink') {
    return (
      <Flex className="gap-1.5">
        <Flex className="info-highlight p-1">
          {t2('Message.ShareableLink')}
        </Flex>
        <Copyable content={memberIdForShare}/>
      </Flex>
    );
  }

  if (type === 'growthChart') {
    return (
      <Flex className="info-section h-80 sm:w-[80vw]">
        <AdsUnit/>
        <StrengthGrowthChart
          dataKeys={[...teamMemberStrengthGrowthDataTypes]}
          dataNames={({show}) => ({
            berry: <PokemonSpecialtyIcon specialty={specialtyIdMap.berry} active={show.berry}/>,
            ingredient: <PokemonSpecialtyIcon specialty={specialtyIdMap.ingredient} active={show.ingredient}/>,
            skill: <PokemonSpecialtyIcon specialty={specialtyIdMap.skill} active={show.skill}/>,
            total: t('Total'),
          })}
          data={[...generateNumberTicks({
            max: pokemonMaxLevel,
            interval: 1,
            start: 1,
          })].map((level): StrengthGrowthDataEntry<TeamMemberStrengthGrowthDataType> | null => {
            const production = getProductionByLevel(level);
            if (!production) {
              return null;
            }

            const {rate} = production;

            return {
              level,
              strength: {
                berry: rate.berry.strength.equivalent,
                ingredient: getTotalPokemonIngredientProduction({
                  rate,
                  target: 'strength',
                  state: stateOfRate,
                }),
                skill: rate.skill.strength.equivalent,
                total: getTotalStrengthOfPokemonProduction(rate),
              },
            };
          }).filter(isNotNullish)}
          classNameOfData={{
            berry: '[&>path]:stroke-green-700 [&>path]:dark:stroke-green-500',
            ingredient: '[&>path]:stroke-amber-600 [&>path]:dark:stroke-yellow-400',
            skill: '[&>path]:stroke-blue-600 [&>path]:dark:stroke-blue-400',
            total: '[&>path]:stroke-neutral-800 [&>path]:dark:stroke-slate-200',
          }}
          formatTicks={formatFloat}
          leftMargin={15}
          currentLevel={production.level}
        />
      </Flex>
    );
  }

  if (type === 'mealCoverage') {
    return (
      <Flex className="h-[60vh] sm:w-[80vw]">
        <MealCoverageCombo
          mealMap={mealMap}
          ingredientProduction={Object.fromEntries(
            Object.entries(production.rate.ingredient).map(([id, rate]) => [id, rate?.qty[stateOfRate] ?? 0]),
          )}
          actualPotCapacity={calculatedCookingConfig.actualPotCapacity}
          period={teamMetadata.analysisPeriod}
        />
      </Flex>
    );
  }

  if (type === 'pokeboxLink') {
    return (
      <Flex className="sm:w-[60vw] md:w-[50vw] lg:w-[30rem]">
        <PokeboxLinker
          initialPokeInBoxUuid={linkedPokeInBoxUuid}
          onLinked={(pokeInBox) => {
            if (pokeInBox) {
              setMember(toTeamMemberFromPokeInBox(pokeInBox));
            }

            hide();
          }}
          {...props}
        />
      </Flex>
    );
  }

  if (type === null) {
    return null;
  }

  throw new Error(`Unhandled Team Analysis Pokemon popup type [${type satisfies never}]`);
};
