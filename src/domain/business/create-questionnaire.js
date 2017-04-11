// @flow
import { normalize } from 'normalizr';
import { head, values, prop, lensIndex, compose, lensProp } from 'ramda';
import { view } from 'ramda-lens';
import uuid from 'uuid';
import { templateSchema } from '../entities';
import { STATUS } from '../questionnaire';
import validateTemplate from './validate-template';

type MapType<E> = { [string]: E };

const createNewQuestionnaireBase = (template: TemplateType): QuestionnaireBaseType => ({
    type: 'questionnaire',
    id: uuid(),
    created: new Date(),
    lastUpdated: new Date(),
    status: STATUS.IN_PROGRESS,
    title: template.title,
    templateId: prop('id', template),
});

const leaveOnlyFirstPage = (sections: Array<SectionType>): Array<SectionType> =>
    sections.map((section: SectionType, index: number): SectionType => ({
        ...section,
        pages: [head(section.pages)],
        allPages: section.pages,
        current: index === 0,
    }));

const setCurrentPage = (pages: MapType<PageType>): Array<PageType> =>
    values(pages).map((page: PageType, index: number) => ({
        ...page,
        current: index === 0,
    }));

const firstSectionSelector = view(compose(lensIndex(0), lensProp('id')));

const createQuestionnaireFromTemplate = (template: TemplateType | {}): QuestionnaireType => {
    const validTemplate: TemplateType = validateTemplate(template);
    const normalized = normalize(validTemplate, templateSchema).entities;
    const questionnaire: QuestionnaireBaseType = createNewQuestionnaireBase(validTemplate);
    const sectionsEntities = leaveOnlyFirstPage(values(normalized.section));
    const sections = [firstSectionSelector(sectionsEntities)];

    return {
        ...questionnaire,
        sectionsEntities,
        sections,
        pages: setCurrentPage(normalized.page),
        questions: values(normalized.question),
    };
};

export default createQuestionnaireFromTemplate;
