import React, { useState, useEffect } from 'react'
import HSBar from "react-horizontal-stacked-bar-chart";

import './stackedBarChart.scss'

const StackedBarChart = ({ rotationList }) => {
    let [chartData, setChartData] = useState([])

    useEffect(() => {
        let listForChart = []
        
        let addToArr = (service, value) => {
            listForChart.push({
                service: service,
                value: value
            })
        }
        
        if(rotationList.length === 0){
            setChartData([{
                name: "Idle time",
                value: 24,
                description: "24hrs",
                color: 'grey'
            }])
        } else {
            if(rotationList.length === 1){

                let rotation = rotationList[0]
                
                let diff = rotation.departuretime - 0
                addToArr('turn around', diff)
                
                let diff2 = rotation.arrivaltime - rotation.departuretime
                addToArr('scheduled', diff2)
                
                let diff3 = 86400 - rotation.arrivaltime
                addToArr('Idle', diff3)

            } else {
                const sortedRotationList = rotationList.sort((a, b) => a.departuretime - b.departuretime)

                for(let i = 0; i < sortedRotationList.length; i++){
                    let rotation = sortedRotationList[i]
                    if(i === 0){
                        let diff = rotation.departuretime - 0
                        addToArr('turn around', diff)
                    }
    
                    let diff = rotation.arrivaltime - rotation.departuretime
                    addToArr('scheduled', diff)
    
                    if(i === sortedRotationList.length - 1){
                        let diff2 = 86400 - rotation.arrivaltime
                        addToArr('Idle', diff2)
                    } else {
                        let nextItemIndex = i + 1
                        let diff3 = sortedRotationList[nextItemIndex].departuretime - rotation.arrivaltime
                        addToArr('turn around', diff3)
                    }
                }
            }

            let arr = []
            listForChart.forEach(listItem => {
                let chartTextName;
                let chartColor;
                let chartValue = calculateProportion(listItem.value);
    
                switch(listItem.service){
                    case 'Idle':
                        chartTextName = listItem.service
                        chartColor = 'grey'
                        break; 
                    case 'turn around':
                        chartTextName = listItem.service
                        chartColor = '#794179'
                        break; 
                    case 'scheduled':
                        chartTextName = listItem.service
                        chartColor = '#316e31'
                        break;
                    default:
                }
                
                arr.push({
                    name: `${chartTextName} time`,
                    value: Number(chartValue),
                    description: `${chartValue}hrs`,
                    color: chartColor
                })
            })

            setChartData(arr)
        }

    }, [rotationList])

    let calculateProportion = (num) => {
        return (num/60/60).toFixed(1)
    }
    
    return (
        <HSBar
        height={40}
        showTextIn
        outlineWidth={0}
        outlineColor = "black"
        id="new_id"
        fontColor="white"
        data={chartData}
        />
    )
}

export default StackedBarChart
