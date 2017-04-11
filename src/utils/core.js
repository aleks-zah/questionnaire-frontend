// @flow
import { findIndex, map, update, compose, propEq, prop } from 'ramda';
import { branch, renderNothing } from 'recompose';
import type { HocType } from 'redux-ntities';

export const hasProp = (propName: string): HocType => branch(
    (props: $Shape<*>) => typeof prop(propName, props) === 'undefined',
    renderNothing,
);

const requestIdleCallbackFallback = (handler: () => void) => {
    const startTime = Date.now();

    return setTimeout(() => {
        handler({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50.0 - (Date.now() - startTime)), // eslint-disable-line
        });
    }, 1); // eslint-disable-line
};

export const requestIdleCallback = window.requestIdleCallback || requestIdleCallbackFallback;

type PredicateType = () => boolean;

export const lensMatching = (pred: PredicateType) => (toF: () => *) => (entities: Array<*>) => {
    const index = findIndex(pred, entities);

    return map((entity: *) => update(index, entity, entities), toF(entities[index]));
};

export const lensWithId = compose(lensMatching, propEq('id'));


type MaybeCurrentEntityType = { current: boolean };

export const currentClassName = (props: MaybeCurrentEntityType, className: string): string =>
    props.current ? `${className}-current` : className;
