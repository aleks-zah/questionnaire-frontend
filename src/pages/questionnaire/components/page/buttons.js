// @flow
import React from 'react';
import { STATUS } from '../../../../domain/questionnaire';
import { Button, Wrapper } from '../../../../device-specific/components';
import type { PagePropsType } from './index';

const ON_CURRENT_PAGE = 'ON_CURRENT_PAGE';
const ON_EDITING_PAGE = 'ON_EDITING_PAGE';
const ON_PREVIOUS_PAGE = 'ON_PREVIOUS_PAGE';

const getPageStatus = (props: PagePropsType): string => {
    const isInProgress = props.meta.questionnaire.status === STATUS.IN_PROGRESS;
    const isEditing = props.meta.questionnaire.status === STATUS.EDITING;

    if (props.current && isInProgress) {
        return ON_CURRENT_PAGE;
    } else if (props.current && isEditing) {
        return ON_EDITING_PAGE;
    }

    return ON_PREVIOUS_PAGE;
};

const EditButtons = (props: PagePropsType) =>
    <Wrapper>
        <Button action={props.handlers.page.onClickEditPage(props)} title="Edit" />
    </Wrapper>;

const NextButton = (props: PagePropsType) =>
    <Wrapper>
        <Button action={props.handlers.page.onClickNextPage(props)} title="Next" primary />
    </Wrapper>;

const EditingButtons = (props: PagePropsType) =>
    <Wrapper>
        <Button action={props.handlers.page.onClickEditCancelPage(props)} title="Cancel" />
        <Button action={props.handlers.page.onClickEditConfirmPage(props)} title="Confirm" primary />
    </Wrapper>;

const mapPageStatusToButtonHandler = {
    [ON_CURRENT_PAGE]: NextButton,
    [ON_EDITING_PAGE]: EditingButtons,
    [ON_PREVIOUS_PAGE]: EditButtons,
};


export const getButtons = (props: PagePropsType) => mapPageStatusToButtonHandler[getPageStatus(props)];
