import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonIntentionalFullPackInput} from '@/components/shared/pokemon/inventory/fullPack/input';
import {PokemonConfig} from '@/components/shared/pokemon/predefined/config/main';
import {TeamMemberProps} from '@/components/shared/team/member/type';


export const TeamMemberConfig = (props: TeamMemberProps) => {
  const {
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
        onDataUpdated={(update) => setMember(update)}
        showSeeds
      />
      <PokemonIntentionalFullPackInput
        title={t('AlwaysFullPack')}
        alwaysFullPack={alwaysFullPack}
        setAlwaysFullPack={(berryPokemonAlwaysFullPack) => (
          setMember({alwaysFullPack: berryPokemonAlwaysFullPack})
        )}
      />
    </Flex>
  );
};
