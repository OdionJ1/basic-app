import React, { useState, useEffect } from 'react'
import './aircraft.scss'

const Aircraft = ({ aircraft, select, rotationList }) => {
    let [utilisation, setUtilisation] = useState(0)

    useEffect(() => {
        let total = [];
        
        rotationList.forEach((flight) => {
            let time1 = Number(flight.departuretime)
            let time2 = Number(flight.arrivaltime)
            
            let duration = time2 - time1
            total.push(duration)
        })
        
        let totalNumber = total.reduce((a,b) => a + b, 0)
        let proportion = (totalNumber / 86400) * 100 //total number of seconds in 24 hours is 86400

        setUtilisation(Math.floor(proportion))
    }, [rotationList])

    return (
        <div tabIndex='0' onClick={select} className='aircraft'>
            <div style={{ backgroundColor: aircraft.selected? '#383872' : 'gray'}}>
                { aircraft.ident }
                <p>({utilisation}%)</p>
                <p className='select'>{aircraft.selected? 'selected' : 'select'}</p>
            </div>
        </div>
    )
}

export default Aircraft
