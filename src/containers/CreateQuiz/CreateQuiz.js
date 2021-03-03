import React from 'react'
import classes from './CreateQuiz.module.css'
import Button from '../../components/UI/Button/Button'
export default class CreateQuiz extends React.Component {

    submitHandler = event => {
        event.preventDefault();
    }   

    render() {
        return (
            <div className={classes.CreateQuiz}>
                <div>
                    <h1>Create quize page</h1>
                
                    <form onSubmit={this.submitHandler}>
                        <input type="text"/>
                        <hr/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>

                        <select></select>

                        <Button type="primary" onClick={this.addQuestionHandler}>Add question</Button>
                        <Button type="success" onClick={this.createQuizHandler}>Create</Button>

                    </form>
                </div>
            </div>
        )
    }
}