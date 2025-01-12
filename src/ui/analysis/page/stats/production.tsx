import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {GenericMainSkillIcon} from '@/components/shared/icon/mainSkill/generic';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {IngredientIcons} from '@/components/shared/ingredient/icons/main';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {sortTypeToI18nId} from '@/components/shared/pokemon/sorter/const';
import {TextMarkThreshold} from '@/styles/text/mark/type';
import {AnalysisStatsContinuousUI} from '@/ui/analysis/page/result/continuous';
import {AnalysisStatsLayout} from '@/ui/analysis/page/stats/layout';
import {AnalysisStatsUiProps} from '@/ui/analysis/page/stats/type';
import {formatFloat} from '@/utils/number/format/regular';


export const AnalysisStatsOfProduction = ({stats, pokemon}: AnalysisStatsUiProps) => {
  const {berry} = pokemon;
  const {production} = stats;

  const t = useTranslations('UI.Pokemon');
  const percentileThreshold: TextMarkThreshold = {superRare: 93, rare: 85, ordinary: 10};

  const textTotalEnergy = t(sortTypeToI18nId.totalEnergy);
  const textBerryCount = t(sortTypeToI18nId.berryCount);
  const textBerryEnergy = t(sortTypeToI18nId.berryEnergy);
  const textIngredientCount = t(sortTypeToI18nId.ingredientCount);
  const textIngredientEnergy = t(sortTypeToI18nId.ingredientEnergy);
  const textSkillDailyCount = t(sortTypeToI18nId.mainSkillDailyCount);

  return (
    <AnalysisStatsLayout>
      <AnalysisStatsContinuousUI
        stats={production.total}
        title={
          <Flex direction="row" center className="gap-1.5">
            <ColoredStrengthIcon alt={textTotalEnergy}/>
            <span>{textTotalEnergy}</span>
          </Flex>
        }
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1 text-sm">
            <ColoredStrengthIcon alt={textTotalEnergy}/>
            <span>{formatFloat(data)}</span>
          </Flex>
        )}
      >
        <div className="text-2xl">
          {formatFloat(production.total.current)}
        </div>
      </AnalysisStatsContinuousUI>
      <AnalysisStatsContinuousUI
        stats={production.berry.count}
        title={
          <Flex direction="row" center className="gap-1.5">
            <PokemonBerryIcon dimension="size-6" id={berry.id}/>
            <span>{textBerryCount}</span>
          </Flex>
        }
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1">
            <GenericBerryIcon alt={textBerryCount}/>
            <span>{formatFloat(data)}</span>
          </Flex>
        )}
      >
        <div className="text-2xl">
          {formatFloat(production.berry.count.current)}
        </div>
      </AnalysisStatsContinuousUI>
      <AnalysisStatsContinuousUI
        stats={production.berry.strength}
        title={
          <Flex direction="row" center className="gap-1.5">
            <PokemonBerryIcon dimension="size-6" id={berry.id}/>
            <ColoredStrengthIcon alt={textBerryEnergy}/>
            <span>{textBerryEnergy}</span>
          </Flex>
        }
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1 text-sm">
            <ColoredStrengthIcon dimension="size-4" alt={textBerryEnergy}/>
            <span>{formatFloat(data)}</span>
          </Flex>
        )}
      >
        <div className="text-2xl">
          {formatFloat(production.berry.strength.current)}
        </div>
      </AnalysisStatsContinuousUI>
      {production.ingredient.individual.map((rate) => (
        <React.Fragment key={rate.itemId}>
          <AnalysisStatsContinuousUI
            stats={rate.count}
            linkedIconKey={({data, pokemonId}) => (
              `${pokemonId}-${data.productions.map(({id, qty}) => `${id}x${qty}`).join('-')}`
            )}
            title={
              <Flex direction="row" center className="gap-1.5">
                <PokemonIngredientIcon dimension="size-6" id={rate.itemId}/>
                <span>{textIngredientCount}</span>
              </Flex>
            }
            threshold={percentileThreshold}
            renderData={({data}) => (
              <Flex center>
                <IngredientIcons ingredients={[data.productions]}/>
                <Flex direction="row" center className="gap-1">
                  <GenericIngredientIcon alt={textIngredientCount}/>
                  <span>{formatFloat(data.value)}</span>
                </Flex>
              </Flex>
            )}
          >
            <div className="text-2xl">
              {formatFloat(rate.count.current)}
            </div>
          </AnalysisStatsContinuousUI>
          <AnalysisStatsContinuousUI
            stats={rate.strength}
            linkedIconKey={({data, pokemonId}) => (
              `${pokemonId}-${data.productions.map(({id, qty}) => `${id}x${qty}`).join('-')}`
            )}
            title={
              <Flex direction="row" center className="gap-1.5">
                <PokemonIngredientIcon dimension="size-6" id={rate.itemId}/>
                <ColoredStrengthIcon alt={textIngredientEnergy}/>
                <span>{textIngredientEnergy}</span>
              </Flex>
            }
            threshold={percentileThreshold}
            renderData={({data}) => (
              <Flex center>
                <IngredientIcons ingredients={[data.productions]}/>
                <Flex direction="row" center className="gap-1 text-sm">
                  <ColoredStrengthIcon alt={textIngredientEnergy}/>
                  <div>{formatFloat(data.value)}</div>
                </Flex>
              </Flex>
            )}
          >
            <div className="text-2xl">
              {formatFloat(rate.strength.current)}
            </div>
          </AnalysisStatsContinuousUI>
        </React.Fragment>
      ))}
      <AnalysisStatsContinuousUI
        stats={production.ingredient.overall}
        title={
          <Flex direction="row" center className="gap-1.5">
            <ColoredStrengthIcon alt={textIngredientEnergy}/>
            <span>{textIngredientEnergy}</span>
          </Flex>
        }
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1 text-sm">
            <ColoredStrengthIcon alt={textIngredientEnergy}/>
            <div>{formatFloat(data)}</div>
          </Flex>
        )}
      >
        <div className="text-2xl">
          {formatFloat(production.ingredient.overall.current)}
        </div>
      </AnalysisStatsContinuousUI>
      <AnalysisStatsContinuousUI
        stats={production.skillTriggerCount}
        title={
          <Flex direction="row" center className="gap-1.5">
            <GenericMainSkillIcon alt={textSkillDailyCount}/>
            <span>{textSkillDailyCount}</span>
          </Flex>
        }
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1 text-sm">
            <GenericMainSkillIcon alt={textSkillDailyCount}/>
            <div>{formatFloat(data)}</div>
          </Flex>
        )}
      >
        <div className="text-2xl">
          {formatFloat(production.skillTriggerCount.current)}
        </div>
      </AnalysisStatsContinuousUI>
    </AnalysisStatsLayout>
  );
};
