// @flow
import type { ConditionType } from '../template/question';

export type QuestionAnswerType = string | number;

export type QuestionOptionsType = {
    MIN?: number,
    MAX?: number,
    EXTENSIONS: Array<string>,
    ALLOW_MULTIPLE: boolean
};

export type QuestionnaireQuestionType = {
    type: 'question',
    value: Array<QuestionAnswerType> | QuestionAnswerType,
    title: string,
    description: string,
    questionType: string,
    renderer: string,
    required: boolean,
    id: string,
    options: QuestionOptionsType,
    condition: ConditionType
};
