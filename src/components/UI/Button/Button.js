import React from 'react'
import classes from './Button.module.css'

const Button = props => {

    const cls = [
        classes.Button,
        classes[props.type] //Доступ до стилів по конкретному переданому ключу. (Особливість scss модулів)
    ]

    return (
        <button
        onClick={props.onClick}
        className={cls.join(' ')}
        disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button