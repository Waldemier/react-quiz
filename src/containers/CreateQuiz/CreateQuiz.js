import React from 'react'
import classes from './CreateQuiz.module.css'
import Button from '../../components/UI/Button/Button'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Auxiliary from '../../components/Auxiliary/Auxiliary'
import Select from '../../components/UI/Select/Select'

function createOptionControl(number) {
    return createControl(
        {
            label: `${number} option`,
            errorMessage: 'The value cannot be empty',
            id: number
        },
        {
             required: true 
        }
    )
}

function formControlsContainer() {
    return  {
            question: createControl({
                label: 'Input question',
                errorMessage: 'The question cannot be empty'
            }, {
                required: true
            }),
            answer1: createOptionControl(1),
            answer2: createOptionControl(2),
            answer3: createOptionControl(3),
            answer4: createOptionControl(4)
        }
}
export default class CreateQuiz extends React.Component {

    state = {
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: formControlsContainer()
    }

    submitHandler = event => {
        event.preventDefault();
    }   


    selectChangeHandler = event => {
        this.setState({ 
            rightAnswerId: +event.target.value
        })
    }

    setStateHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = { ...formControls[controlName] }

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })

    }

    addQuestionHandler = event => {
        event.preventDefault();

        const quiz = this.state.quiz.concat();
        const index = quiz.length + 1;

        const {question, answer1, answer2, answer3, answer4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: answer1.value, id: answer1.id},
                {text: answer2.value, id: answer2.id},
                {text: answer3.value, id: answer3.id},
                {text: answer4.value, id: answer4.id}
            ]
        }
        quiz.push(questionItem)

        this.setState({
            quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: formControlsContainer()
        })
    }

    createQuizHandler = event => {
        event.preventDefault();
        console.log(this.state.quiz)
        //TODO: Server
    }

    render() {

        const select = <Select 
            label="Choose the correct answer"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        return (
            <div className={classes.CreateQuiz}>
                <div>
                    <h1>Create quize page</h1>
                
                    <form onSubmit={this.submitHandler}>
                        { Object.keys(this.state.formControls).map((controlName, index) => {
                            const control = this.state.formControls[controlName];
                            return (
                                //React.Fragment alternative
                                 <Auxiliary key={controlName + index}> 
                                    <Input 
                                        label={control.label}
                                        value={control.value}
                                        errorMessage={control.errorMessage}
                                        valid={control.valid}
                                        shouldValidate={control.validation}
                                        touched={control.touched}
                                        onChange={event => this.setStateHandler(event.target.value, controlName)}
                                    />
                                    { index === 0 ? <hr /> : null }
                                </Auxiliary>
                            )
                        })}

                        {select}

                        <Button type="primary" onClick={this.addQuestionHandler} disabled={!this.state.isFormValid}>Add question</Button>
                        <Button type="success" onClick={this.createQuizHandler} disabled={this.state.quiz.length === 0}>Create</Button>

                    </form>
                </div>
            </div>
        )
    }
}