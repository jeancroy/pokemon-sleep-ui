import {PokemonDetailedProductionTabs} from '@/components/shared/pokemon/production/stats/tabs/type';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const pokemonDetailedProductionTabsI18nId: {
  [tab in PokemonDetailedProductionTabs]: I18nMessageKeysOfNamespace<'UI.Component.PokemonDetailedProduction.Tab'>
} = {
  dailyBreakdown: 'DailyBreakdown',
  energyCurve: 'EnergyCurve',
  atEnergy: 'AtEnergy',
};
