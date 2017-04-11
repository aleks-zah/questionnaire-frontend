// @flow
import { partialReducer as entitiesPartialReducer } from 'redux-ntities';
import questionsReducer from '../pages/questionnaire/reducers/questions';
import pagesReducer from '../pages/questionnaire/reducers/pages';
import { createReducer } from './utils';

export type EntitiesStateType = {
    TEMPLATE: Array<TemplateType>,
    QUESTIONNAIRE: Array<QuestionnaireType>
};

/* eslint-disable flowtype/require-parameter-type */
export default createReducer({}, {
    ...entitiesPartialReducer,
    ...questionsReducer,
    ...pagesReducer,
});
