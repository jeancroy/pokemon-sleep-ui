import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {SleepStyleBrief} from '@/components/shared/sleepStyle/components/brief';
import {SleepdexLookupDataEntry} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';
import {SleepdexLookupResultCellDetails} from '@/ui/sleepStyle/sleepdex/lookup/result/cellDetail';
import {SleepdexLookupResultCommonProps} from '@/ui/sleepStyle/sleepdex/lookup/result/type';


type Props = SleepdexLookupResultCommonProps & {
  data: SleepdexLookupDataEntry,
  onClick: () => void,
};

export const SleepdexLookupResultCell = ({display, data, onClick}: Props) => {
  const {id} = data.pokemon;

  const t = useTranslations('Game');

  return (
    <div className="relative">
      <Flex noFullWidth className="absolute bottom-1 left-1 z-10 gap-0.5">
        <SleepdexLookupResultCellDetails display={display} data={data}/>
      </Flex>
      <FlexButton
        noFullWidth={false}
        onClick={onClick}
        className={clsx(
          'group justify-end gap-1.5 rounded-lg p-1',
          'bg-slate-50 hover:bg-slate-100/50 dark:bg-slate-600/50 hover:dark:bg-slate-600',
        )}
      >
        <SleepStyleBrief
          sleepStyle={data.sleepStyle}
          className="absolute left-1 top-1 z-10 text-sm"
          iconDimension="size-4"
          textShadow
        />
        <div className="relative size-16 opacity-70">
          <PokemonImage
            pokemonId={id}
            image={{type: 'default', image: 'icon'}}
            isShiny={false}
            alt={t(`PokemonName.${id}`)}
            className="rounded-lg"
          />
        </div>
      </FlexButton>
    </div>
  );
};
