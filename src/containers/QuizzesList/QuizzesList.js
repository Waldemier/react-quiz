import React from 'react'
import classes from './QuizzesList.module.css'
import {NavLink} from 'react-router-dom'
import axios from '../../axios/axios-config'
import Loader from '../../components/UI/Loader/Loader'

export default class QuizzesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            loading: true
        };
    }

    renderQuizzes() {
        return this.state.quizzes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }
    
    async componentDidMount() { //Викл. після створення компоненту
        try {
            
            const response = await axios.get('/quizzes.json')
            const quizzes = []

            Object.keys(response.data).forEach((key, index) => {
                quizzes.push({
                    id: key,
                    name: `Test №${index+1}`
                })
            })

            this.setState({quizzes, loading: false})

        }
        catch (err) {
            console.error(err)
        }
    }


    render() {
        return (
            <div className={classes.QuizzesList}>
                <div>
                    <h1>Quiz list page</h1>
                    
                    { 
                        this.state.loading ? 
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