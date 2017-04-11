// @flow
import { takeLatest, call } from 'redux-saga/effects';
import { CLICK_NEXT_PAGE, CLICK_EDIT_PAGE, CLICK_EDIT_CANCEL_PAGE, CLICK_EDIT_CONFIRM_PAGE } from '../actions/page';
import type { HandleClickPageActionType } from '../actions/page';
import { createPageRouterProps } from '../../../device-specific/selectors';
import { syncSaga } from './sync';

function* clickPageActionSaga(requestData: HandleClickPageActionType): Generator<*, *, *> {
    yield call(syncSaga, createPageRouterProps(requestData));
}

export function* watchPageNext(): Generator<*, *, *> {// eslint-disable-line
    yield takeLatest(CLICK_NEXT_PAGE, clickPageActionSaga);
    yield takeLatest(CLICK_EDIT_PAGE, clickPageActionSaga);
    yield takeLatest(CLICK_EDIT_CANCEL_PAGE, clickPageActionSaga);
    yield takeLatest(CLICK_EDIT_CONFIRM_PAGE, clickPageActionSaga);
}

