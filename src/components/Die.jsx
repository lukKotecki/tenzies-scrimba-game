import React from "react"

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face"
            style={styles}
            onClick={props.holdDice}
        >
            <div  className={"die die-"+props.value} >
                <div className='dot dot-1'> </div>
                <div className='dot dot-2'> </div>
                <div className='dot dot-3'> </div>
                <div className='dot dot-4'> </div>
                <div className='dot dot-5'> </div>
                <div className='dot dot-6'> </div>
                <div className='dot dot-7'> </div>
                <div className='dot dot-8'> </div>
                <div className='dot dot-9'> </div>
            </div>
        </div>
    )
}