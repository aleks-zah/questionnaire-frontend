// @flow
import { withHandlers, compose } from 'recompose';
import { pick } from 'ramda';
import styled from 'styled-components';
import withState from '../../hoc/withState';

export type InputPropsType = {
    value: number | string,
    updateValue?: () => void,
    handleBlur?: () => void
};

export const whitelistInputProps = (props: $Shape<InputPropsType>) => pick([
    'value',
    'onChange',
    'onBlur',
], props);

export const inputEnhancer = compose(
    withState('value', 'updateValue', (props: $Shape<InputPropsType>) => props.value || ''),
    withHandlers({
        onChange: (props: $Shape<InputPropsType>) => (event: SyntheticInputEvent): void => {
            if (typeof props.updateValue === 'function') {
                props.updateValue(event.target.value);
            }
        },
        onBlur: (props: $Shape<InputPropsType>) => (event: SyntheticInputEvent): void => {
            if (typeof props.handleBlur === 'function') {
                props.handleBlur(event.target.value);
            }
        },
    }),
);

export const InputStyled = styled.input`
    border: 1px solid #b2bbcb;
    height: 35px;
    font-size: 16px;
    padding: 5px 15px 0 15px;
    font-weight: 400;
    font-family: Hind, Arial, Helvetica, sans-serif;
    color: #6a6a6a;
    width: 100%;
`;
