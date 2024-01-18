import {friendshipLevelToGoldLock} from '@/const/game/subskill';
import {
  FriendshipLevelOfGoldLock,
  PokemonSubSkill,
  PokemonSubSkillLevel,
  pokemonSubSkillLevel,
  SubSkillData,
  SubSkillId,
} from '@/types/game/pokemon/subSkill';
import {combineIterator} from '@/utils/compute/combination';


type GeneratePossiblePokemonSubSkillOpts = {
  level: number,
  subSkillData: SubSkillData[],
  friendshipLevel: FriendshipLevelOfGoldLock,
};

export function* generatePossiblePokemonSubSkills({
  level,
  subSkillData,
  friendshipLevel,
}: GeneratePossiblePokemonSubSkillOpts): Generator<PokemonSubSkill> {
  const validLevels = pokemonSubSkillLevel
    .filter((subSkillLevel) => level >= subSkillLevel);

  if (!validLevels.length) {
    yield {};
    return;
  }

  const goldLock = friendshipLevelToGoldLock[friendshipLevel];

  for (const combination of combineIterator(subSkillData, validLevels.length)) {
    if (
      goldLock &&
      combination.filter(({rarity}) => rarity === 3).length < goldLock
    ) {
      continue;
    }

    yield Object.fromEntries(
      combination.map((data, idx) => [
        validLevels[idx] satisfies PokemonSubSkillLevel,
        data.id satisfies SubSkillId,
      ]),
    );
  }
}
