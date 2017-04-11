// @flow
import styled from 'styled-components';
import { withProps } from 'recompose';
import Question from '../question';
import type { SharedMetaType } from '../../index';
import type { HandlersWithDispatchType } from '../question/handlers';
import type { PageHandlersWithDispatchType } from './handlers';
import { getButtons } from './buttons';

type HandlersType = {
    page: PageHandlersWithDispatchType,
    question: HandlersWithDispatchType
};

type MetaType = { meta: SharedMetaType };

export type PagePropsType = QuestionnairePageType & HandlersType & MetaType;

const PageWrapper = styled.div`
    padding: 15px;
    margin: 20px 0;
    background: #f6f6f6;
`;

const Title = styled.h1`
    font-size: 18px;
    padding: 10px 0;
`;

const PageBody = styled.div`
    pointer-events: ${(props: PagePropsType) => props.current ? 'all' : 'none'};
    opacity: ${(props: PagePropsType) => props.current ? '1' : '0.6'};
`;

const PageActions = styled.div`
    border-top: 1px solid #e1e9f0;
    padding: 10px 0 0 0;
    margin: 10px 0 0 0;
    display: flex;
    justify-content: flex-end;
`;

const Page = (props: PagePropsType) =>
    <PageWrapper>
        <PageBody current={props.current}>
            <Title>{props.title}</Title>
            {props.questions.map((question: QuestionnaireQuestionType) =>
                <Question
                    {...question}
                    handlers={props.handlers.question}
                    key={question.id}
                />,
            )}
        </PageBody>
        <PageActions>
            <props.ButtonsComponent {...props} />
        </PageActions>
    </PageWrapper>;

export default withProps((ownerProps: PagePropsType) => ({
    ...ownerProps,
    ButtonsComponent: getButtons(ownerProps),
}))(Page);
