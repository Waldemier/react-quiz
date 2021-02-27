import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'

//в index.html підлючили іконки (font awesome cdn), де в даному коді 'fa fa-times' це іконка хрестика, а fa fa-check галочки
const FinishedQuiz = props => {

    const successCount = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success') ++total
        return total
    }, 0)//Object.keys створює масив ключів певного об'єкту

    console.info(successCount)
    return (
        <div className={classes.FinishedQuiz}>

            <ul>
                { props.quiz.map((quizItem, index) => {

                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'wrong' ? 'fa-times': 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]

                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}></i>
                        </li>
                    )
                }) }
            </ul>

            <p> Кількість правильних відповідей: {successCount} / {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type="primary">Пройти повторно</Button>
                <Button type="success">Перейти до тестів</Button>
            </div>

        </div>
    )
}

export default FinishedQuiz