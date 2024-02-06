import {activationSourceToText} from '@/const/activation/common';
import {removeActivationBatch, updateActivationPropertiesFromPayloads} from '@/controller/user/activation/utils';
import {ActivationPayloadConverter, ActivationScanResult} from '@/handler/activation/poll/scan/type';
import {ActivationSendingPayload} from '@/handler/activation/send/type';
import {ActivationSource} from '@/types/mongo/activation';


type ScanActivationsOpts<TMember> = {
  source: ActivationSource,
  data: ActivationScanResult<TMember>,
  toPayload: ActivationPayloadConverter<TMember>,
  toSendActivationActions: (
    payloads: Promise<ActivationSendingPayload>[],
    sourceText: string,
  ) => Promise<void>[],
};

export const scanActivations = async <TMember>({
  source,
  data,
  toPayload,
  toSendActivationActions,
}: ScanActivationsOpts<TMember>) => {
  const {
    toUpdateExpiry,
    toSendActivation,
    toDeactivate,
  } = data;

  const sourceText = activationSourceToText[source];

  /* eslint-disable no-console */
  console.info(`>>> Activation poll requested for source: ${sourceText}`);
  console.info(`- Pending activations: ${toSendActivation.length}`);
  console.info(`- Pending expiry updates: ${toUpdateExpiry.length}`);
  console.info(`- Pending deactivations: ${toDeactivate.length}`);
  console.info('Pending activations:', JSON.stringify(toSendActivation));
  console.info('Pending expiry updates', JSON.stringify(toUpdateExpiry));
  console.info('Pending deactivations', JSON.stringify(toDeactivate));
  /* eslint-enable no-console */

  await Promise.all([
    ...toSendActivationActions(
      toSendActivation.map((member) => toPayload({member})),
      sourceText,
    ),
    // Update expiry
    updateActivationPropertiesFromPayloads({
      source,
      payloads: await Promise.all(toUpdateExpiry.map(async (member) => (
        await toPayload({member})
      ))),
    }),
    // Remove activations
    removeActivationBatch({
      filter: {key: {$in: toDeactivate.map(({key}) => key)}},
    }),
  ]);

  /* eslint-disable no-console */
  console.info(`>>> Activation poll completed for source: ${sourceText}`);
  /* eslint-enable no-console */

  return Response.json({}, {status: 200});
};
