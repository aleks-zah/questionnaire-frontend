// @flow
import { schema } from 'normalizr';
import getConfigProp from '../config/index';
import type { OwnStartPagePropsType } from '../pages/start';
import type { OwnQuestionnairePagePropsType } from '../pages/questionnaire';
import { questionnaireIdSelector, templateIdSelector } from '../device-specific/selectors';

export const TEMPLATE = 'TEMPLATE';
export const QUESTIONNAIRE = 'QUESTIONNAIRE';

export const entityIdSelector = {
    [TEMPLATE]: (props: OwnStartPagePropsType): string => templateIdSelector(props),
    [QUESTIONNAIRE]: (props: OwnQuestionnairePagePropsType): string => questionnaireIdSelector(props),
};

export const mapEntitiesToRestUrl = {
    [TEMPLATE]: (props: OwnStartPagePropsType): string => `${getConfigProp('backendUrl')}/templates/${entityIdSelector[TEMPLATE](props)}`,
    [QUESTIONNAIRE]: (props: OwnQuestionnairePagePropsType): string =>
        `${getConfigProp('backendUrl')}/templates/${entityIdSelector[TEMPLATE](props)}/q/${entityIdSelector[QUESTIONNAIRE](props)}`,
};

export const syncEntityIdSelector = {
    [QUESTIONNAIRE]: (questionnaire: QuestionnaireType): string => questionnaire.id,
};

export const mapEntitiesToSyncRestUrl = {
    [QUESTIONNAIRE]: (props: OwnStartPagePropsType, questionnaire: QuestionnaireType): string =>
        `${getConfigProp('backendUrl')}/templates/${entityIdSelector[TEMPLATE](props)}/q/${questionnaire.id}`,
};

const question = new schema.Entity('question');

export const page = new schema.Entity('page', {
    questions: [question],
});
const section = new schema.Entity('section', {
    pages: [page],
});

export const templateSchema = new schema.Entity('template', {
    sections: [section],
});
