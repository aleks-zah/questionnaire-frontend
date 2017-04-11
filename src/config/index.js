// @flow
import { prop } from 'ramda';
import production from './production';
import development from './development';

const getConfigProp = (propName: string): * => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return prop(propName, production);
        case 'development':
            return prop(propName, development);
        default:
            return prop(propName, development);
    }
};

export default getConfigProp;
