import {CREATE_QUIZ_QUESTION, RESET_QUIZ_PARAMETERS} from '../actions/actionTypes'

const initialState = {
    quiz: []
}

export default function createQuizReducer(state = initialState, action)
{
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                ...state, quiz: [...state.quiz, action.item]
            }
        case RESET_QUIZ_PARAMETERS:
            return {
                ...state, quiz: []
            }
        default:
            return state
    }
}