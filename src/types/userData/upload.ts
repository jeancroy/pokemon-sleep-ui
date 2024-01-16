import {RatingConfig} from '@/types/game/pokemon/rating/config';
import {SleepdexData} from '@/types/game/sleepdex';
import {ActivationDataAtClient, ActivationKeyAtClient} from '@/types/mongo/activation';
import {ActivationPresetMap} from '@/types/mongo/activationPreset';
import {AnnouncementClientMap} from '@/types/mongo/announcement';
import {DocsData, DocsDataEditable, DocsDataEditableFetched} from '@/types/mongo/docs';
import {PacketRecordingSettings} from '@/types/packet/settings';
import {UserCookingPreset} from '@/types/userData/cooking';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {UserSettingsBundle} from '@/types/userData/settings';
import {UserTeamAnalysisContent} from '@/types/userData/teamAnalysis';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';
import {ToTeamAnalysisCompFromPokeboxCommonOpts} from '@/utils/team/type';


export type UserDataUploadOpts = {
  type: 'pokedex',
  data: PokedexDisplay,
} | {
  type: 'pokebox.display',
  data: PokeboxViewerDisplay,
} | {
  type: 'pokebox.create' | 'pokebox.upsert',
  data: PokeInBox,
} | {
  type: 'pokebox.delete',
  data: PokeInBox['uuid'],
} | {
  type: 'sleepdex.mark' | 'sleepdex.unmark',
  data: SleepdexData,
} | {
  type: 'teamAnalysis',
  data: UserTeamAnalysisContent,
} | {
  type: 'team.maker.export',
  data: ToTeamAnalysisCompFromPokeboxCommonOpts,
} | {
  type: 'cooking',
  data: UserCookingPreset,
} | {
  type: 'rating',
  data: RatingConfig,
} | {
  type: 'settings',
  data: UserSettingsBundle,
} | {
  type: 'admin.activation.update.key',
  data: ActivationKeyAtClient,
} | {
  type: 'admin.activation.update.data',
  data: ActivationDataAtClient,
} | {
  type: 'admin.activation.delete',
  data: string,
} | {
  type: 'admin.activation.adClick',
  data?: never,
} | {
  type: 'admin.activation.preset.update',
  data: ActivationPresetMap,
} | {
  type: 'admin.announcements',
  data: AnnouncementClientMap,
} | {
  type: 'admin.packets',
  data: PacketRecordingSettings,
} | {
  type: 'cms.docs.create',
  data: DocsDataEditable,
} | {
  type: 'cms.docs.edit',
  data: DocsDataEditableFetched,
} | {
  type: 'cms.docs.delete',
  data: Pick<DocsData, 'locale' | 'path'>,
};
