import React from 'react';

import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import {clsx} from 'clsx';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientRate} from '@/components/shared/pokemon/production/params/ingredient';
import {PokemonMainSkillTriggerRate} from '@/components/shared/pokemon/production/params/skillRate';
import {trustedDataCount} from '@/const/game/producingParams';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {Dimension} from '@/types/style';
import {ProducingParamsBar} from '@/ui/info/production/client/bar';
import {ProducingParamsMaximum} from '@/ui/info/production/client/type';
import {formatInt} from '@/utils/number/format/regular';


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
  const {dataCount} = params;

  const dimension: Dimension = 'size-5';

  return (
    <AnimatedCollapseQuick show={show} className="button-clickable-glow">
      <FlexButton noFullWidth={false} onClick={onPokemonClicked} direction="col" className="group">
        <Flex direction="row" className={clsx(
          'items-center gap-1 p-1',
          dataCount < trustedDataCount && 'text-danger',
        )}>
          <div className="relative size-10 shrink-0">
            <PokemonImage
              pokemonId={pokemonInfo.id}
              image={{type: 'default', image: 'icon'}}
              isShiny={false}
              className="rounded-lg"
            />
          </div>
          <Flex center className="gap-1">
            <Flex noFullWidth direction="row" className="items-center gap-0.5 self-end">
              <DocumentTextIcon className="size-4"/>
              <div>{formatInt(dataCount)}</div>
            </Flex>
            <Flex direction="row" className="justify-between gap-1">
              <PokemonIngredientRate params={params} dimension={dimension}/>
              <PokemonMainSkillTriggerRate params={params} dimension={dimension}/>
            </Flex>
          </Flex>
        </Flex>
        <ProducingParamsBar params={params} maximum={maximum}/>
      </FlexButton>
    </AnimatedCollapseQuick>
  );
};
