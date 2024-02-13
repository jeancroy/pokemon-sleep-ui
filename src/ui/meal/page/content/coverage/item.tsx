import React from 'react';

import {useTranslations} from 'next-intl';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextImage} from '@/components/shared/common/image/main';
import {MealCoverageSummary} from '@/components/shared/meal/coverage/summary';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {specialtyIdMap} from '@/const/game/pokemon';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {PokemonInfo} from '@/types/game/pokemon';
import {MealContentCoverageItemData} from '@/ui/meal/page/content/coverage/type';


type Props = {
  entry: MealContentCoverageItemData,
  showPokemon: (pokemon: PokemonInfo) => void,
};

export const MealContentCoverageItem = ({entry, showPokemon}: Props) => {
  const {calcResult, coverage} = entry;
  const {pokemon, ingredients} = calcResult;
  const {id, specialty} = pokemon;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <AnimatedCollapse show appear className="button-clickable-bg">
      <FlexButton noFullWidth={false} onClick={() => showPokemon(pokemon)} className="group relative">
        <Flex noFullWidth className="absolute bottom-1 right-1 z-10 items-end">
          <PokemonIngredientIcons ingredients={[ingredients]} noLink dimension="size-4" className="gap-1 text-sm"/>
          <MealCoverageSummary coverage={coverage} dimension="size-5"/>
        </Flex>
        <Flex direction="row" className="h-full items-center gap-1.5 p-1.5 opacity-50">
          <IconWithInfo
            imageSrc={`/images/pokemon/icons/${id}.png`}
            imageAlt={t(`PokemonName.${id}`)}
            imageDimension="size-12"
            imageSizes={imageIconSizes}
            info={
              specialty === specialtyIdMap.ingredient &&
              <div className="relative size-4">
                <NextImage
                  src="/images/generic/flash.png" alt={t2('Specialty')}
                  sizes={imageSmallIconSizes} className="invert-on-light"
                />
              </div>
            }
          />
        </Flex>
      </FlexButton>
    </AnimatedCollapse>
  );
};
