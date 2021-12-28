import React from 'react'
import './rotation.scss'

const Rotation = ({ flight, removeFromRotation }) => {
    return (
        <div className='rotation-container'>
            <div className='rotation'>
                <div className='flightId'>
                    Flight: {flight.id}
                </div>

                <div className='flightInfo'>
                    <div className='info'>
                        <span>{flight.origin}</span>
                        <span>{flight.destination}</span>
                    </div>
                    <div className='arrow'>
                        <i className="fa fa-long-arrow-right fa-lg"></i>
                    </div>
                    <div className='info'>
                        <span>{flight.readable_departure}</span>
                        <span>{flight.readable_arrival}</span>
                    </div>
                </div>
                <button onClick={removeFromRotation} title='remove'><i className="fa fa-times fa-lg"></i></button>
            </div>
        </div>
    )
}

export default Rotation
