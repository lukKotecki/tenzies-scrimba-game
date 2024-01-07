import React from "react"
import Die from "./components/Die.jsx"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Info from './components/Info'

export default function App() {
  
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [timerSeconds, setTimerSeconds] = React.useState(0)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            updateBestRolls(rolls)
            updateBestTime(timerSeconds)
        }
    }, [dice])

    function getBestRolls(){
      return localStorage.getItem('rolls') || 9999
    }
    function updateBestRolls(roll){
      if(roll < Number(getBestRolls()) )
        localStorage.setItem('rolls', roll)
    }


    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) { 
            setRolls(prev=> prev+1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRolls(0)
            setTimerSeconds(0)
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))

 
      
    function startTimer() {
      React.useEffect(() => {
        let myTimer
        if (!tenzies)
          myTimer = setTimeout(()=>setTimerSeconds(prev => prev+=1), 1000)
        
        return ()=> clearTimeout(myTimer)
      },
      [timerSeconds])
    }
    
    function getBestTime(){
      return localStorage.getItem('myTime') || 9999
    }
    function updateBestTime(time){
      if(time < Number(getBestTime()) )
        localStorage.setItem('myTime', time)
    }

    
    //console.log(timerSeconds)


    startTimer()
      
    return (
        <main>

            <Info 
              bestRolls={getBestRolls()} 
              rolls={rolls} 
              bestTime={getBestTime()}
              timerSeconds={timerSeconds}/>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}