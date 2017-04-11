// @flow
import { fetchHOCCreator } from 'redux-ntities';
import { mapEntitiesToRestUrl, entityIdSelector } from '../../domain/entities';

export default fetchHOCCreator({
    useCache: true,
    mapEntitiesToRestUrl,
    entityIdSelector,
});
