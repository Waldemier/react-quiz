import React from 'react'
import classes from './QuizzesList.module.css'
import {NavLink} from 'react-router-dom'

export default class QuizzesList extends React.Component {

    renderQuizzes() {
        return [1,2,3].map((quiz, index) => {
            return (
                <li key={index}>
                    <NavLink to={'/quiz/' + quiz}>
                        Test {quiz}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={classes.QuizzesList}>
                <div>
                    <h1>Quiz list page</h1>

                    <ul>
                        {this.renderQuizzes()}
                    </ul>
                </div> 
            </div>
        )
    }
}