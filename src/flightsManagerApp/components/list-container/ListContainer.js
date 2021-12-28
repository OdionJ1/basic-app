import React from 'react'
import './listContainer.scss'

const ListContainer = ({ children }) => {
    return (
        <div className='list-container'>
            {children}
        </div>
    )
}

export default ListContainer
