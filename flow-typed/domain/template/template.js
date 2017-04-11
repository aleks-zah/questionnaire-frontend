// @flow
import type { SectionType } from './section';

type Sections = { sections: Array<SectionType> };

type TemplateBaseType = {
    id: string,
    title: string,
    type: 'template'
};

export type TemplateType = TemplateBaseType & Sections;
