import React from 'react'
import './flight.scss'

const Flight = ({ flight, addToRotation, disabled, hasConflict }) => {

    return (
        <div className='flight-container'>
            <p style={{display: hasConflict.includes(flight.id)? 'block': 'none'}} className='conflict-text'>*Time Conflict: Can't be added</p>
            <div className='flight'>
                <div className='flightId'>
                    {flight.id}
                </div>
                <div className='flightInfo'>
                    <div className='info'>
                        <span>{flight.origin}</span>
                        <span>{flight.destination}</span>
                    </div>
                    <div className='info'>
                        <span>{flight.readable_departure}</span>
                        <span>{flight.readable_arrival}</span>
                    </div>
                </div>
                <button onClick={addToRotation} style={{cursor: disabled? '' : 'pointer'}} disabled={disabled}><i style={{color: disabled? 'gray' : 'whitesmoke'}} className="fa fa-plus-square fa-lg"></i></button>
            </div>
        </div>
    )
}

export default Flight
