// @flow
export const CLICK_NEXT_PAGE = 'CLICK_NEXT_PAGE';
export const CLICK_EDIT_PAGE = 'CLICK_EDIT_PAGE';
export const CLICK_EDIT_CANCEL_PAGE = 'CLICK_EDIT_CANCEL_PAGE';
export const CLICK_EDIT_CONFIRM_PAGE = 'CLICK_EDIT_CONFIRM_PAGE';

export type HandleClickPageActionType = {
    type: string,
    pageId: string,
    questionnaireId: string
};

export const handleClickNextPage = (pageId: string, questionnaireId: string): HandleClickPageActionType => ({
    type: CLICK_NEXT_PAGE,
    pageId,
    questionnaireId,
});

export const handleClickEditPage = (pageId: string, questionnaireId: string): HandleClickPageActionType => ({
    type: CLICK_EDIT_PAGE,
    pageId,
    questionnaireId,
});

export const handleClickEditCancelPage = (pageId: string, questionnaireId: string): HandleClickPageActionType => ({
    type: CLICK_EDIT_CANCEL_PAGE,
    pageId,
    questionnaireId,
});

export const handleClickEditConfirmPage = (pageId: string, questionnaireId: string): HandleClickPageActionType => ({
    type: CLICK_EDIT_CONFIRM_PAGE,
    pageId,
    questionnaireId,
});
