'use client';
import React from 'react';

import {v4} from 'uuid';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {Pokebox, PokeInBox} from '@/types/userData/pokebox';
import {useCalculatedData} from '@/ui/team/pokebox/client/hook/main';
import {PokeboxContent} from '@/ui/team/pokebox/content/main';
import {PokeInBoxEditPopup} from '@/ui/team/pokebox/editor/main';
import {PokeInBoxEditorState} from '@/ui/team/pokebox/editor/type';
import {PokeboxPickerInput} from '@/ui/team/pokebox/picker/main';
import {PokeboxServerDataProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerInput} from '@/ui/team/pokebox/viewer/main';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {getSortedSubSkills} from '@/utils/game/subSkill/sort';
import {toPokebox} from '@/utils/team/pokebox/toPokebox';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxServerDataProps & {
  pokeInBoxList: PokeInBox[],
};

export const PokeboxLoadedClient = (props: Props) => {
  const {pokeInBoxList} = props;

  const serverData = useCommonServerData();
  const {pokedexMap, subSkillMap} = serverData;

  const {act, session} = useUserDataActor({
    statusToast: true,
  });

  const [loading, setLoading] = React.useState(false);
  // Keeping a local copy of the pokebox so no need to lazy load the whole box on every change
  // Not doing so could potentially create large unnecessary I/Os for large Pokebox
  const [pokebox, setPokebox] = React.useState<Pokebox>(toPokebox(pokeInBoxList));
  const [editingPokeInBox, setEditingPokeInBox] = React.useState<PokeInBoxEditorState>();

  const {
    calculatedConfigBundle,
    filter,
    setFilter,
    processedPokebox,
  } = useCalculatedData({
    ...props,
    ...serverData,
    pokebox,
    session,
    setLoading,
  });

  const pokemonList = React.useMemo(
    () => toPokemonList(pokedexMap),
    [pokedexMap],
  );
  const subSkillList = React.useMemo(
    () => getSortedSubSkills(Object.values(subSkillMap).filter(isNotNullish)),
    [subSkillMap],
  );

  return (
    <Flex className="gap-1.5">
      <PokeInBoxEditPopup
        pokebox={Object.fromEntries(
          // Using `source.extra.uuid` to get the original poke-in-box
          // so the content opened in the edit popup won't have preview level, if active
          processedPokebox.map(({source}) => [source.extra.uuid, pokebox[source.extra.uuid]]),
        )}
        onUpdateCompleted={(updated) => {
          if (act) {
            act({action: 'upload', options: {type: 'pokebox.upsert', data: updated}});
            setPokebox((original) => ({
              ...original,
              [updated.uuid]: updated,
            }));
          }
          setEditingPokeInBox(undefined);
        }}
        onCopyPokeInBox={(copyBase) => {
          if (act) {
            const uuid = v4();
            const duplicate = {...copyBase, uuid};

            act({action: 'upload', options: {type: 'pokebox.upsert', data: copyBase}});
            act({action: 'upload', options: {type: 'pokebox.create', data: duplicate}});
            setPokebox((original) => ({
              ...original,
              [copyBase.uuid]: copyBase,
              [uuid]: duplicate,
            }));
          }
          setEditingPokeInBox(undefined);
        }}
        onRemovePokeInBox={(toRemove) => {
          if (act) {
            act({action: 'upload', options: {type: 'pokebox.delete', data: toRemove}});
            setPokebox((original) => {
              const updated = {...original};
              delete updated[toRemove];

              return updated;
            });
          }
          setEditingPokeInBox(undefined);
        }}
        editingPokeInBox={editingPokeInBox}
        setEditingPokeInBox={setEditingPokeInBox}
        {...props}
      />
      <Flex className="gap-1.5">
        <PokeboxPickerInput
          {...props}
          pokemonList={pokemonList}
          onClick={(pokemonId) => setEditingPokeInBox({action: 'create', pokemonId})}
        />
        <PokeboxViewerInput
          {...props}
          pokemonList={pokemonList}
          subSkillList={subSkillList}
          filter={filter}
          setFilter={setFilter}
          session={session.data}
        />
      </Flex>
      <AdsUnit hideIfNotBlocked/>
      <PokeboxContent
        filter={filter}
        setFilter={setFilter}
        loading={loading}
        totalPokeInBox={Object.values(pokebox).filter(isNotNullish).length}
        processedPokebox={processedPokebox}
        setEditingPokeInBox={setEditingPokeInBox}
        bundle={calculatedConfigBundle.bundle}
        {...props}
      />
      <AdsUnit/>
    </Flex>
  );
};
