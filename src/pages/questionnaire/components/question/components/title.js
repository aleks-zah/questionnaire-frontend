// @flow
import styled from 'styled-components';
import { hasProp } from '../../../../../utils/core';
import type { QuestionPropsType } from '../index';

const TitleStyled = styled.h3`
    font-size: 16px;
    padding: 10px 0;
`;

const Title = (props: QuestionPropsType) => <TitleStyled>{props.title}</TitleStyled>;

export default hasProp('title')(Title);
