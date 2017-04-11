// @flow
import { compose, lensProp } from 'ramda';
import { mapped, set } from 'ramda-lens';
import { QUESTION_BLUR } from '../actions/questions';
import type { HandleQuestionBlurActionType } from '../actions/questions';
import { QUESTIONNAIRE } from '../../../domain/entities';
import { lensWithId } from '../../../utils/core';
import type { EntitiesStateType } from '../../../reducers/entities';

const updateQuestion = (action: HandleQuestionBlurActionType, state: $Shape<EntitiesStateType>) => {
    const valueLens = compose(
        lensProp(QUESTIONNAIRE),
        mapped,
        lensProp('questions'),
        lensWithId(action.id),
        lensProp('value'),
    );

    return set(valueLens, action.value, state);
};

/* eslint-disable flowtype/require-parameter-type */
export default {
    [QUESTION_BLUR]: (state, action) => updateQuestion(action, state),
};
