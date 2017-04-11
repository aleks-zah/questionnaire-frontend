import { Router, Route, browserHistory } from 'react-router';
import StartPage from './pages/start';
import QuestionnairePage from './pages/questionnaire';

const RouterComponent = () =>
    <Router
        key={new Date()}
        history={browserHistory}
        onUpdate={(): void => window.scrollTo(0, 0)}
    >
        <Route path="/:templateId" component={StartPage} />
        <Route path="/:templateId/q/:questionnaireId" component={QuestionnairePage} />
    </Router>;

export type RouterParamsType = {
    templateId: string,
    questionnaireId: string
}


export default RouterComponent;
