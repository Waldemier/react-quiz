import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes'
import axios from '../../axios/axios-config'



export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function logout() {
    /* localStorage - глобальна змінна */
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expiration')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {

    return dispatch => {

        const token = localStorage.getItem('token')

        if(!token) {

            dispatch(logout())
        }
        else {

            const expiration = new Date(localStorage.getItem('expiration'))
            
            if(expiration <= new Date()) {
                dispatch(logout())
            }
            else {
                dispatch(authSuccess(token))
                dispatch(autoLogout( (expiration.getTime() - new Date().getTime()) / 1000 ))
            }
        }
    }
}

export function autoLogout(expitation) {
    return dispatch => {
        setTimeout(() => dispatch(logout()), expitation * 1000)
    }
}

export function auth(email, password, isLogin) {
    return async dispatch => {

        const fireData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD29mdgX15egDMrH2_jlahjLvADYeDF-1k' //req if registr

        if(isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD29mdgX15egDMrH2_jlahjLvADYeDF-1k' //req if login
        }

        try
        {
           const response = await axios.post(url, fireData)
           const data = response.data //field 'data' is a special firebase field
           const expitation = new Date(new Date().getTime() + data.expiresIn * 1000)

           //localStorage - глобальна змінна, в яку ми заносимо потрібні для сесії данні
           localStorage.setItem('token', data.idToken)
           localStorage.setItem('userId', data.localId)
           localStorage.setItem('expiration', expitation)

           dispatch(authSuccess(data.idToken))
           dispatch(autoLogout(data.expiresIn))

        } catch (error) 
        {
            console.error(error)
        }
    }
}