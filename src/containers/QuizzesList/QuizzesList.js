import React from 'react'
import classes from './QuizzesList.module.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import {fetchQuizzez} from '../../store/actions/quizActions'
import {connect} from 'react-redux'

class QuizzesList extends React.Component {

   
    renderQuizzes() {
        return this.props.quizzes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }
    
    componentDidMount() {
        this.props.fetchQuizzez()
    }

    render() {
        return (
            <div className={classes.QuizzesList}>
                <div>
                    <h1>Quiz list page</h1>
                    
                    { 
                        this.props.loading && this.props.quizzes.length !== 0 ? 
                            <Loader />
                        :
                            <ul>
                                {this.renderQuizzes()}
                            </ul>
                    }
                    
                </div> 
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizzes: state.QuizReducer.quizzes,
        loading: state.QuizReducer.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizzez: () => dispatch(fetchQuizzez())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizzesList)