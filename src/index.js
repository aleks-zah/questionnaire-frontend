// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Router from './routes';
import '../assets/styles/global.css';

const MOUNT_NODE = document.getElementById('root');
const store = configureStore({});

if (process.env.NODE_ENV === 'production') {
    require('offline-plugin/runtime').install(); // eslint-disable-line
}

render(
    <Provider store={store}>
        <Router />
    </Provider>,
    MOUNT_NODE,
);

if (module.hot) {
    module.hot.accept();
}
