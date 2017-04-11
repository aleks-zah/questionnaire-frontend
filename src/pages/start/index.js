// @flow
import { connect } from 'react-redux';
import { compose } from 'ramda';
import styled from 'styled-components';
import type { SyncHandlersMapType } from 'redux-ntities';
import { browserHistory } from 'react-router';
import fetcher from '../../hoc/fetcher';
import sync from '../../hoc/sync';
import { TEMPLATE, QUESTIONNAIRE } from '../../domain/entities';
import { currentTemplateSelector } from '../../domain/template/selector';
import type { StateType } from '../../reducers';
import Button from '../../components/button';
import createQuestionnaireFromTemplate from '../../domain/business/create-questionnaire';
import { requestIdleCallback } from '../../utils/core';
import type { RouterParamsType } from '../../routes';

export type OwnStartPagePropsType = { params: RouterParamsType };

type MaybeTemplateType = TemplateType | {};

type PropsFromStateType = { template: MaybeTemplateType };

type PropsFromHocType = { syncHandlers: SyncHandlersMapType };

type PropsType = OwnStartPagePropsType & PropsFromStateType & PropsFromHocType;

const Layout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: #edf1f2;
`;

const Prompt = styled.div`
    box-shadow: 0 6px 20px 0 rgba(19, 33, 60, 0.12);
    width: 500px;
    background: #fff;
    padding: 30px;
`;

const TitleWrapper = styled.div`
    text-align: center;
    padding: 10px 0;
`;

const Title = styled.div`
    padding: 10px 0;
`;

const StartButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const mapStateToProps = (state: StateType, props: OwnStartPagePropsType): PropsFromStateType => ({
    template: currentTemplateSelector(state, props),
});

const getTemplateTitle = (template: MaybeTemplateType): string => {
    if (typeof template.title === 'string') {
        return template.title;
    }

    return '';
};

const handleStartButton = (props: PropsType) => (): void => {
    const q = createQuestionnaireFromTemplate(props.template);

    props.syncHandlers[QUESTIONNAIRE](q);
    requestIdleCallback(() => {
        browserHistory.push(`${props.params.templateId}/q/${q.id}`);
    });
};

const StartPage = (props: PropsType): React$Element<*> =>
    <Layout>
        <Prompt>
            <TitleWrapper>
                START APPLICATION
                <Title>
                    {`"${getTemplateTitle(props.template)}"`}
                </Title>
            </TitleWrapper>
            <StartButtonWrapper>
                <Button title="Start" action={handleStartButton(props)} start primary />
            </StartButtonWrapper>
        </Prompt>
    </Layout>;

const enhancer = compose(
    connect(mapStateToProps),
    sync([QUESTIONNAIRE]),
    fetcher([TEMPLATE]),
);

export default enhancer(StartPage);
