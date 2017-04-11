// @flow
import type { InputPropsType } from '../input';
import { inputEnhancer, whitelistInputProps, InputStyled } from '../input';

const Input = (props: InputPropsType) =>
    <InputStyled
        type="number"
        {...whitelistInputProps(props)}
    />;

export default inputEnhancer(Input);
