// @flow
import styled from 'styled-components';

const MenuListItem = styled.li`
    color: #374047;
    background: ${(props: QuestionnaireSectionType) => props.current ? '#d4e0e3' : 'none'};
    font-weight: 500;
    font-size: 16px;
    box-sizing: border-box;
    padding: 18px 20px 18px 15px;
    border-right: ${(props: QuestionnaireSectionType) => props.current ? '4px solid #0fb0c0' : '0'};
`;

const MenuItem = (props: QuestionnaireSectionType) =>
    <MenuListItem current={props.current}>{props.title}</MenuListItem>;

export default MenuItem;
