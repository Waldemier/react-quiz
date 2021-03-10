import React from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import {connect} from 'react-redux'
import {auth} from '../../store/actions/authActions'

class Auth extends React.Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter the correct email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter the correct password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
       
    }

    loginHandler = () => {
        this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, true)
    }

    registerHandler = () => {
        this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, false)
    }

    submitHandler = event => {
        event.preventDefault(); //Відміняє стандартну поведінку форми
    }

    validationControl(control, validationParams) {

        if(!validationParams) //На випадок якщо таке поле буде відсутнє в майбутніх input'ах
        {
            return true;
        }

        let isValid = true;

        if(validationParams.required)
        {
             isValid = control.value.trim() !== '' && isValid;
        }

        if(validationParams.email)
        {
            isValid = is.email(control.value) && isValid;
        }

        if(validationParams.minLength)
        {
            isValid = control.value.length >= validationParams.minLength && isValid;
        }

        return isValid;

    }

    onChangeHandler(event, controlName) {  
        //console.info(`${controlName} ${event.target.value}`)
        const value = event.target.value
        const formControls = {...this.state.formControls}
        const control = { ...formControls[controlName] }

        control.value = value;
        control.touched = true;
        control.valid = this.validationControl(control, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({ 
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input 
                    key={controlName + index} //random
                    value={control.value}
                    type={control.type}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    valid={control.valid}
                    shouldValidate={!!control.validation} //Пишемо подвійне заперечення, щоб явно було видно, що передається булеве значення (можливий запис без !!)
                    touched={control.touched}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }
    
    render() {

        return (
            <div className={classes.Auth}>
                <div>

                    <h1>Authentication</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}

                        <Button type="success" onClick={this.loginHandler} disabled={!this.state.isFormValid}>Sign In</Button>
                        <Button type="primary" onClick={this.registerHandler} disabled={!this.state.isFormValid}>Sign Up</Button>
                    </form>

                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
        return {
            auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)