// @flow
import styled from 'styled-components';
import RadioItem from './radio-item';

type RadioHorizontalPropsType = {
    value: ?string,
    choices: Array<string>,
    handleBlur: () => void // eslint-disable-line
};

const RadioList = styled.ul`
    display: inline-flex;
`;

const handleRadioClick = (props: RadioHorizontalPropsType) => (value: string) => () => {
    const { handleBlur } = props;

    handleBlur(value);
};

const RadioHorizontal = (props: RadioHorizontalPropsType) =>
    <RadioList>
        {props.choices.map((choice: string) =>
            <RadioItem
                key={choice}
                value={choice}
                selected={choice === props.value}
                handleRadioClick={handleRadioClick(props)}
            />,
        )}
    </RadioList>;

export default RadioHorizontal;
