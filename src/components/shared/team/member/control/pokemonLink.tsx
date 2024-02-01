import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {teamMemberControlButtonStyle} from '@/components/shared/team/member/control/const';
import {TeamMemberProps} from '@/components/shared/team/member/type';


export const TeamMemberControlPokemonLink = ({pokemon, showPokemon}: TeamMemberProps) => {
  const t = useTranslations('UI.Metadata.Pokedex');
  const t2 = useTranslations('Game.PokemonName');

  return (
    <button onClick={() => showPokemon(pokemon)} className={teamMemberControlButtonStyle}>
      <GenericPokeballIcon
        alt={t('Main.Page.Title', {name: t2(pokemon.id.toString())})}
        noWrap
      />
    </button>
  );
};
