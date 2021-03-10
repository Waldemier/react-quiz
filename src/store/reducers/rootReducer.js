import {combineReducers} from 'redux'
import QuizReducer from './QuizReducer'
import createQuizReducer from './createQuizReducer'
import authReducer from './authReducer'

export default combineReducers({ QuizReducer, createQuizReducer, authReducer })