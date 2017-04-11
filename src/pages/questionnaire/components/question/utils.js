// @flow
import { InputText, InputNumber, InputEmail, Area, RadioHorizontal } from '../../../../device-specific/components';

const renderers = {
    INPUT_TEXT: 'INPUT_TEXT',
    INPUT_NUMBER: 'INPUT_NUMBER',
    INPUT_EMAIL: 'INPUT_EMAIL',
    RADIO_HORIZONTAL: 'RADIO_HORIZONTAL',
};

export const mapRendererToComponentContainer = {
    [renderers.INPUT_TEXT]: () => InputText,
    [renderers.INPUT_EMAIL]: () => InputEmail,
    [renderers.INPUT_NUMBER]: () => InputNumber,
    [renderers.RADIO_HORIZONTAL]: () => RadioHorizontal,
};

export const getNestedComponent = (
    renderer: string,
    options: QuestionOptionsType,
): () => React$Element<*> => {
    const getComponent = mapRendererToComponentContainer[renderer];

    return typeof getComponent === 'function' ? getComponent(options) : Area;
};

// transforms raw HTMLInputEvent value to the persistable value
export const mapRendererToValueTransform = {
    [renderers.INPUT_NUMBER]: (value: string | number): number => parseInt(value, 10),
};
