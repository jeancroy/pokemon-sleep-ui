import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {HorizontalSplitter, VerticalSplitter} from '@/components/shared/common/splitter';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {IngredientIcons} from '@/components/shared/ingredient/icons/main';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {RatingBasisIcon} from '@/components/shared/pokemon/rating/basis/icon';
import {ratingExtremaDisplayMax} from '@/components/shared/pokemon/rating/const';
import {getFormattedRatingValue} from '@/components/shared/pokemon/rating/utils';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {RatingBasis} from '@/types/game/pokemon/rating/config';
import {RatingExtrema} from '@/types/game/pokemon/rating/result';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';


type Props = {
  level: number,
  extrema: RatingExtrema | undefined,
  subSkillMap: SubSkillMap,
  icon: React.ReactNode,
  basis: RatingBasis | undefined,
  className: string,
};

export const RatingDataPointUI = ({level, extrema, subSkillMap, icon, basis, className}: Props) => {
  if (!extrema) {
    return null;
  }

  const {value, combinations} = extrema;

  return (
    <Flex center className={clsx('gap-1.5 rounded-lg p-2', className)}>
      <Flex direction="row" noFullWidth className={clsx(
        'items-center gap-0.5 text-2xl',
        basis === 'totalStrength' && 'text-energy',
      )}>
        <div className="size-7">
          {icon}
        </div>
        <VerticalSplitter className="mx-1 self-stretch"/>
        {basis && <RatingBasisIcon basis={basis}/>}
        <span>{getFormattedRatingValue({basis, value})}</span>
      </Flex>
      <HorizontalSplitter className="w-full"/>
      <CompletionResultUI
        completed={Math.min(combinations.length, ratingExtremaDisplayMax)}
        total={combinations.length}
        className="self-end"
      />
      <Grid className={clsx(
        'gap-1.5',
        'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3',
        'xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6',
      )}>
        {combinations.slice(0, 50).map(({
          pokemonId,
          ingredients,
          nature,
          subSkill,
        }, idx) => (
          <Flex key={idx} direction="row" center className="bg-plate gap-1.5">
            <div className="relative size-12 shrink-0">
              <PokemonImage
                pokemonId={pokemonId}
                image={{type: 'default', image: 'icon'}}
                isShiny={false}
                className="rounded-lg"
              />
            </div>
            <Flex center noFullWidth className="gap-1">
              <div className="h-6">
                <IngredientIcons ingredients={[ingredients]} dimension="size-5" classOfText="text-base"/>
              </div>
              <div className="h-6">
                <PokemonNatureIndicator nature={nature}/>
              </div>
              <div className="h-6">
                <PokemonSubSkillIndicator
                  subSkill={subSkill}
                  subSkillMap={subSkillMap}
                  level={level}
                />
              </div>
            </Flex>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
};
