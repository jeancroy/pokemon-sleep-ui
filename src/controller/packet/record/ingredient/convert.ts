import {packetRecordIngredientIndexToLevel} from '@/controller/packet/record/ingredient/const';
import {PokedexInternalIdMap} from '@/types/game/pokemon';
import {PokemonIngredientFromPacket} from '@/types/packet/record/ingredient';
import {PacketUpdatePokemonData} from '@/types/packet/update/pokemon';


type ToPacketUpdatePokemonDataOpts = {
  packet: PacketUpdatePokemonData,
  pokedexInternalIdMap: PokedexInternalIdMap,
};

export const toPacketUpdatePokemonData = ({
  packet,
  pokedexInternalIdMap,
}: ToPacketUpdatePokemonDataOpts): PokemonIngredientFromPacket[] => {
  const {pid, pic, num} = packet;

  const pokemonId = pokedexInternalIdMap[num];
  if (!pokemonId) {
    return [];
  }

  return pic.map(({item, num}, idx) => ({
    pokemonUniqueId: pid,
    pokemonId,
    ingredientLevel: packetRecordIngredientIndexToLevel[idx],
    ingredientId: Number(item),
    ingredientQuantity: num,
  }));
};
