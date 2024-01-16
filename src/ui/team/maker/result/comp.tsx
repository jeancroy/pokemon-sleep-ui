import React from 'react';

import {useTranslations} from 'next-intl';

import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {MealCoverageDetails} from '@/components/shared/meal/coverage/details/main';
import {PokemonGroupedProduction} from '@/components/shared/pokemon/production/grouped/main';
import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split/main';
import {TeamContributionSplitIndicator} from '@/components/shared/team/contributionSplit/main';
import {TeamMakerResultButton} from '@/ui/team/maker/result/button/main';
import {teamMakerUnitStrengthAtState} from '@/ui/team/maker/result/const';
import {TeamMakerCompControl} from '@/ui/team/maker/result/control';
import {TeamMakerIngredientStatsUI} from '@/ui/team/maker/result/ingredient';
import {TeamMakerSnorlaxRankFinalEstimate} from '@/ui/team/maker/result/snorlaxRank';
import {TeamMakerResultCommonProps} from '@/ui/team/maker/result/type';
import {TeamMakerResultUnit} from '@/ui/team/maker/result/unit';
import {TeamMakerDataProps} from '@/ui/team/maker/type';
import {TeamMakerResultComp} from '@/ui/team/maker/type/result';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';
import {formatFloat} from '@/utils/number/format';


type Props = TeamMakerDataProps & TeamMakerResultCommonProps & {
  comp: TeamMakerResultComp,
};

export const TeamMakerResultCompUi = ({comp, ...props}: Props) => {
  const {
    result,
  } = props;
  const {
    rates,
    strengthByType,
    basisValue,
    ingredientStats,
    finalEstimates,
  } = comp;

  const collapsible = useCollapsible();
  const t = useTranslations('UI.Producing');

  return (
    <CollapsibleFull state={collapsible} button={<TeamMakerResultButton comp={comp} basis={result.basis}/>}>
      <Flex center className="gap-1.5 p-1">
        <Grid className="grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-5">
          {rates.rates.map((rate) => (
            <TeamMakerResultUnit
              key={rate.payload.pokeInBox.uuid}
              rate={rate}
              compStrength={basisValue.strength}
              {...props}
            />
          ))}
        </Grid>
        <TeamContributionSplitIndicator
          data={rates.rates.map(({payload, atStage}) => ({
            pokemonId: payload.pokeInBox.pokemon,
            production: getTotalOfPokemonProducingRate({
              rate: atStage.final,
              state: teamMakerUnitStrengthAtState,
            }).energy,
          }))}
        />
        <PokemonGroupedProduction grouped={rates.grouped}/>
        <TeamMakerIngredientStatsUI ingredientStats={ingredientStats}/>
        <Flex className="items-center gap-1 md:flex-row">
          <PokemonProductionSplit specialty={null} {...strengthByType}/>
          <Flex noFullWidth direction="row" className="items-center self-end text-2xl">
            <ColoredEnergyIcon dimension="h-8 w-8" alt={t('Total')}/>
            <span>{formatFloat(basisValue.strength)}</span>
          </Flex>
        </Flex>
        <MealCoverageDetails coverage={basisValue.mealCoverage}/>
        <Flex className="items-center gap-1.5 md:flex-row md:justify-between">
          <TeamMakerSnorlaxRankFinalEstimate finalEstimates={finalEstimates}/>
          <TeamMakerCompControl
            pokeInBoxList={rates.rates.map(({payload}) => payload.pokeInBox)}
          />
        </Flex>
      </Flex>
    </CollapsibleFull>
  );
};
