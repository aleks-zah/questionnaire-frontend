// @flow
import styled from 'styled-components';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import fetcher from '../../hoc/fetcher';
import { QUESTIONNAIRE } from '../../domain/entities';
import type { StateType } from '../../reducers';
import { questionnaireSelectorDenormalized } from '../../domain/questionnaire/selector';
import type { RouterParamsType } from '../../routes';
import Section from './components/section';
import Menu from './components/menu';
import questionHandlers from './components/question/handlers';
import pageHandlers from './components/page/handlers';

export type OwnQuestionnairePagePropsType = { params: RouterParamsType };

type PropsFromStateType = {
    questionnaire: QuestionnaireType
};

type DispatchType = {
    dispatch: Dispatch<*>
};

const mapStateToProps = (state: StateType, props: OwnQuestionnairePagePropsType): PropsFromStateType => ({
    questionnaire: questionnaireSelectorDenormalized(state, props),
});

export type QuestionnairePropsType = OwnQuestionnairePagePropsType & PropsFromStateType & DispatchType;

export type SharedMetaType = {
    questionnaire: {
        status: string
    }
};

const getTitle = (props: QuestionnairePropsType): string => {
    if (typeof props.questionnaire === 'object' && typeof props.questionnaire.title === 'string') {
        return props.questionnaire.title;
    }

    return '';
};

const QuestionnaireStyled = styled.div`
    width: 970px;
    margin: auto;
`;

const Title = styled.h3`
    font-size: 18px;
    text-align: center;
    padding: 10px 0;
`;

const SectionList = styled.div`
    padding: 0 0 0 250px;
    min-height: 90%;
    position: relative;
    top: 0;
    background: #eaeff0;
`;

const getSections = (props: QuestionnairePropsType): React$Element<*> => {
    if (typeof props.questionnaire === 'object' && Array.isArray(props.questionnaire.sections)) {
        const handlers = {
            question: questionHandlers(props.dispatch, props),
            page: pageHandlers(props.dispatch, props),
        };
        const meta: SharedMetaType = {
            questionnaire: {
                status: props.questionnaire.status,
            },
        };

        return (
            <SectionList>
                {props.questionnaire.sections.map((section: QuestionnaireSectionType) => <Section
                    {...section}
                    handlers={handlers}
                    key={section.id}
                    meta={meta}
                    questions={props.questionnaire.questions}
                />)}
            </SectionList>
        );
    }

    return <div>no sections</div>;
};

const getMenu = (props: QuestionnairePropsType): React$Element<*> => {
    if (typeof props.questionnaire === 'object' && Array.isArray(props.questionnaire.sections)) {
        return (
            <Menu {...props.questionnaire} />
        );
    }

    return <span>nothing</span>;
};

const Questionnaire = (props: QuestionnairePropsType): React$Element<*> =>
    <QuestionnaireStyled>
        <Title>questionnaire: {getTitle(props)}</Title>
        {getMenu(props)}
        {getSections(props)}
    </QuestionnaireStyled>;

const enhancer = compose(
    connect(mapStateToProps),
    fetcher([QUESTIONNAIRE]),
);

export default enhancer(Questionnaire);
