import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {RatingBasis} from '@/types/game/pokemon/rating/config';
import {PokemonProducingRate, ProducingRateSingleParams} from '@/types/game/producing/rate';
import {toSum} from '@/utils/array';
import {getSkillTriggerValue} from '@/utils/game/mainSkill/utils';
import {getTotalStrengthOfPokemonProducingRate} from '@/utils/game/producing/reducer/sum';


type GetRatingBasisValueOpts = {
  rate: PokemonProducingRate,
  basis: RatingBasis,
  pokemonProducingParams: PokemonProducingParams,
  singleParams: ProducingRateSingleParams,
};

export const getRatingBasisValue = ({
  rate,
  basis,
  pokemonProducingParams,
  singleParams,
}: GetRatingBasisValueOpts): number => {
  if (basis === 'totalProduction') {
    return getTotalStrengthOfPokemonProducingRate(rate);
  }

  if (basis === 'ingredientCount') {
    return toSum(Object.values(rate.ingredient).map(({qty}) => qty.equivalent));
  }

  if (basis === 'ingredientProduction') {
    return toSum(Object.values(rate.ingredient).map(({strength}) => strength.equivalent));
  }

  if (basis === 'skillTriggerValue') {
    return getSkillTriggerValue({
      rate,
      skillValue: pokemonProducingParams.skillValue,
      ...singleParams,
    });
  }

  throw new Error(`Unhandled rating basis - ${basis satisfies never}`);
};
