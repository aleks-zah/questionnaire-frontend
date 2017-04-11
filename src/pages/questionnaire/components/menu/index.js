// @flow
import styled from 'styled-components';
import MenuItem from './menu-item';

type MenuPropsType = {
    sections: Array<QuestionnaireSectionType>
};

const MenuList = styled.ul`
    height: 100%;
    position: fixed;
    width: 250px;
    background: #fff;
    z-index: 2;
    padding: 0;
    margin: 0;
`;

const Menu = (props: MenuPropsType): React$Element<*> =>
    <MenuList>
        {props.sections.map((section: QuestionnaireSectionType) => <MenuItem {...section} key={section.id} />)}
    </MenuList>;

export default Menu;
