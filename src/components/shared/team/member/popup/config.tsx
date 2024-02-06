import React from 'react';

import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {PokemonIntentionalFullPackInput} from '@/components/shared/pokemon/inventory/fullPack/input';
import {PokemonConfig} from '@/components/shared/pokemon/predefined/config/main';
import {TeamMemberProps} from '@/components/shared/team/member/type';


export const TeamMemberConfig = (props: TeamMemberProps) => {
  const {
    member,
    setMember,
  } = props;
  const {pokemonId, name} = member;

  const t = useTranslations('UI.UserSettings');
  const t2 = useTranslations('Game');

  const alwaysFullPack = member.alwaysFullPack ?? null;

  return (
    <Flex noFullWidth className="gap-1.5 sm:w-[60vw]">
      <InputBox
        value={name ?? ''}
        type="text"
        placeholder={t2(`PokemonName.${pokemonId}`)}
        className="w-full"
        onChange={({target}) => setMember({name: target.value || null})}
      />
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
