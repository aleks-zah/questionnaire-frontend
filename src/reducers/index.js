// @flow
import { combineReducers } from 'redux';
import type { Reducer } from 'redux';
import type { EntitiesStateType } from '../reducers/entities';
import entities from './entities';

export type StateType = {
    entities: EntitiesStateType
};

type GenericActionType = { type: string };

const createRootReducer = (AppNavigator: *): Reducer<$Shape<*>, *> => {
    if (typeof AppNavigator !== 'undefined') {
        const navReducer = (state: StateType, action: $Shape<GenericActionType>) => {
            const newState = AppNavigator.router.getStateForAction(action, state);

            return newState || state;
        };

        return combineReducers({
            nav: navReducer,
            entities,
        });
    }

    return combineReducers({
        entities,
    });
};

export default createRootReducer;

