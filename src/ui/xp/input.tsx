import React from 'react';

import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {InputBox} from '@/components/input/box';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {Flex} from '@/components/layout/flex/common';
import {NumberSliderRequired} from '@/components/shared/input/number/required/withSlider';
import {PokemonClickableIcons} from '@/components/shared/pokemon/icon/clickable/main';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {defaultExpType} from '@/const/game/xp';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {PokemonExpCalculatorCommonProps, PokemonExpCalculatorInput} from '@/ui/xp/type';
import {getDefaultExpRequired, getPokemonExpValueData} from '@/ui/xp/utils';
import {toPokemonList} from '@/utils/game/pokemon/utils';


export const PokemonExpCalculatorInputUI = ({
  xpValueData,
  filter,
  setFilter,
}: PokemonExpCalculatorCommonProps) => {
  const {
    currentLv,
    xpToNext,
    ownedCandies,
    rate,
    pokemon,
    nature,
  } = filter;
  const {pokedexMap} = useCommonServerData();

  const t = useTranslations('UI.InPage.PokemonExp');

  return (
    <Flex className="info-section">
      <AdsUnit hideIfNotBlocked/>
      <PokemonClickableIcons
        pokemonList={toPokemonList(pokedexMap).filter(({expType}) => expType !== defaultExpType)}
        isActive={(id) => id === pokemon}
        onClick={({id}) => setFilter((original) => ({
          ...original,
          pokemon: id,
        } satisfies PokemonExpCalculatorInput))}
      >
        {(getClassName) => (
          <button className={getClassName(pokemon === null)} onClick={() => setFilter((original) => ({
            ...original,
            pokemon: null,
          }))}>
            <Flex center noFullWidth className="size-14">{t('OtherPokemon')}</Flex>
          </button>
        )}
      </PokemonClickableIcons>
      <PokemonLevelSlider
        value={currentLv}
        setValue={(currentLv) => setFilter((original) => ({
          ...original,
          currentLv,
        }))}
      />
      <InputRowWithTitle noFixedTitleWidth title={
        <Flex noFullWidth center className="w-60">
          {t('ExpToNext')}
        </Flex>
      }>
        <Flex direction="row" center className="gap-1">
          <InputBox
            type="number"
            value={xpToNext.toString()}
            onChange={({target}) => setFilter((original) => ({
              ...original,
              xpToNext: parseInt(target.value || '0'),
            }))}
          />
          <button
            className="button-clickable-bg size-6 p-1"
            onClick={() => setFilter((original): PokemonExpCalculatorInput => {
              const expData = getPokemonExpValueData({
                pokemonId: original.pokemon,
                pokedexMap,
                xpValueData,
              });
              if (!expData) {
                return original;
              }

              return {
                ...original,
                xpToNext: getDefaultExpRequired({
                  level: original.currentLv,
                  expData,
                }),
              };
            })}
          >
            <ArrowPathIcon/>
          </button>
        </Flex>
      </InputRowWithTitle>
      <InputRowWithTitle noFixedTitleWidth title={
        <Flex noFullWidth center className="w-60">
          {t('OwnedCandies')}
        </Flex>
      }>
        <Flex direction="row" center className="gap-1">
          <InputBox
            type="number"
            value={ownedCandies.toString()}
            onChange={({target}) => setFilter((original) => ({
              ...original,
              ownedCandies: parseInt(target.value || '1'),
            }))}
          />
          <button className="button-clickable-bg size-6 p-1" onClick={() => setFilter((original) => ({
            ...original,
            ownedCandies: 0,
          }))}>
            <ArrowPathIcon/>
          </button>
        </Flex>
      </InputRowWithTitle>
      <PokemonNatureSelector
        nature={nature}
        setNature={(nature) => setFilter((original) => ({
          ...original,
          nature,
        }))}
        classNameForHeight="h-8"
      />
      <NumberSliderRequired
        text={t('Multiplier.ExpBoost')}
        value={rate.candyExpBoost}
        setValue={(candyExpBoost) => setFilter(({rate, ...original}) => ({
          ...original,
          rate: {
            ...rate,
            candyExpBoost,
          },
        }))}
        max={5}
        noSameLine
      />
      <NumberSliderRequired
        text={t('Multiplier.DreamShardDepletion')}
        value={rate.dreamShardDepletion}
        setValue={(dreamShardDepletion) => setFilter(({rate, ...original}) => ({
          ...original,
          rate: {
            ...rate,
            dreamShardDepletion,
          },
        }))}
        max={10}
        noSameLine
      />
    </Flex>
  );
};
