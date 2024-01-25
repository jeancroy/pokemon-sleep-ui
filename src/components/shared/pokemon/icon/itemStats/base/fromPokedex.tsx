import React from 'react';

import {useTranslations} from 'next-intl';

import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonItemStatsList} from '@/components/shared/pokemon/icon/itemStats/base/list';
import {PokemonItemStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/base/type';
import {usePokemonProducingStats} from '@/components/shared/pokemon/icon/itemStats/worker/hook';
import {PokemonItemStatsWorkerOpts} from '@/components/shared/pokemon/icon/itemStats/worker/type';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {usePokemonProducingRateSingleDisplay} from '@/components/shared/pokemon/production/single/hook';
import {PokemonProducingRateSingleDisplaySwitch} from '@/components/shared/pokemon/production/single/input';
import {PokemonProducingRateSingle} from '@/components/shared/pokemon/production/single/main';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';


type Props = PokemonItemStatsWorkerOpts & PokemonItemStatsCommonProps & {
  itemAlt: string,
  itemImageSrc: string,
  isProductionIncluded?: (productions: IngredientProduction[]) => boolean,
};

export const PokemonItemStatsFromPokedex = (props: Props) => {
  const {
    getItemRate,
    getIcon,
    targetSpecialty,
    itemAlt,
    itemImageSrc,
    isProductionIncluded,
  } = props;

  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const producingStats = usePokemonProducingStats(props);
  const control = usePokemonProducingRateSingleDisplay();

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex.Info');

  return (
    <Flex className="info-section gap-2">
      <PokemonLinkPopup state={state} setState={setState}/>
      <PokemonProducingRateSingleDisplaySwitch
        control={control}
        itemAlt={itemAlt}
        itemImageSrc={itemImageSrc}
      />
      <PokemonItemStatsList
        getItemRate={getItemRate}
        producingStats={producingStats}
        isProductionIncluded={isProductionIncluded}
        className="button-clickable-bg"
        toItem={({
          pokemon,
          ingredients,
          dailyTotalEnergy,
          itemRate,
        }) => {
          const {id, specialty} = pokemon;

          return (
            <FlexButton noFullWidth={false} onClick={() => showPokemon(pokemon)} className="group relative">
              <Flex noFullWidth className="absolute bottom-1 right-1 z-10">
                <PokemonProducingRateSingle
                  rate={itemRate}
                  display={control.display}
                  getIcon={(dimension) => getIcon(pokemon, dimension)}
                  infoAtTotal={<PokemonIngredientIcons key="ingredients" ingredients={[ingredients]} noLink/>}
                  dailyTotalEnergy={dailyTotalEnergy}
                />
              </Flex>
              <Flex direction="row" className="h-full items-center gap-1.5 p-1.5 opacity-40">
                <IconWithInfo
                  imageSrc={`/images/pokemon/icons/${id}.png`}
                  imageAlt={t(`PokemonName.${id}`)}
                  imageDimension="size-12"
                  imageSizes={imageIconSizes}
                  info={
                    specialty === targetSpecialty &&
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
          );
        }}
      />
    </Flex>
  );
};
