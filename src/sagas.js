// @flow
import { spawn } from 'redux-saga/effects';
import { watchQuestionBlur } from './pages/questionnaire/sagas/questions';
import { watchPageNext } from './pages/questionnaire/sagas/pages';

export default function* root(): Generator<*, *, *> {
    yield [
        spawn(watchQuestionBlur),
        spawn(watchPageNext),
    ];
}
