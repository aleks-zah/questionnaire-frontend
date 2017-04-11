// @flow

type MapType<E> = { [string]: E };
type GenericActionType = { type: string };

export const createReducer = (initialState: *, reducerMap: MapType<() => *>) =>
    (maybeState: *, action: $Shape<GenericActionType>) => {
        const state = typeof maybeState === 'undefined' ? initialState : maybeState;
        const reducer = reducerMap[action.type];

        if (!reducer) return state;

        return typeof reducer === 'function' ? reducer(state, action) : state;
    };
