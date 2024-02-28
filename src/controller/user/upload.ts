import {updateAnnouncements} from '@/controller/announcement/main';
import {addDoc, deleteDoc, updateDoc} from '@/controller/docs';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {updatePacketRecordingConfig} from '@/controller/packet/config';
import {addSinglePokeInBox, deleteSinglePokeInBox, upsertSinglePokeInBox} from '@/controller/pokebox/main';
import {getPokedexMap} from '@/controller/pokemon/info';
import {addSleepdexRecord, removeSleepdexRecord} from '@/controller/sleepdex';
import {
  addActivationDataByAdsClick,
  removeActivationDataByKey,
  updateActivationDataByKey,
} from '@/controller/user/activation/data';
import {updateActivationKeyByKey} from '@/controller/user/activation/key';
import {updateActivationPresets} from '@/controller/user/activation/preset';
import {
  userDataCookingConfig,
  userDataPokeboxDisplay,
  userDataPokedex,
  userDataUserConfig,
  userProductionComparisonConfig,
  userRatingConfig,
} from '@/controller/user/manager';
import {updateProductionComparisonPresets} from '@/controller/user/productionComparison/preset';
import {addTeamAnalysisComp, updateTeamAnalysisComps} from '@/controller/user/teamAnalysis/comp';
import {updateTeamAnalysisConfig} from '@/controller/user/teamAnalysis/config';
import {UserDataUploadOpts} from '@/types/userData/upload';
import {invalidateDocsPathCaching} from '@/utils/docs';
import {toTeamAnalysisCompFromPokebox} from '@/utils/team/toComp';
import {toActivationProperties} from '@/utils/user/activation/utils';


type UploadUserDataOpts = {
  userId: string,
  opts: UserDataUploadOpts,
};

export const uploadUserData = async ({userId, opts}: UploadUserDataOpts) => {
  const {type, data} = opts;

  if (type === 'pokedex') {
    await userDataPokedex.setData(userId, data);
    return;
  }

  if (type === 'pokebox.display') {
    await userDataPokeboxDisplay.setData(userId, data);
    return;
  }

  if (type === 'pokebox.create') {
    await addSinglePokeInBox(userId, data);
    return;
  }

  if (type === 'pokebox.upsert') {
    await upsertSinglePokeInBox(userId, data);
    return;
  }

  if (type === 'pokebox.delete') {
    await deleteSinglePokeInBox(userId, data);
    return;
  }

  if (type === 'sleepdex.mark') {
    await addSleepdexRecord(userId, data);
    return;
  }

  if (type === 'sleepdex.unmark') {
    await removeSleepdexRecord(userId, data);
    return;
  }

  if (type === 'teamAnalysis') {
    const {config, comps} = data;

    await Promise.all([
      updateTeamAnalysisConfig({userId, config}),
      updateTeamAnalysisComps({userId, comps}),
    ]);
    return;
  }

  if (type === 'productionComparison') {
    const {config, presets} = data;

    await Promise.all([
      userProductionComparisonConfig.setData(userId, config),
      updateProductionComparisonPresets({userId, presets}),
    ]);
    return;
  }

  if (type === 'team.maker.export') {
    const [
      pokedexMap,
      ingredientChainMap,
    ] = await Promise.all([
      getPokedexMap(),
      getIngredientChainMap(),
    ]);

    await addTeamAnalysisComp({
      userId,
      comp: toTeamAnalysisCompFromPokebox({
        pokedexMap,
        ingredientChainMap,
        ...data,
      }),
    });
    return;
  }

  if (type === 'config.cooking') {
    await userDataCookingConfig.setData(userId, data);
    return;
  }

  if (type === 'config.bundle') {
    const {userConfig, cookingConfig} = data;
    await Promise.all([
      userDataUserConfig.setData(userId, userConfig),
      userDataCookingConfig.setData(userId, cookingConfig),
    ]);
    return;
  }

  if (type === 'config.rating') {
    await userRatingConfig.setData(userId, data);
    return;
  }

  if (type === 'admin.activation.update.key') {
    const {key} = data;
    await updateActivationKeyByKey({
      key,
      executorUserId: userId,
      ...toActivationProperties(data),
    });
    return;
  }

  if (type === 'admin.activation.update.data') {
    const {key} = data;
    await updateActivationDataByKey({
      key,
      executorUserId: userId,
      ...toActivationProperties(data),
    });
    return;
  }

  if (type === 'admin.activation.delete') {
    await removeActivationDataByKey({executorUserId: userId, key: data});
    return;
  }

  if (type === 'admin.activation.adClick') {
    await addActivationDataByAdsClick({executorUserId: process.env.NEXTAUTH_ADMIN_UID, userId});
    return;
  }

  if (type === 'admin.activation.preset.update') {
    await updateActivationPresets({executorUserId: userId, data});
    return;
  }

  if (type === 'admin.announcements') {
    await updateAnnouncements({executorUserId: userId, data});
    return;
  }

  if (type === 'admin.packets') {
    await updatePacketRecordingConfig({executorUserId: userId, updated: data});
    return;
  }

  if (type === 'cms.docs.create') {
    await addDoc({executorUserId: userId, doc: data});
    invalidateDocsPathCaching(data);
    return;
  }

  if (type === 'cms.docs.edit') {
    await updateDoc({executorUserId: userId, doc: data});
    invalidateDocsPathCaching(data);
    return;
  }

  if (type === 'cms.docs.delete') {
    await deleteDoc({executorUserId: userId, ...data});
    return;
  }

  console.error(`Unhandled user data upload type: [${type satisfies never}]`);
};
