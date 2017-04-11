// @flow
import { select, put } from 'redux-saga/effects';
import { actions as entitiesActions } from 'redux-ntities';
import { currentQuestionnaireSelector } from '../../../domain/questionnaire/selector';
import { QUESTIONNAIRE } from '../../../domain/entities';
import getConfigProp from '../../../config/index';

export type RouterParamsType = {
    params: {
        questionnaireId: string
    }
};

export function* syncSaga(routerParams: RouterParamsType): Generator<*, *, *> {
    try {
        const currentQuestionnaire = yield select(currentQuestionnaireSelector, routerParams);

        const requestEntity = {
            entity: {
                url: `${getConfigProp('backendUrl')}/templates/${currentQuestionnaire.templateId}/q/${currentQuestionnaire.id}`,
                entityName: QUESTIONNAIRE,
                id: currentQuestionnaire.id,
            },
            payload: currentQuestionnaire,
        };

        yield put(entitiesActions.syncStart(requestEntity));
    } catch (err) {
        console.error(err);
    }
}
