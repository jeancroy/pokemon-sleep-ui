import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex';
import {imageIconSizes} from '@/styles/image';
import {PokemonId} from '@/types/mongo/pokemon';
import {EnergyTeamInputProps, EnergyTeamSlotNames, energyTeamSlotNames} from '@/ui/energy/team/type';


type Props = EnergyTeamInputProps & {
  isIncluded: FilterInclusionMap<PokemonId>,
};

export const EnergyTeamSelectablePokemon = ({setFilter, isIncluded, pokemon}: Props) => {
  const t = useTranslations('Game');

  const putOnTeam = (id: PokemonId) => () => {
    setFilter((filter) => {
      let slotToInsert: EnergyTeamSlotNames | null = null;

      for (const slotName of energyTeamSlotNames) {
        if (filter.team[slotName]) {
          continue;
        }
        slotToInsert = slotName;
        break;
      }

      return {
        ...filter,
        team: {
          ...filter.team,
          [slotToInsert ?? 'E']: {
            pokemonId: id,
            level: 1,
          },
        },
      };
    });
  };

  return (
    <Flex direction="row" center wrap className="gap-1.5">
      {pokemon
        .filter(({id}) => isIncluded[id])
        .map(({id, type}) => (
          <button key={id} onClick={putOnTeam(id)} className="button-clickable relative rounded-lg p-1">
            <div className="absolute left-0.5 top-0.5 z-10">
              <div className="relative h-5 w-5">
                <Image
                  src={`/images/type/${type}.png`} alt={t(`PokemonType.${type}`)} fill
                  className="drop-shadow-thick" sizes={imageIconSizes}
                />
              </div>
            </div>
            <div className="relative h-14 w-14 opacity-70">
              <Image
                src={`/images/pokemon/icons/${id}.png`} alt={t(`PokemonName.${id}`)}
                fill sizes={imageIconSizes}
              />
            </div>
          </button>
        ))}
    </Flex>
  );
};
