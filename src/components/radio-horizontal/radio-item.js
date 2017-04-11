// @flow
import styled from 'styled-components';

type PropsType = {
    value: string,
    selected: boolean
};

const RadioListItem = styled.li`
    padding: 10px;
    border: ${(props: PropsType) => props.selected ? '2px solid #0fb0c0' : '1px solid #ebebeb'};
    box-sizing: border-box;
    background: white;
    color: ${(props: PropsType) => props.selected ? '#060606' : '#c3c3c3'};
    
    &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-right: ${(props: PropsType) => props.selected ? '2px solid #0fb0c0' : '1px solid transparent'};
    }
    
    &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    
    &:hover {
        color: #060606;
        cursor: pointer;
    }
`;

const RadioHorizontalItem = (props: PropsType) =>
    <RadioListItem selected={props.selected} onClick={props.handleRadioClick(props.value)}>{props.value}</RadioListItem>;

export default RadioHorizontalItem;
