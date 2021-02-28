import React from 'react'
import classes from './MenuToggle.module.css'

const MenuToggle = props => {
    const cls = [classes.MenuToggle, 'fa', ] //'fa' (клас іконок, які ми імпортувати в index.html)

    if(props.isOpen){
        cls.push('fa-times')
        cls.push(classes.open)
    } else {
        cls.push('fa-bars')
    }

    return (
        <i 
        className={cls.join(' ')}   
        onClick={props.onToggle}
        />
    )
}

export default MenuToggle