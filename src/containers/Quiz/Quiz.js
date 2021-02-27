import React, { Component } from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.js'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {

    state = {
        results: {}, // {[id]: success or wrong}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'succes' or 'wrong'}
        quiz: [
            { 
                id:1,
                question: 'Якого кольору небо?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Чорний', id: 1},
                    {text: 'Голубий', id: 2},
                    {text: 'Червоний', id: 3},
                    {text: 'Зелений', id: 4}
                ]
            },
            { 
                id:2,
                question: 'В якому році був заснований Львів?',
                rightAnswerId: 1,
                answers: [
                    {text: '1256', id: 1},
                    {text: '1314', id: 2},
                    {text: '1754', id: 3},
                    {text: '1165', id: 4}
                ]
            }
        ]
    }
    onAnswerClickHandler = (answerId) => {
        //console.log('Answer Id: ', answerId)
        
        //Перший раз коли натискаємо на правильну відповідь код йде далі,
        // а якщо за цей час ще раз натискаємо на правильну відповідь, 
        // то спрацьовує цей блок коду (Оскільки в answerState вже не null (див.реалізацію коду що нижче)),
        // який запобігає просуванню подальних дій в цій функції.
        if(this.state.answerState) { //fix double click to true answer
            const key = Object.keys(this.state.answerState)[0]
            //console.log(key)
            if(this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if(question.rightAnswerId === answerId) {

            if(!results[question.id]) results[question.id] = 'success'

            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            })

            const timeout = window.setTimeout(() => {
                if(this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                }
                else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        }
        else { 
            results[question.id] = 'wrong'
            this.setState({
                answerState: {[answerId]: 'wrong'}, //[ключ]: значення === ключ: значення
                results: results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished:false,
            results: {}
        })
    }

    render(){
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Quiz</h1>
                    {
                        this.state.isFinished ? 
                        <FinishedQuiz 
                        results={this.state.results}
                        quiz={this.state.quiz}
                        onRetry={this.retryHandler}
                        /> : 
                        <ActiveQuiz 
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question} 
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                    }      
                </div>
            </div>
        )
    }
}

export default Quiz;