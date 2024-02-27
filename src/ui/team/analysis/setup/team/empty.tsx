import React from 'react';

import {InboxArrowDownIcon} from '@heroicons/react/24/outline';
import CloudArrowDownIcon from '@heroicons/react/24/outline/CloudArrowDownIcon';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {PokeboxImporter} from '@/components/shared/pokebox/importer/main';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {PokemonVanillaPopup} from '@/components/shared/pokemon/vanillaPopup/main';
import {PokemonInfo} from '@/types/game/pokemon';
import {TeamMemberData} from '@/types/game/team/member';
import {TeamAnalysisCloudPull} from '@/ui/team/analysis/popup/cloudPull';
import {TeamAnalysisEmptySlotPopupType} from '@/ui/team/analysis/setup/team/type';


type Props = PokeboxImporterCommonProps & {
  pokemonList: PokemonInfo[],
  onCloudPulled: (member: TeamMemberData) => void,
  onPokemonSelected: (pokemon: PokemonInfo) => void,
};

export const TeamAnalysisEmptySlot = ({
  pokemonList,
  onCloudPulled,
  onPokemonSelected,
  ...props
}: Props) => {
  const [popup, setPopup] = React.useState<TeamAnalysisEmptySlotPopupType | null>(null);
  const {status} = useSession();

  const buttonClass = 'enabled:button-clickable-bg disabled:button-disabled p-1 size-9';
  const buttonDisabled = status !== 'authenticated';

  return (
    <Flex center className="info-section-bg gap-1.5 rounded-lg p-3">
      <PokeboxImporter
        show={popup === 'pokebox'}
        setShow={(show) => setPopup(show ? 'pokebox' : null)}
        {...props}
      />
      <PopupCommon
        show={popup === 'cloudPull'}
        setShow={(show) => setPopup(show ? 'cloudPull' : null)}
      >
        <TeamAnalysisCloudPull onCloudPulled={onCloudPulled}/>
      </PopupCommon>
      <PokemonVanillaPopup
        show={popup === 'vanilla'}
        setShow={(show) => setPopup(show ? 'vanilla' : null)}
        pokemonList={pokemonList}
        onPokemonSelected={onPokemonSelected}
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
