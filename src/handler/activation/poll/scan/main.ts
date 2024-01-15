import {activationSourceToText} from '@/const/activation/common';
import {removeActivationBatch, updateActivationPropertiesFromPayloads} from '@/controller/user/activation/util';
import {ActivationPayloadConverter, ActivationScanResult} from '@/handler/activation/poll/scan/type';
import {ActionSendActivationPayload} from '@/handler/activation/send/type';
import {ActivationSource} from '@/types/mongo/activation';


type ScanActivationsOpts<TMember> = {
  source: ActivationSource,
  data: ActivationScanResult<TMember>,
  toPayload: ActivationPayloadConverter<TMember>,
  toSendActivationActions: (
    payloads: Promise<ActionSendActivationPayload>[],
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
  console.log(`>>> Activation poll requested for source: ${sourceText}`);
  console.log(`- Pending activations: ${toSendActivation.length}`);
  console.log(`- Pending expiry updates: ${toUpdateExpiry.length}`);
  console.log(`- Pending deactivations: ${toDeactivate.length}`);
  console.log('Pending activations:', JSON.stringify(toSendActivation));
  console.log('Pending expiry updates', JSON.stringify(toUpdateExpiry));
  console.log('Pending deactivations', JSON.stringify(toDeactivate));
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
  console.log(`>>> Activation poll completed for source: ${sourceText}`);
  /* eslint-enable no-console */

  return Response.json({}, {status: 200});
};
