// @flow
import { takeLatest, call } from 'redux-saga/effects';
import { QUESTION_BLUR } from '../actions/questions';
import type { HandleQuestionBlurActionType } from '../actions/questions';
import { createQuestionRouterProps } from '../../../device-specific/selectors';
import { syncSaga } from './sync';

function* questionBlurSaga(requestData: HandleQuestionBlurActionType): Generator<*, *, *> {
    yield call(syncSaga, createQuestionRouterProps(requestData));
}

export function* watchQuestionBlur(): Generator<*, *, *> {// eslint-disable-line
    yield takeLatest(QUESTION_BLUR, questionBlurSaga);
}
