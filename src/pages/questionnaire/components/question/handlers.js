// @flow
import type { Dispatch } from 'redux';
import { identity } from 'ramda';
import { handleQuestionBlur } from '../../actions/questions';
import type { QuestionnairePropsType } from '../../index';
import { mapRendererToValueTransform } from './utils';

export const handleBlur = (
    dispatch: Dispatch<*>,
    questionnaireProps: QuestionnairePropsType,
    props: QuestionnaireQuestionType,
) => (value: string | number): void => {
    const maybeTransform = mapRendererToValueTransform[props.renderer];
    const valueTransform = typeof maybeTransform === 'undefined' ? identity : maybeTransform;

    dispatch(handleQuestionBlur(props.id, questionnaireProps.questionnaire.id, valueTransform(value)));
};

export type HandlersWithDispatchType = (QuestionnaireQuestionType) => {
    handleBlur: () => void
};

const handlers = (dispatch: Dispatch<*>, questionnaireProps: QuestionnairePropsType) =>
    (props: QuestionnaireQuestionType) => ({
        handleBlur: handleBlur(dispatch, questionnaireProps, props),
    });

export default handlers;
