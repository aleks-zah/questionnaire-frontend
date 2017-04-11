// @flow
import type { PageType } from './page';

export type SectionType = {
    type: 'section',
    title: string,
    id: string,
    pages: Array<PageType>
};
