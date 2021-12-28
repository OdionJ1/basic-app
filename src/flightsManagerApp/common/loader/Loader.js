import React from 'react'
import './loader.scss'

const Loader = ({ show }) => {
    return (
        <div className='loader' style={{display: show? 'block' : 'none'}}>
            <p className='loader-text'>
                Loading<span className="dot"></span>
            </p>
        </div>
    )
}

export default Loader
