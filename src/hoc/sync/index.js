// @flow
import { syncHOCCreator } from 'redux-ntities';
import { mapEntitiesToSyncRestUrl, syncEntityIdSelector } from '../../domain/entities';

export default syncHOCCreator({
    mapEntitiesToRestUrl: mapEntitiesToSyncRestUrl,
    entityIdSelector: syncEntityIdSelector,
});
