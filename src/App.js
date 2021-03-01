import Layout from './hoc/Layout/Layout.js'
import {Route, Switch} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import Auth from './containers/Auth/Auth'
import CreateQuiz from './containers/CreateQuiz/CreateQuiz'
import QuizzesList from './containers/QuizzesList/QuizzesList'

function App() {
  return (
      <Layout>
        <Switch>
          <Route path="/quiz/:id" component={Quiz}/>
          <Route path="/auth" component={Auth} />
          <Route path="/create-quiz" component={CreateQuiz} />
          <Route path="/" component={QuizzesList}/>
        </Switch>
      </Layout>
  );
}

export default App;
