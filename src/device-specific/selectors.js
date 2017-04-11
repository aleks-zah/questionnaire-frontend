// @flow
import type { OwnQuestionnairePagePropsType } from '../pages/questionnaire';
import type { OwnStartPagePropsType } from '../pages/start';
import type { HandleQuestionBlurActionType } from '../pages/questionnaire/actions/questions';
import type { RouterParamsType } from '../pages/questionnaire/sagas/sync';
import type { HandleClickPageActionType } from '../pages/questionnaire/actions/page';

export const questionnaireIdSelector = (props: OwnQuestionnairePagePropsType): string => props.params.questionnaireId;

export const templateIdSelector = (props: OwnStartPagePropsType): string => props.params.templateId;

export const createQuestionRouterProps = (requestData: HandleQuestionBlurActionType): RouterParamsType => ({
    params: {
        questionnaireId: requestData.qid,
    },
});

export const createPageRouterProps = (requestData: HandleClickPageActionType): RouterParamsType => ({
    params: {
        questionnaireId: requestData.questionnaireId,
    },
});
