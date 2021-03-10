import {CREATE_QUIZ_QUESTION, RESET_QUIZ_PARAMETERS} from './actionTypes'
import axios from '../../axios/axios-config'

export function addQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetQuizParameters() {
    return {
        type: RESET_QUIZ_PARAMETERS
    }
}

export function finishCreatingQuiz() {
    
    return async (dispatch, getState) => {

        const state = getState().createQuizReducer

        try {
            await axios.post('https://react-quiz-d15db-default-rtdb.firebaseio.com/quizzes.json', state.quiz)
        }
        catch (err) {
            console.error(err)
        }
        
        dispatch(resetQuizParameters())

    }
}