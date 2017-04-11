// @flow
import InputText from '../components/input-text';
import InputNumber from '../components/input-number';
import InputEmail from '../components/input-email';
import Area from '../components/area';
import Button from '../components/button';
import RadioHorizontal from '../components/radio-horizontal';

type GenericPropsType = {
    children?: React$Element<*> // eslint-disable-line
};

const Wrapper = (props: GenericPropsType) => <div>{props.children}</div>;

export { InputText, InputNumber, InputEmail, Area, Button, Wrapper, RadioHorizontal };
