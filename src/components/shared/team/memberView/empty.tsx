import React from 'react';

import {InboxArrowDownIcon} from '@heroicons/react/24/outline';
import CloudArrowDownIcon from '@heroicons/react/24/outline/CloudArrowDownIcon';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {PokeboxImporter} from '@/components/shared/pokebox/importer/main';
import {PokeboxImporterDataProps} from '@/components/shared/pokebox/importer/type';
import {PokemonVanillaPopup} from '@/components/shared/pokemon/vanillaPopup/main';
import {TeamMemberCloudPull} from '@/components/shared/team/memberView/cloudPull';
import {
  TeamMemberCloudPullProps,
  TeamMemberEmptySlotPopupType,
  TeamMemberEmptySlotProps,
} from '@/components/shared/team/memberView/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetupSetMemberOpts} from '@/types/game/team/update';
import {SessionStatus} from '@/types/session';
import {Nullable} from '@/utils/type';


type Props<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>
> = PokeboxImporterDataProps & TeamMemberCloudPullProps<TMember> & TeamMemberEmptySlotProps<TKey, TMember> & {
  pokemonList: PokemonInfo[],
  memberKey: TKey,
  sessionStatus: SessionStatus,
  setCurrentMember: (opts: TeamSetupSetMemberOpts<TKey, TMember>) => void,
};

export const TeamMemberEmptySlot = <TKey extends TeamMemberKey, TMember extends Nullable<TeamMemberData>>({
  pokemonList,
  memberKey,
  sessionStatus,
  getMemberFromVanilla,
  getMemberFromPokeInBox,
  setCurrentMember,
  ...props
}: Props<TKey, TMember>) => {
  const [popup, setPopup] = React.useState<TeamMemberEmptySlotPopupType | null>(null);

  const buttonClass = 'enabled:button-clickable-bg disabled:button-disabled p-1 size-9';
  const buttonDisabled = sessionStatus !== 'authenticated';

  return (
    <Flex center className="info-section-bg gap-1.5 rounded-lg p-3">
      <PokeboxImporter
        show={popup === 'pokebox'}
        setShow={(show) => setPopup(show ? 'pokebox' : null)}
        onPokeboxPicked={(pokeInBox) => {
          setCurrentMember({
            key: memberKey,
            member: getMemberFromPokeInBox(pokeInBox, memberKey),
          });
          setPopup(null);
        }}
        {...props}
      />
      <PopupCommon
        show={popup === 'cloudPull'}
        setShow={(show) => setPopup(show ? 'cloudPull' : null)}
      >
        <TeamMemberCloudPull
          onCloudPulled={(member) => {
            setCurrentMember({key: memberKey, member});
            setPopup(null);
          }}
          {...props}
        />
      </PopupCommon>
      <PokemonVanillaPopup
        show={popup === 'vanilla'}
        setShow={(show) => setPopup(show ? 'vanilla' : null)}
        pokemonList={pokemonList}
        onPokemonSelected={(pokemon) => {
          setCurrentMember({
            key: memberKey,
            member: getMemberFromVanilla(pokemon, memberKey),
          });
          setPopup(null);
        }}
        {...props}
      />
      <UnavailableIcon/>
      <Flex direction="row" center className="gap-1.5">
        <button className={buttonClass} onClick={() => setPopup('vanilla')}>
          <PlusCircleIcon/>
        </button>
        <button className={buttonClass} disabled={buttonDisabled} onClick={() => setPopup('pokebox')}>
          <InboxArrowDownIcon/>
        </button>
        <button className={buttonClass} disabled={buttonDisabled} onClick={() => setPopup('cloudPull')}>
          <CloudArrowDownIcon/>
        </button>
      </Flex>
    </Flex>
  );
};
