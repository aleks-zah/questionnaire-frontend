// @flow
import styled from 'styled-components';
import { hasProp } from '../../../../../utils/core';
import type { QuestionPropsType } from '../index';

const DescriptionStyled = styled.div`
    font-size: 14px;
    padding: 10px 0;
    color: gray;
`;

const Description = (props: QuestionPropsType) => <DescriptionStyled>{props.description}</DescriptionStyled>;

export default hasProp('description')(Description);
