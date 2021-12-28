
export const getFlightList = async () => {
    const list = await(await fetch("https://infinite-dawn-93085.herokuapp.com/flights")).json()
    return list
}

export const getAircraftList = async () => {
    const list = await(await fetch("https://infinite-dawn-93085.herokuapp.com/aircrafts")).json()
    return list
}

export const getAircraft = async (id) => {
    const aircraft = await(await fetch(`https://infinite-dawn-93085.herokuapp.com/aircrafts/${id}`)).json()
    return aircraft
}