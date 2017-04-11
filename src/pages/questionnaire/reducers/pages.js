// @flow
import { compose, lensProp, head, difference, lens, last } from 'ramda';
import { mapped, set, view, traversed, listOf } from 'ramda-lens';
import { QUESTIONNAIRE } from '../../../domain/entities';
import { lensWithId } from '../../../utils/core';
import {
    CLICK_NEXT_PAGE,
    CLICK_EDIT_PAGE,
    CLICK_EDIT_CANCEL_PAGE,
    CLICK_EDIT_CONFIRM_PAGE,
} from '../actions/page';
import type { HandleClickPageActionType } from '../actions/page';
import { STATUS } from '../../../domain/questionnaire/index';
import type { EntitiesStateType } from '../../../reducers/entities';

const currentQuestionnaireLens = (questionnaireId: string) => compose(
    lensProp(QUESTIONNAIRE),
    lensWithId(questionnaireId),
);

const currentQuestionnaireQuestionsLens = (questionnaireId: string) => compose(
    lensProp(QUESTIONNAIRE),
    lensWithId(questionnaireId),
    lensProp('questions'),
);

const currentQuestionnaireStatusLens = (questionnaireId: string) => compose(
    currentQuestionnaireLens(questionnaireId),
    lensProp('status'),
);

const sectionsLens = (questionnaireId: string) => compose(
    currentQuestionnaireLens(questionnaireId),
    lensProp('sectionsEntities'),
);

const currentSectionsLens = (questionnaireId: string) => lens(
    listOf(compose(
        currentQuestionnaireLens(questionnaireId),
        lensProp('sections'),
        traversed,
    )),
    set(compose(
        currentQuestionnaireLens(questionnaireId),
        lensProp('sections'),
    )),
);

const possibleSectionsIdLens = (questionnaireId: string) => compose(
    currentQuestionnaireLens(questionnaireId),
    lensProp('sectionsEntities'),
    traversed,
    lensProp('id'),
);

const possiblePagesIdLens = (questionnaireId: string, sectionId: string) => compose(
    sectionsLens(questionnaireId),
    lensWithId(sectionId),
    lensProp('allPages'),
    traversed,
);

const pageLens = (questionnaireId: string, sectionId: string) => lens(
    listOf(compose(
        sectionsLens(questionnaireId),
        lensWithId(sectionId),
        lensProp('pages'),
        traversed,
    )),
    set(compose(
        sectionsLens(questionnaireId),
        lensWithId(sectionId),
        lensProp('pages'),
    )),
);

const pageByIdCurrentLens = (questionnaireId: string, pageId: string) => compose(
    currentQuestionnaireLens(questionnaireId),
    lensProp('pages'),
    lensWithId(pageId),
    lensProp('current'),
);

const pagesCurrentLens = (questionnaireId: string) => lens(
    listOf(compose(
        currentQuestionnaireLens(questionnaireId),
        lensProp('pages'),
        traversed,
        lensProp('current'),
    )),
    set(compose(
        currentQuestionnaireLens(questionnaireId),
        lensProp('pages'),
        mapped,
        lensProp('current'),
    )),
);

const sectionByIdCurrentLens = (questionnaireId: string, sectionId: string) => compose(
    currentQuestionnaireLens(questionnaireId),
    lensProp('sectionsEntities'),
    lensWithId(sectionId),
    lensProp('current'),
);

const sectionsCurrentLens = (questionnaireId: string) => compose(
    currentQuestionnaireLens(questionnaireId),
    lensProp('sectionsEntities'),
    mapped,
    lensProp('current'),
);

const getNextEntity = (currentEntities: Array<string>, allEntities: Array<string>) =>
    head(difference(allEntities, currentEntities));

const setCurrentPage = (questionnaireId: string, nextPage: string) => compose(
    set(pageByIdCurrentLens(questionnaireId, nextPage), true),
    set(pagesCurrentLens(questionnaireId), false),
);

