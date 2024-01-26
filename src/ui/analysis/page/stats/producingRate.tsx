import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {MainSkillTriggerValueIcon} from '@/components/shared/pokemon/mainSkill/icon/trigger';
import {sortTypeToI18nId} from '@/components/shared/pokemon/sorter/const';
import {TextMarkThreshold} from '@/styles/text/mark/type';
import {AnalysisStatsContinuousUI} from '@/ui/analysis/page/result/continuous';
import {AnalysisStatsLayout} from '@/ui/analysis/page/stats/layout';
import {AnalysisStatsUiProps} from '@/ui/analysis/page/stats/type';
import {formatFloat} from '@/utils/number/format';


export const AnalysisStatsOfProducingRate = ({stats, pokemon}: AnalysisStatsUiProps) => {
  const {berry} = pokemon;
  const {producingRate} = stats;

  const t = useTranslations('UI.InPage.Pokedex');
  const percentileThreshold: TextMarkThreshold = {superRare: 93, rare: 85, ordinary: 10};

  const textTotalEnergy = t(sortTypeToI18nId.totalEnergy);
  const textBerryCount = t(sortTypeToI18nId.berryCount);
  const textBerryEnergy = t(sortTypeToI18nId.berryEnergy);
  const textIngredientCount = t(sortTypeToI18nId.ingredientCount);
  const textIngredientEnergy = t(sortTypeToI18nId.ingredientEnergy);
  const textSkillTriggerValue = t(sortTypeToI18nId.mainSkillTriggerValue);

  return (
    <AnalysisStatsLayout>
      <AnalysisStatsContinuousUI
        stats={producingRate.total}
        title={
          <Flex direction="row" center className="gap-1.5">
            <ColoredEnergyIcon alt={textTotalEnergy}/>
            {textTotalEnergy}
          </Flex>
        }
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1 text-sm">
            <ColoredEnergyIcon alt={textTotalEnergy}/>
            <div>{formatFloat(data)}</div>
          </Flex>
        )}
      >
        <div className="text-2xl">
          {formatFloat(producingRate.total.current)}
        </div>
      </AnalysisStatsContinuousUI>
      <AnalysisStatsContinuousUI
        stats={producingRate.berry.count}
        title={
          <Flex direction="row" center className="gap-1.5">
            <PokemonBerryIcon dimension="size-6" id={berry.id}/>
            <div>{textBerryCount}</div>
          </Flex>
        }
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1">
            <GenericBerryIcon alt={textBerryCount}/>
            <div>{formatFloat(data)}</div>
          </Flex>
        )}
      >
        <div className="text-2xl">
          {formatFloat(producingRate.berry.count.current)}
        </div>
      </AnalysisStatsContinuousUI>
      <AnalysisStatsContinuousUI
        stats={producingRate.berry.energy}
        title={
          <Flex direction="row" center className="gap-1.5">
            <PokemonBerryIcon dimension="size-6" id={berry.id}/>
            <ColoredEnergyIcon alt={textBerryEnergy}/>
            <div>{textBerryEnergy}</div>
          </Flex>
        }
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1 text-sm">
            <ColoredEnergyIcon dimension="size-4" alt={textBerryEnergy}/>
            <div>{formatFloat(data)}</div>
          </Flex>
        )}
      >
        <div className="text-2xl">
          {formatFloat(producingRate.berry.energy.current)}
        </div>
      </AnalysisStatsContinuousUI>
      {producingRate.ingredient.individual.map((rate) => (
        <React.Fragment key={rate.itemId}>
          <AnalysisStatsContinuousUI
            stats={rate.count}
            linkedIconKey={({data, pokemonId}) => (
              `${pokemonId}-${data.productions.map(({id, qty}) => `${id}x${qty}`).join('-')}`
            )}
            title={
              <Flex direction="row" center className="gap-1.5">
                <PokemonIngredientIcon dimension="size-6" id={rate.itemId}/>
                <div>{textIngredientCount}</div>
              </Flex>
            }
            threshold={percentileThreshold}
            renderData={({data}) => (
              <Flex center>
                <PokemonIngredientIcons ingredients={[data.productions]}/>
                <Flex direction="row" center className="gap-1">
                  <GenericIngredientIcon alt={textIngredientCount}/>
                  <div>{formatFloat(data.value)}</div>
                </Flex>
              </Flex>
            )}
          >
            <div className="text-2xl">
              {formatFloat(rate.count.current)}
            </div>
          </AnalysisStatsContinuousUI>
          <AnalysisStatsContinuousUI
            stats={rate.energy}
            linkedIconKey={({data, pokemonId}) => (
              `${pokemonId}-${data.productions.map(({id, qty}) => `${id}x${qty}`).join('-')}`
            )}
            title={
              <Flex direction="row" center className="gap-1.5">
                <PokemonIngredientIcon dimension="size-6" id={rate.itemId}/>
                <ColoredEnergyIcon alt={textIngredientEnergy}/>
                {textIngredientEnergy}
              </Flex>
            }
            threshold={percentileThreshold}
            renderData={({data}) => (
              <Flex center>
                <PokemonIngredientIcons ingredients={[data.productions]}/>
                <Flex direction="row" center className="gap-1 text-sm">
                  <ColoredEnergyIcon alt={textIngredientEnergy}/>
                  <div>{formatFloat(data.value)}</div>
                </Flex>
              </Flex>
            )}
          >
            <div className="text-2xl">
              {formatFloat(rate.energy.current)}
            </div>
          </AnalysisStatsContinuousUI>
        </React.Fragment>
      ))}
      <AnalysisStatsContinuousUI
        stats={producingRate.ingredient.overall}
        title={
          <Flex direction="row" center className="gap-1.5">
            <ColoredEnergyIcon alt={textIngredientEnergy}/>
            {textIngredientEnergy}
          </Flex>
        }
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1 text-sm">
            <ColoredEnergyIcon alt={textIngredientEnergy}/>
            <div>{formatFloat(data)}</div>
          </Flex>
        )}
      >
        <div className="text-2xl">
          {formatFloat(producingRate.ingredient.overall.current)}
        </div>
      </AnalysisStatsContinuousUI>
      <AnalysisStatsContinuousUI
        stats={producingRate.skillTrigger}
        title={
          <Flex direction="row" center className="gap-1.5">
            <MainSkillTriggerValueIcon alt={textSkillTriggerValue}/>
            {textSkillTriggerValue}
          </Flex>
        }
        threshold={percentileThreshold}
        renderData={({data}) => (
          <Flex direction="row" center className="gap-1 text-sm">
            <MainSkillTriggerValueIcon alt={textSkillTriggerValue}/>
            <div>{formatFloat(data)}</div>
          </Flex>
        )}
      >
        <div className="text-2xl">
          {formatFloat(producingRate.skillTrigger.current)}
        </div>
      </AnalysisStatsContinuousUI>
    </AnalysisStatsLayout>
  );
};
