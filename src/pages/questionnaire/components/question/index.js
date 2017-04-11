// @flow
import type { HandlersWithDispatchType } from '../question/handlers';
import { getNestedComponent } from './utils';
import Description from './components/description';
import Title from './components/title';

export type QuestionPropsType = QuestionnaireQuestionType & { handlers: HandlersWithDispatchType };

const Question = (props: QuestionPropsType) => {
    const NestedComponent = getNestedComponent(props.renderer, props.options);

    return (
        <div>
            <Title {...props} />
            <Description {...props} />
            <NestedComponent {...props.handlers(props)} {...props} />
        </div>
    );
};

export default Question;
