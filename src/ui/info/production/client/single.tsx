import React from 'react';

import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import {clsx} from 'clsx';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {ValueError} from '@/components/shared/error';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientRate} from '@/components/shared/pokemon/production/params/ingredient';
import {PokemonMainSkillTriggerRate} from '@/components/shared/pokemon/production/params/skillRate';
import {PokemonMainSkillValue} from '@/components/shared/pokemon/production/params/skillValue';
import {trustedDataCount} from '@/const/game/producingParams';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {Dimension} from '@/types/style';
import {ProducingParamsBar} from '@/ui/info/production/client/bar';
import {ProducingParamsMaximum} from '@/ui/info/production/client/type';
import {formatFloat, formatFloat3, formatInt} from '@/utils/number/format/regular';


type Props = {
  pokemonInfo: PokemonInfo,
  params: PokemonProducingParams,
  maximum: ProducingParamsMaximum,
  show: boolean,
  onPokemonClicked: () => void,
};

export const ProducingParamsSingle = ({
  pokemonInfo,
  params,
  maximum,
  show,
  onPokemonClicked,
}: Props) => {
  const {
    dataCount,
    skillPercent,
    error,
  } = params;

  const dimension: Dimension = 'size-5';

  return (
    <AnimatedCollapseQuick show={show} className="button-clickable-glow">
      <FlexButton noFullWidth={false} onClick={onPokemonClicked} direction="col" className="group">
        <Flex direction="row" className={clsx(
          'items-center gap-1 p-1',
          dataCount < trustedDataCount && 'text-danger',
        )}>
          <Flex noFullWidth className="relative size-10 shrink-0">
            <PokemonImage pokemonId={pokemonInfo.id} image={{type: 'default', image: 'icon'}} isShiny={false}/>
          </Flex>
          <Flex center className="gap-1">
            <Flex direction="row" className="justify-between gap-1">
              <Flex noFullWidth direction="row" className="items-end gap-1 whitespace-nowrap">
                <PokemonIngredientRate params={params} dimension={dimension}/>
                <ValueError valueError={formatFloat(error.ingredient)} className="text-xs"/>
              </Flex>
              <Flex noFullWidth direction="row" className="items-center gap-0.5">
                <DocumentTextIcon className="size-4"/>
                <div>{formatInt(dataCount)}</div>
              </Flex>
            </Flex>
            <Flex direction="row" className="justify-between gap-1">
              <Flex noFullWidth className={clsx(!skillPercent && 'opacity-20')}>
                <PokemonMainSkillTriggerRate params={params} dimension={dimension}/>
              </Flex>
              <Flex noFullWidth direction="row" className="items-end gap-1">
                <PokemonMainSkillValue params={params} dimension={dimension}/>
                <ValueError valueError={formatFloat3(error.skill)} className="text-xs"/>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <ProducingParamsBar params={params} maximum={maximum}/>
      </FlexButton>
    </AnimatedCollapseQuick>
  );
};
