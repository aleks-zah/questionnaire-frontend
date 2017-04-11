export type QuestionnaireSectionType = {
    type: 'section',
    current: boolean,
    id: string,
    title: string,
    description: string,
    pages: Array<string>
}
