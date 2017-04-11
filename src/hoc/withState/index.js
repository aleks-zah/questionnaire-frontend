// @flow
/* eslint-disable no-invalid-this, flowtype/require-parameter-type */
import { Component } from 'react';
import { createEagerFactory } from 'recompose';
import createHelper from 'recompose/createHelper';

const withState = (stateName: string, stateUpdaterName: string, initialState: () => * | *) =>
    (ComposedComponent: ReactClass<*>): ReactClass<*> => {
        const factory = createEagerFactory(ComposedComponent);

        return class extends Component {
            state = {
                stateValue: typeof initialState === 'function' ? initialState(this.props) : initialState,
            };

            componentWillReceiveProps(nextProps: *) {
                this.setState({
                    stateValue: nextProps[stateName] ? nextProps[stateName] : '',
                });
            }

            updateStateValue = (updateFn: () => * | *, callback: () => *) => this.setState(({ stateValue }) => ({
                stateValue: typeof updateFn === 'function' ? updateFn(stateValue) : updateFn,
            }), callback);

            render(): React$Element<*> {
                return factory({
                    ...this.props,
                    [stateName]: this.state.stateValue,
                    [stateUpdaterName]: this.updateStateValue,
                });
            }
        };
    };

export default createHelper(withState, 'withState');
