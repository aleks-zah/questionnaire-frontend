// @flow
import { curry } from 'ramda';
import type { Dispatch } from 'redux';
import {
    handleClickNextPage,
    handleClickEditPage,
    handleClickEditCancelPage,
    handleClickEditConfirmPage,
} from '../../actions/page';
import type { HandleClickPageActionType } from '../../actions/page';
import type { QuestionnairePropsType } from '../../index';

const onClickNextPage = curry((
    dispatch: Dispatch<HandleClickPageActionType>,
    questionnaireProps: QuestionnairePropsType,
    pageProps: QuestionnairePageType,
) => () => {
    dispatch(handleClickNextPage(pageProps.id, questionnaireProps.questionnaire.id));
});

const onClickEditPage = curry((
    dispatch: Dispatch<HandleClickPageActionType>,
    questionnaireProps: QuestionnairePropsType,
    pageProps: QuestionnairePageType,
) => () => {
    dispatch(handleClickEditPage(pageProps.id, questionnaireProps.questionnaire.id));
});

const onClickEditCancelPage = curry((
    dispatch: Dispatch<HandleClickPageActionType>,
    questionnaireProps: QuestionnairePropsType,
    pageProps: QuestionnairePageType,
) => () => {
    dispatch(handleClickEditCancelPage(pageProps.id, questionnaireProps.questionnaire.id));
});

const onClickEditConfirmPage = curry((
    dispatch: Dispatch<HandleClickPageActionType>,
    questionnaireProps: QuestionnairePropsType,
    pageProps: QuestionnairePageType,
) => () => {
    dispatch(handleClickEditConfirmPage(pageProps.id, questionnaireProps.questionnaire.id));
});

export type PageHandlersWithDispatchType = (pageProps: QuestionnairePageType) => {
    onClickNextPage: () => void
};

const pageHandlers = (dispatch: Dispatch<*>, questionnaireProps: QuestionnairePropsType) => ({
    onClickNextPage: onClickNextPage(dispatch, questionnaireProps),
    onClickEditPage: onClickEditPage(dispatch, questionnaireProps),
    onClickEditCancelPage: onClickEditCancelPage(dispatch, questionnaireProps),
    onClickEditConfirmPage: onClickEditConfirmPage(dispatch, questionnaireProps),
});

export default pageHandlers;
