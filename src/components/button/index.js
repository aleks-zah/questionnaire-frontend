// @flow
import Ink from 'react-ink';
import { identity } from 'ramda';
import styled from 'styled-components';

type ButtonPropsType = {
    title: string,
    action?: () => void,
    primary?: boolean, // eslint-disable-line
    start?: boolean // eslint-disable-line
};

const ButtonStyled = styled.button`
    position: relative;
    background: ${(props: ButtonPropsType) => props.primary ? '#0fb0c0' : '#f9fbfd'};
    font-size: 16px;
    font-weight: 700;
    color: ${(props: ButtonPropsType) => props.primary ? 'white' : '#32393f'};
    padding: 15px 30px;
    cursor: pointer;
    outline: 0;
    border: ${(props: ButtonPropsType) => props.primary ? '2px solid #0fb0c0' : '2px solid #b9c6d1'};
    font-family: Hind, Arial, Helvetica, sans-serif;
    text-transform: uppercase;
    min-width: ${(props: ButtonPropsType) => props.start ? '400px' : '120px'};
    margin: 0 0 0 15px;
    box-sizing: border-box;
`;

const Button = (props: ButtonPropsType) =>
    <ButtonStyled onClick={props.action} {...props}>
        <Ink />
        {props.title}
    </ButtonStyled>;

Button.defaultProps = {
    action: identity,
    primary: false,
    start: false,
};

export default Button;
