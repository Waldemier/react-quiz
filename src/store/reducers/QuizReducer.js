import {FETCH_QUIZZEZ_START, FETCH_QUIZZEZ_SUCCESS, FETCH_QUIZZEZ_ERROR, FETCH_QUIZ_SUCCESS, ADD_ANSWER_TO_STATE, QUIZ_FINISHED, NEXT_QUIZ_QUESTION, WRONG_QUIZ_ANSWER, RETRY_QUIZ} from '../actions/actionTypes'

const initialState = {
    quizzes: [],
    loading: false,
    error: null,
    results: {}, // {[id]: success or wrong}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // {[id]: 'success' or 'wrong'}
    quiz: null
}

export default function quizReducer(state = initialState, action) {
    
    switch(action.type) {
        case FETCH_QUIZZEZ_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZZEZ_SUCCESS:
            return {
                ...state, loading: false, quizzes: action.quizzes
            }
        case FETCH_QUIZZEZ_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            }
        case ADD_ANSWER_TO_STATE:
            return {
                ...state, answerState: action.successAnswer, results: action.results
            }
        case QUIZ_FINISHED:
            return {
                ...state, isFinished: true
            }
        case NEXT_QUIZ_QUESTION:
            return {
                ...state, activeQuestion: action.activeQuestion, answerState: null
            }
        case WRONG_QUIZ_ANSWER:
            return {
                ...state, answerState: action.wrongAnswer, results: action.results
            }
        case RETRY_QUIZ:
            return {
                ...state, activeQuestion: 0,
                answerState: null,
                isFinished:false,
                results: {}
            }
        default:
            return state
    }
}