import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout.js'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import Auth from './containers/Auth/Auth'
import CreateQuiz from './containers/CreateQuiz/CreateQuiz'
import Logout from './components/Logout/Logout'
import QuizzesList from './containers/QuizzesList/QuizzesList'
import {connect} from 'react-redux'
import {autoLogin} from './store/actions/authActions'
import { render } from '@testing-library/react'

class App extends Component {

    componentDidMount() { //При оновленні сторінки користувача не викидує з системи
      this.props.autoLogin()
    }

    render() {

        let routes = (
            <Switch>
              <Route path="/quiz/:id" component={Quiz}/>
              <Route path="/auth" component={Auth} />
              <Route path="/" exact component={QuizzesList}/>
              {/* //Якщо шлях не буде знайдено */}
              <Redirect to="/" />
            </Switch>
        )

        if(this.props.isAuthenticated) {

          routes = (
            <Switch>
              <Route path="/quiz/:id" component={Quiz}/>
              <Route path="/logout" component={Logout} />
              <Route path="/create-quiz" component={CreateQuiz} />
              <Route path="/" exact component={QuizzesList}/>
              <Redirect to="/" />
            </Switch>
          )
          
        }

        return (
          <Layout>
            { routes }
          </Layout>
        )
  }
  
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.authReducer.token //Привели до boolean (тобто своєрідна перевірка на те, чи властивість містить значення)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()) 
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App)) //Без withRouter'а, не будуть працювати роути, оскільки вони обгорнуті в connect
