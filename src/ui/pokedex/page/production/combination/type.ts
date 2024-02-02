import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {TranslatedUserSettings} from '@/types/userData/settings';
import {PokemonDataProps} from '@/ui/pokedex/page/type';


export type PokemonProductionCombinationCommonProps = PokemonDataProps & {
  input: PokemonIndividualParams,
  translatedSettings: TranslatedUserSettings,
};
