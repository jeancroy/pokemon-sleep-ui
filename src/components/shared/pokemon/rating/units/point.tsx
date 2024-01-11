import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {HorizontalSplitter, VerticalSplitter} from '@/components/shared/common/splitter';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {RatingBasisIcon} from '@/components/shared/pokemon/rating/basis/icon';
import {ratingExtremaDisplayMax} from '@/components/shared/pokemon/rating/const';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {RatingBasis} from '@/types/game/pokemon/rating/config';
import {RatingExtrema} from '@/types/game/pokemon/rating/result';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {formatFloat} from '@/utils/number/format';


type Props = {
  level: PokemonKeyLevel,
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
        basis === 'totalProduction' && 'text-energy',
      )}>
        <div className="h-7 w-7">
          {icon}
        </div>
        <VerticalSplitter className="mx-1 self-stretch"/>
        {basis && <RatingBasisIcon basis={basis}/>}
        <div>{formatFloat(value)}</div>
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
            <div className="relative h-12 w-12 shrink-0">
              <PokemonImage
                pokemonId={pokemonId}
                image={{type: 'default', image: 'icon'}}
                isShiny={false}
                className="rounded-lg"
              />
            </div>
            <Flex center noFullWidth className="gap-1">
              <div className="h-6">
                <PokemonIngredientIcons ingredients={[ingredients]}/>
              </div>
              <div className="h-6">
                <PokemonNatureIndicator nature={nature}/>
              </div>
              <div className="h-6">
                <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap} level={level}/>
              </div>
            </Flex>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
};