const setCurrentSection = (questionnaireId: string, nextSection: string) => compose(
    set(sectionByIdCurrentLens(questionnaireId, nextSection), true),
    set(sectionsCurrentLens(questionnaireId), false),
);

const editingBackupSnapshotLens = (questionnaireId: string) => compose(
    currentQuestionnaireLens(questionnaireId),
    lensProp('editingBackupSnapshot'),
);

const incrementPage = (action: HandleClickPageActionType, state: $Shape<EntitiesStateType>) => { // eslint-disable-line
    const currentSection = last(view(currentSectionsLens(action.questionnaireId), state));
    const currentPages = view(pageLens(action.questionnaireId, currentSection), state);
    const nextPage = getNextEntity(
        currentPages,
        listOf(possiblePagesIdLens(action.questionnaireId, currentSection), state),
    );
    const currentSections = view(currentSectionsLens(action.questionnaireId), state);
    const nextSection = getNextEntity(
        currentSections,
        listOf(possibleSectionsIdLens(action.questionnaireId), state),
    );
    const isLastPage = typeof nextPage === 'undefined';
    const isLastSection = typeof nextSection === 'undefined';

    if (isLastPage && isLastSection) {
        alert('questionnaire completed');

        return state;
    }

    if (isLastPage) {
        const nextPageFromNextSection = compose(
            head,
            listOf(possiblePagesIdLens(action.questionnaireId, nextSection)),
        )(state);

        return compose(
            setCurrentPage(action.questionnaireId, nextPageFromNextSection),
            setCurrentSection(action.questionnaireId, nextSection),
            set(currentSectionsLens(action.questionnaireId), [...currentSections, nextSection]),
        )(state);
    }

    return compose(
        setCurrentPage(action.questionnaireId, nextPage),
        set(pageLens(action.questionnaireId, currentSection), [...currentPages, nextPage]),
    )(state);
};

const editPage = (action: HandleClickPageActionType, state: $Shape<EntitiesStateType>) => compose(
    set(currentQuestionnaireStatusLens(action.questionnaireId), STATUS.EDITING),
    setCurrentPage(action.questionnaireId, action.pageId),
    set(
        editingBackupSnapshotLens(action.questionnaireId),
        view(currentQuestionnaireQuestionsLens(action.questionnaireId), state),
    ),
)(state);

const confirmEditPage = (action: HandleClickPageActionType, state: $Shape<EntitiesStateType>) => {
    const currentSection = last(view(currentSectionsLens(action.questionnaireId), state));
    const currentPages = view(pageLens(action.questionnaireId, currentSection), state);

    return compose(
        set(currentQuestionnaireStatusLens(action.questionnaireId), STATUS.IN_PROGRESS),
        setCurrentPage(action.questionnaireId, last(currentPages)),
        set(
            editingBackupSnapshotLens(action.questionnaireId),
            null,
        ),
    )(state);
};

const cancelEditPage = (action: HandleClickPageActionType, state: $Shape<EntitiesStateType>) => {
    const currentSection = last(view(currentSectionsLens(action.questionnaireId), state));
    const currentPages = view(pageLens(action.questionnaireId, currentSection), state);

    return compose(
        set(currentQuestionnaireStatusLens(action.questionnaireId), STATUS.IN_PROGRESS),
        setCurrentPage(action.questionnaireId, last(currentPages)),
        set(
            currentQuestionnaireQuestionsLens(action.questionnaireId),
            view(editingBackupSnapshotLens(action.questionnaireId), state),
        ),
    )(state);
};

/* eslint-disable flowtype/require-parameter-type */
export default {
    [CLICK_NEXT_PAGE]: (state, action) => incrementPage(action, state),
    [CLICK_EDIT_PAGE]: (state, action) => editPage(action, state),
    [CLICK_EDIT_CONFIRM_PAGE]: (state, action) => confirmEditPage(action, state),
    [CLICK_EDIT_CANCEL_PAGE]: (state, action) => cancelEditPage(action, state),
};
