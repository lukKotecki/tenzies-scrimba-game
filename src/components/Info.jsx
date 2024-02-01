import React from 'react'


export default function Info(props){

    return (
        <div className='info-container'>
            <div className='info-element'>Best time: {props.bestTime}</div>
            <div className='info-element'>Current time: {props.timerSeconds} s</div>
            <div className='info-element'>Best rolls: {props.bestRolls}</div>
            <div className='info-element'>Current rolls: {props.rolls}</div>
        </div>
    )
}


