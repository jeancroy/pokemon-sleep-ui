import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {PokemonComplexFilter} from '@/components/shared/pokemon/predefined/complexPicker/main';
import {PokemonComplexFilterOnSelectOpts} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonOnDesk} from '@/components/shared/pokemon/predefined/lab/onDesk/main';
import {PokemonOnDeskCommonProps, PokemonOnDeskState} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {PokemonLabDataProps} from '@/components/shared/pokemon/predefined/lab/type';
import {toOnDeskState} from '@/components/shared/pokemon/predefined/lab/utils';


type Props<TOnDesk extends PokemonOnDeskState> =
  PokemonLabDataProps &
  PokemonOnDeskCommonProps<TOnDesk> &
  {
    renderResult: (initialSetup: TOnDesk) => React.ReactNode,
    onPokemonPicked: (setup: TOnDesk, opts: PokemonComplexFilterOnSelectOpts) => void,
    toState: (onDeskState: PokemonOnDeskState) => TOnDesk,
  };

export const PokemonLab = <TOnDesk extends PokemonOnDeskState>(props: Props<TOnDesk>) => {
  const {
    ingredientChainMap,
    renderResult,
    onPokemonPicked,
    toState,
  } = props;
  const [initialSetup, setInitialSetup] = React.useState<TOnDesk>();

  const onDeskRef = React.useRef<HTMLDivElement>(null);

  const scrollToSetup = () => onDeskRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});

  return (
    <Flex className="gap-1.5">
      <Flex className="gap-1.5 md:flex-row">
        <PokemonComplexFilter {...props} onPokemonPicked={(opts) => {
          const {pokemon} = opts;

          if (initialSetup) {
            scrollToSetup();
          } else {
            setTimeout(scrollToSetup, 500);
          }

          const setup = toState(toOnDeskState({
            ...opts,
            chain: ingredientChainMap[pokemon.ingredientChain],
          }));

          setInitialSetup(setup);

          onPokemonPicked(setup, opts);
        }}/>
        <AnimatedCollapse show={!!initialSetup}>
          {
            initialSetup &&
            <PokemonOnDesk
              ref={onDeskRef}
              initialSetup={initialSetup}
              {...props}
            />
          }
        </AnimatedCollapse>
      </Flex>
      <AnimatedCollapse show={!!initialSetup}>
        {initialSetup && renderResult(initialSetup)}
      </AnimatedCollapse>
    </Flex>
  );
};
