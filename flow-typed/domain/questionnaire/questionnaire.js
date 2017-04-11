import type { QuestionnairePageType } from './page';
import type { QuestionnaireSectionType } from './section';
import type { QuestionnaireQuestionType } from './question';

export type QuestionnaireStatus = 'IN_PROGRESS' | 'EDITING';

export type QuestionnaireBaseType = {
    type: 'questionnaire',
    id: string,
    templateId: string,
    lastUpdated?: Date,
    created: Date,
    status: QuestionnaireStatus,
    title: string,
}

export type QuestionnaireNestedEntitiesType = {
    sections: Array<QuestionnaireSectionType>,
    pages: Array<QuestionnairePageType>,
    questions: Array<QuestionnaireQuestionType>,
    sectionsEntities: Array<QuestionnaireSectionType>
}

export type QuestionnaireType = QuestionnaireBaseType & QuestionnaireNestedEntitiesType;
