// @flow
import { propEq, find, equals, isEmpty } from 'ramda';

const SIBLING_FIELD_IS_EQUAL = 'SIBLING_FIELD_IS_EQUAL';
const SIBLING_FIELD_IS_NOT_EMPTY = 'SIBLING_FIELD_IS_NOT_EMPTY';

export const mapConditionType = (questions: Array<QuestionnaireQuestionType>) => ({
    [SIBLING_FIELD_IS_EQUAL]: (question: QuestionnaireQuestionType): boolean => {
        const donorQuestion = find(propEq('id', question.condition.params.fieldId), questions);

        if (typeof donorQuestion === 'undefined') {
            return true;
        }

        return equals(donorQuestion.value, question.condition.params.value);
    },
    [SIBLING_FIELD_IS_NOT_EMPTY]: (question: QuestionnaireQuestionType) => {
        const donorQuestion = find(propEq('id', question.condition.params.fieldId), questions);

        if (typeof donorQuestion === 'undefined') {
            return true;
        }

        return (typeof donorQuestion.value !== 'undefined') && !isEmpty(donorQuestion.value);
    },
});
