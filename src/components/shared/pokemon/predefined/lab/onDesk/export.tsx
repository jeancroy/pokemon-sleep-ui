import React from 'react';

import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonOnDeskExportState, PokemonOnDeskState} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {toPokeInBox} from '@/components/shared/pokemon/predefined/lab/onDesk/utils';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  setup: PokemonOnDeskState,
  pokemon: PokemonInfo,
  pokemonMaxLevel: number,
};

export const PokemonOnDeskExportButton = ({setup, pokemon, pokemonMaxLevel}: Props) => {
  const [state, setState] = React.useState<PokemonOnDeskExportState>({
    level: 1,
    name: null,
    show: false,
  });
  const {act, status} = useUserDataActor();
  const t = useTranslations('UI.Metadata');
  const t2 = useTranslations('Game');

  React.useEffect(() => {
    if (status === 'completed') {
      setState((original) => ({
        ...original,
        name: null,
        show: false,
      }));
    }
  }, [status]);

  const {level, name, show} = state;

  return (
    <>
      <PopupCommon show={show} setShow={(show) => setState((original) => ({...original, show}))}>
        <Flex className="max-w-2xl gap-2 overflow-hidden sm:min-w-[24rem]">
          <InputBox
            value={name ?? ''}
            type="text"
            placeholder={t2(`PokemonName.${pokemon.id}`)}
            className="w-full"
            onChange={({target}) => setState((original) => ({
              ...original,
              name: target.value || null,
            }))}
          />
          <PokemonLevelSlider
            max={pokemonMaxLevel}
            value={level}
            setValue={(level) => setState((original) => ({
              ...original,
              level,
            }))}
            noSameLine
          />
          <Flex>
            <button
              className="button-clickable-bg disabled:button-disabled ml-auto p-1"
              disabled={status === 'processing'}
              onClick={() => {
                if (!act) {
                  return;
                }

                act({
                  action: 'upload',
                  options: {
                    type: 'pokebox.create',
                    data: toPokeInBox({
                      pokemon,
                      name,
                      level,
                      setup,
                    }),
                  },
                });
              }}
            >
              <div className="size-8">
                <UserActionStatusIcon status={status}/>
              </div>
            </button>
          </Flex>
        </Flex>
      </PopupCommon>
      <button
        className="button-clickable-bg disabled:button-disabled w-32 p-1"
        disabled={!act || status === 'processing'}
        onClick={() => setState((original) => ({...original, show: true}))}
      >
        <Flex direction="row" center className="group gap-1">
          {status !== 'waiting' ?
            <div className="size-9">
              <UserActionStatusIcon status={status}/>
            </div> :
            <>
              <ArrowTopRightOnSquareIcon className="size-9"/>
              <GenericIconLarger
                src="/images/generic/pokebox.png"
                alt={t('Team.Box.Title')}
                dimension="size-9"
              />
            </>}
        </Flex>
      </button>
    </>
  );
};
