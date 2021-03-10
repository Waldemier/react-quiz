import axios from '../../axios/axios-config'
import {FETCH_QUIZZEZ_START, FETCH_QUIZZEZ_SUCCESS, FETCH_QUIZZEZ_ERROR, FETCH_QUIZ_SUCCESS, ADD_ANSWER_TO_STATE, QUIZ_FINISHED, NEXT_QUIZ_QUESTION, WRONG_QUIZ_ANSWER, RETRY_QUIZ} from './actionTypes'

export function fetchQuizzez() {
    return async dispatch => {

        dispatch(fetchQuizzezStart())

        try {
            
            const response = await axios.get('/quizzes.json')
            const quizzes = []

            Object.keys(response.data).forEach((key, index) => {
                quizzes.push({
                    id: key,
                    name: `Test №${index+1}`
                })
            })

            dispatch(fetchQuizzezSuccess(quizzes))

        }
        catch (err) {
            dispatch(fetchQuizzezError(err))
        }
    }

}

export function fetchQuizzezStart() {
    return {
        type: FETCH_QUIZZEZ_START
    }
}

export function fetchQuizzezSuccess(quizzes) {
    return {
        type: FETCH_QUIZZEZ_SUCCESS,
        quizzes
    }
}

export function fetchQuizzezError(error) {
    return {
        type: FETCH_QUIZZEZ_ERROR,
        error
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {

        dispatch(fetchQuizzezStart())

        try {
            const response = await axios.get(`/quizzes/${quizId}.json`)
            const quiz = response.data

            dispatch(fetchQuizSuccess(quiz))

        } catch (err) {
            dispatch(fetchQuizzezError(err))
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function addAnswerToState(successAnswer, results) {
    return {
        type: ADD_ANSWER_TO_STATE,
        successAnswer,
        results
    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}

export function quizFinished() {
    return {
        type: QUIZ_FINISHED
    }
}

export function nextQuestion(activeQuestion) {
    return {
        type: NEXT_QUIZ_QUESTION,
        activeQuestion
    }
}

export function wrongQuizAnswer(wrongAnswer, results) {
    return {
        type: WRONG_QUIZ_ANSWER,
        wrongAnswer,
        results
    }
}

export function retryQuizHandler() {
    return {
        type: RETRY_QUIZ
    }
}

export function onQuizAnswerClickHandler(answerId) {

    //Диспатчили тільки ті місця, де мінявся стейт
    console.log(answerId)
    return (dispatch, getState) => {

        const state = getState().QuizReducer
        //Перший раз коли натискаємо на правильну відповідь код йде далі,
        // а якщо за цей час ще раз натискаємо на правильну відповідь, 
        // то спрацьовує цей блок коду (Оскільки в answerState вже не null (див.реалізацію коду що нижче)),
        // який запобігає просуванню подальних дій в цій функції.
        if(state.answerState) { //fix double click to true answer
            const key = Object.keys(state.answerState)[0]
            if(state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results

        if(question.rightAnswerId === answerId) {

            if(!results[question.id]) results[question.id] = 'success'

            dispatch(addAnswerToState({[answerId]: 'success'}, results))

            const timeout = window.setTimeout(() => {
                if(isQuizFinished(state)) {

                    dispatch(quizFinished())
                }
                else {
                    dispatch(nextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 1000)
        }
        else { 
            results[question.id] = 'wrong'
            dispatch(wrongQuizAnswer({[answerId]: 'wrong'}, results))
        }   
    }   
}