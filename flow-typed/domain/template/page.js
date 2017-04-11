// @flow
import type { QuestionType } from './question';

export type PageType = {
    type: 'page',
    title: string,
    id: string,
    questions: Array<QuestionType>
};


