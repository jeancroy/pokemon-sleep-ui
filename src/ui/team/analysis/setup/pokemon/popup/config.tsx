import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonIntentionalFullPackInput} from '@/components/shared/pokemon/inventory/fullPack/input';
import {PokemonConfig} from '@/components/shared/pokemon/predefined/config/main';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';


export const TeamAnalysisPokemonMemberConfig = (props: TeamAnalysisPokemonProps) => {
  const {
    slotName,
    member,
    setMember,
  } = props;

  const t = useTranslations('UI.UserSettings');

  const alwaysFullPack = member.alwaysFullPack ?? null;

  return (
    <Flex noFullWidth className="gap-1.5 sm:w-[60vw]">
      <PokemonConfig
        {...props}
        data={member}
        onDataUpdated={(update) => setMember(slotName, update)}
        showSeeds
      />
      <PokemonIntentionalFullPackInput
        title={t('AlwaysFullPack')}
        alwaysFullPack={alwaysFullPack}
        setAlwaysFullPack={(berryPokemonAlwaysFullPack) => (
          setMember(slotName, {alwaysFullPack: berryPokemonAlwaysFullPack})
        )}
      />
    </Flex>
  );
};
