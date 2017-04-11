// @flow
import { createSelector } from 'reselect';
import type { OwnStartPagePropsType } from '../../pages/start';
import type { StateType } from '../../reducers';
import { templateIdSelector } from '../../device-specific/selectors';
import { TEMPLATE } from '../entities';

export const templatesSelector = (state: StateType): Array<TemplateType> => state.entities[TEMPLATE] || [];

export const currentTemplateSelector: Selector<StateType, OwnStartPagePropsType, TemplateType | {}> =
    (state: StateType, props: OwnStartPagePropsType): TemplateType | {} => createSelector(
        templatesSelector,
        (templates: Array<TemplateType>): TemplateType | {} =>
        templates.find((t: TemplateType): boolean => t.id === templateIdSelector(props)) || {},
    )(state, props);
