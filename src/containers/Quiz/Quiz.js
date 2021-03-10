import React, { Component } from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.js'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizById, onQuizAnswerClickHandler, retryQuizHandler} from '../../store/actions/quizActions'

class Quiz extends Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() { //Спрацює при виході з тесту на іншу сторінку
        this.props.retryQuizHandler()
    }

    render(){
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Quiz</h1>

                    { 
                    
                        this.props.loading || !this.props.quiz ? 
                            <Loader />
                        :
                            this.props.isFinished ? 
                            <FinishedQuiz 
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.props.retryQuizHandler}
                            /> 
                            : 
                            <ActiveQuiz 
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            question={this.props.quiz[this.props.activeQuestion].question} 
                            onAnswerClick={this.props.onQuizAnswerClickHandler} //answerId ми передаємо в компоненті AnswerItem***
                            quizLength={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion + 1}
                            state={this.props.answerState}
                            />
                    }
    
                </div>
            </div>
        )
    }
}

function mapStatoToProps(state) {
    return {
        results: state.QuizReducer.results, // {[id]: success or wrong}
        isFinished: state.QuizReducer.isFinished,
        activeQuestion: state.QuizReducer.activeQuestion,
        answerState: state.QuizReducer.answerState, // {[id]: 'succes' or 'wrong'}
        quiz: state.QuizReducer.quiz,
        loading: state.QuizReducer.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        onQuizAnswerClickHandler: answerId => dispatch(onQuizAnswerClickHandler(answerId)), //answerId ми приймаємо з компоненту AnswerItem***
        retryQuizHandler: () => dispatch(retryQuizHandler())
    }
}

export default connect(mapStatoToProps, mapDispatchToProps)(Quiz);