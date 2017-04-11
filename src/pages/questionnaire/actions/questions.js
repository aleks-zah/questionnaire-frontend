// @flow
export const QUESTION_BLUR = 'QUESTION_BLUR';

export type HandleQuestionBlurActionType = {
    type: 'QUESTION_BLUR',
    id: string,
    qid: string,
    value: string | number
};

export const handleQuestionBlur = (id: string, qid: string, value: string | number): HandleQuestionBlurActionType => ({
    type: QUESTION_BLUR,
    id,
    qid,
    value,
});
