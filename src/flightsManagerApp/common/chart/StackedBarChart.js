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
            const sortedRotationList = rotationList.sort((a, b) => a.departuretime - b.departuretime)

            for(let i = 0; i < sortedRotationList.length; i++){
                let rotation = sortedRotationList[i]
                if(i === 0){
                    let timeDiff = rotation.departuretime - 0
                    addToArr('Idle time', timeDiff)
                }

                let timeDiff = rotation.arrivaltime - rotation.departuretime
                addToArr('scheduled service', timeDiff)

                if(i === sortedRotationList.length - 1){
                    let timeDiff2 = 86400 - rotation.arrivaltime
                    addToArr('Idle time', timeDiff2)
                } else {
                    let nextItemIndex = i + 1
                    let timeDiff3 = sortedRotationList[nextItemIndex].departuretime - rotation.arrivaltime
                    addToArr('turn around time', timeDiff3)
                }
            }

            let arr = []
            listForChart.forEach(listItem => {
                let chartTextName;
                let chartColor;
                let chartValue = calculateProportion(listItem.value);
                let chartDesc = convertToReadableTime(chartValue);
    
                switch(listItem.service){
                    case 'Idle time':
                        chartTextName = listItem.service
                        chartColor = 'grey'
                        break; 
                    case 'turn around time':
                        chartTextName = listItem.service
                        chartColor = '#794179'
                        break; 
                    case 'scheduled service':
                        chartTextName = listItem.service
                        chartColor = '#316e31'
                        break;
                    default:
                }
                
                arr.push({
                    name: chartTextName,
                    value: chartValue,
                    description: chartDesc,
                    color: chartColor
                })
            })

            setChartData(arr)
        }

    }, [rotationList])

    let calculateProportion = (num) => {
        return num/60/60
    }

    let convertToReadableTime = (num) => {
        let numStr = num.toString()
        let intNum = numStr
        let mins;

        if(numStr.includes('.')){
            let numArr = numStr.split('.')
            intNum = numArr[0]
            mins = Math.round(`.${numArr[1]}` * 60)
        }

        let hrs = intNum > 0? `${intNum}hr${intNum > 1? 's' : ''}` : ''
        let minutes = mins? `${hrs? ':' : ''}${mins}mins` : ''

        return `${hrs}${minutes}`
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
