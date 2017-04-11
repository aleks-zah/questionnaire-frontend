// @flow
import styled from 'styled-components';
import Page from '../page';
import type { HandlersWithDispatchType } from '../question/handlers';
import type { PageHandlersWithDispatchType } from '../page/handlers';
import type { SharedMetaType } from '../../index';

type HandlersType = { handlers: {
    question: HandlersWithDispatchType,
    page: PageHandlersWithDispatchType
}};

type MetaType = { meta: SharedMetaType };

type PropsType = QuestionnaireSectionType & HandlersType & MetaType;

const SectionStyled = styled.div`
    margin: 0 22px;
    padding: 22px 0;
`;

const Title = styled.h3`
    font-size: 18px;
    text-align: center;
    padding: 0 0 10px 0;
`;

const Section = (props: PropsType) =>
    <SectionStyled>
        <Title>{props.title}</Title>
        {props.pages.map((page: QuestionnairePageType) =>
            <Page
                {...page}
                handlers={props.handlers}
                key={page.id}
                meta={props.meta}
            />,
        )}
    </SectionStyled>;

export default Section;
