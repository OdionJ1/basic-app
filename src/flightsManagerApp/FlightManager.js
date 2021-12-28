import React, { useState, useEffect } from 'react'
import ListContainer from './components/list-container/ListContainer'
import Aircraft from './components/aircraft/Aircraft'
import Flight from './components/flight/Flight'
import Rotation from './components/rotation/Rotation'
import Loader from './common/loader/Loader'
import StackedBarChart from './common/chart/StackedBarChart'
import { getAircraft, getAircraftList, getFlightList } from './services/api/apiServices'
import './flightManager.scss'

//get tomorrows date
const d = new Date()
const d2 = d.setDate(d.getDate() + 1)
const tommorrow = new Date(d2)
//

const FlightManager = () => {
    const [aircraftList, setAircraftList] = useState([])
    const [flightList, setFlightList] = useState([])
    const [rotationList, setRotationList] = useState([])
    const [selectedAircraft, setSelectedAircraft] = useState()
    const [selectedDate, setSelectedDate] = useState()
    const [hasConflict, setHasConflict] = useState([])//takes an array of id
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        let apiCall = async () => {
            setLoading(true)
            const aircraftListResponse = await getAircraftList()
            setAircraftList(addSelectedProperty(aircraftListResponse.data))
            setLoading(false)
        }
        apiCall()

    }, [])
    
    //Date related:
    let handleChange = async (event) => {
        let { value } = event.target
        setSelectedDate(value)

        setLoading(true)
        const flightListResponse = await getFlightList()
        setFlightList(flightListResponse.data)
        setLoading(false)
    }
    //

    //Aircraft related:
    let addSelectedProperty = (aircraftListData) => {
        let data = aircraftListData.map((aircraft) => { return {...aircraft, selected: false}} )
        return data
    }

    let selectAircraft = async (id) => {
        let list = aircraftList.map(aircraft => {
            if(aircraft.ident === id){
                aircraft.selected = true
            } else {
                aircraft.selected = false
            }

            return aircraft
        })

        setAircraftList(list)
        const aircraftResponse = await getAircraft(id)
        setSelectedAircraft(aircraftResponse.data)
    }
    //


    //Rotation related:
    let addToRotation = (id) => {
        let flight = flightList.find((flight) => flight.id === id)

        if(hasConflict.includes(flight.id)){
            return;
        }

        let conflict = conflictCheck(flight)//Check for time conflict in accordance with the rules of the airline
        if(conflict){
            setHasConflict([...hasConflict, flight.id])
            return;
        }
        
        //Add flight to rotation list as there's no time conflict
        setRotationList([...rotationList, flight])

        //Remove flight from flight list
        let updatedFlightList = flightList.filter((flight) => flight.id !== id)
        setFlightList(updatedFlightList)
        setHasConflict([])
    }

    let removeFromRotation = (id) => {
        //Return flight to flight list
        let flight = rotationList.find((flight) => flight.id === id)
        setFlightList([...flightList, flight])

        //Remove flight from rotation list
        let updatedRotation = rotationList.filter((rotation) => rotation.id !== id)
        setRotationList(updatedRotation)

        setHasConflict([])
    }

    let conflictCheck = (flight) => {
        if(flight.arrivaltime > 86400){ //To make certain that all planes are back by midnight
            return true
        }

        for (let rotation of rotationList){
            let time1 = rotation.departuretime - 1200 //total number of seconds in 20 mins is 1200
            let time2 = rotation.arrivaltime + 1200

            if((flight.departuretime < time1 && flight.arrivaltime >= time1) || (flight.departuretime >= time1 && flight.departuretime <= time2)){
                return true
            }
        }

        return false
    }
    //

    return (
        <div className='flightManager'>
            <Loader show={loading}/>
            <h2 className='header'>Flight Manager</h2>
            <div className='date-selector'>
                <label>Select date: </label>
                <select onChange={handleChange} value={selectedDate} id="">
                    <option value="" hidden>Select date</option>
                    <option value={tommorrow.getDate()}>{tommorrow.toDateString()}</option>
                </select>
            </div>


            <main className='main'>
                <div className='aircraft-section'>
                    Aircrafts
                    <ListContainer>
                        {aircraftList.map(aircraft => <Aircraft key={aircraft.ident} aircraft={aircraft} rotationList={rotationList} select={() => selectAircraft(aircraft.ident)} />)}
                    </ListContainer>
                </div>

                <div className='rotation-section'>
                    Rotation: {selectedAircraft? selectedAircraft.ident: ''}
                    <hr />
                    {
                        selectedAircraft?
                        <ListContainer>
                            {rotationList.sort((a, b) => a.departuretime - b.departuretime).map(flight => <Rotation removeFromRotation={() => removeFromRotation(flight.id)} key={flight.id} flight={flight} />)}
                        </ListContainer>
                        :
                        <p className='text-guide'>*Select aircraft to add Rotation</p>
                    }
                </div>

                <div className='flight-section'>
                    Flights
                    <p style={{display: selectedDate? 'none' : 'block'}} className='text-guide'>*Select date to see flights</p>
                    <ListContainer>
                        {flightList.sort((a, b) => a.departuretime - b.departuretime).map(flight => <Flight rotationList={rotationList} hasConflict={hasConflict} disabled={!selectedAircraft} addToRotation={() => addToRotation(flight.id)} key={flight.id} flight={flight} />)}
                    </ListContainer>
                </div>
            </main>
            {
                selectedAircraft? 
                <div className='chart'>
                    <div className='chart-label'>
                        <p className='label-text'>00:00</p>
                        <p className='label-text'>12:00</p>
                        <p className='label-text'>00:00</p>
                    </div>
                    <hr />
                    <StackedBarChart rotationList={rotationList} />
                </div> : null
            }
        </div>
    )
}

export default FlightManager
