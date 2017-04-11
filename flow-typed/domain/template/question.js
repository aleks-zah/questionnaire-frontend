// @flow
export type RendererType = 'INPUT_STRING' | 'INPUT_INTEGER';

export type ConditionStringType = 'SIBLING_FIELD_IS_EQUAL' | 'SIBLING_FIELD_IS_NOT_EMPTY';

export type ConditionParamsIsEqualType = {
    fieldId: string,
    value: string | number
};

export type ConditionParamsIsNotEmptyType = {
    fieldId: string
};

export type ConditionType = {
    type: ConditionStringType,
    params: ConditionParamsIsEqualType | ConditionParamsIsNotEmptyType
};

export type QuestionType = {
    type: 'question',
    title: string,
    id: string,
    renderer: RendererType,
    condition: ConditionType
};
