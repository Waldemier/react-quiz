import React from 'react'
import classes from './Loader.module.css'

const Loader = props => ( // paste from loader.io icons
    <div style={{textAlign: 'center'}}>
        <div className={classes['lds-spinner']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>   
)

export default Loader