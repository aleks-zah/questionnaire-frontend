// @flow
import { createSelector } from 'reselect';
import { filter, compose } from 'ramda';
import type { OwnQuestionnairePagePropsType } from '../../pages/questionnaire';
import type { StateType } from '../../reducers';
import { QUESTIONNAIRE } from '../entities';
import { mapConditionType } from '../business/question-condition';
import { questionnaireIdSelector } from '../../device-specific/selectors';

export const questionnairesSelector = (state: StateType): Array<QuestionnaireType> =>
    state.entities[QUESTIONNAIRE] || [];

export const currentQuestionnaireSelector: Selector<StateType, OwnQuestionnairePagePropsType, $Shape<QuestionnaireType>> = // eslint-disable-line
    (state: StateType, props: OwnQuestionnairePagePropsType): $Shape<QuestionnaireType> => createSelector(
        questionnairesSelector,
        (questionnaires: Array<QuestionnaireType>): $Shape<QuestionnaireType> =>
        questionnaires.find((q: QuestionnaireType): boolean => q.id === questionnaireIdSelector(props)) || {},
    )(state, props);

const hydrateEntity = (entityLookup: Array<*>) => (entityIds: Array<string>) =>
    entityIds.map((id: string): * => entityLookup.find((e: *) => e.id === id));

const filterQuestionsByConditions = (questions: Array<QuestionnaireQuestionType>) => {
    const mapQuestionConditionType = mapConditionType(questions);

    return filter((question: QuestionnaireQuestionType) => {
        if (typeof question.condition === 'object') {
            const maybeCondition = mapQuestionConditionType[question.condition.type];

            if (typeof maybeCondition !== 'function') {
                throw new Error(`Cant recognize following field existence condition: ${question.condition.type}`);
            }

            return maybeCondition(question);
        }

        return true;
    }, questions);
};

export const questionnaireSelectorDenormalized =
    (state: StateType, props: OwnQuestionnairePagePropsType): $Shape<QuestionnaireType> => {
        const questionnaire: $Shape<QuestionnaireType> = currentQuestionnaireSelector(state, props);

        if (!Array.isArray(questionnaire.sections)) {
            return questionnaire;
        }

        const prepareQuestions = compose(filterQuestionsByConditions, hydrateEntity(questionnaire.questions));
        const preparePages = hydrateEntity(questionnaire.pages);
        const sections = hydrateEntity(questionnaire.sectionsEntities)(questionnaire.sections);

        return {
            ...questionnaire,
            sections: sections.map((section: $Shape<QuestionnaireSectionType>) => ({
                ...section,
                pages: preparePages(section.pages).map((page: QuestionnairePageType) => ({
                    ...page,
                    questions: prepareQuestions(page.questions),
                })),
            })),
        };
    };
