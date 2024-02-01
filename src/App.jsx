import React from "react"
import Die from "./components/Die.jsx"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Info from './components/Info'

export default function App() {
  
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [gameStarted, setGameStarted] =React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [timerSeconds, setTimerSeconds] = React.useState(0)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setGameStarted(false)
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
        setGameStarted(true)
        
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

 
      React.useEffect(() => {
        let myTimer
        // console.log(gameStarted)
        if(!gameStarted)
        myTimer = 0;
        if (gameStarted)
          myTimer = setTimeout(()=>setTimerSeconds(prev => prev+=1), 1000)
        return ()=> clearTimeout(myTimer)
      },
      [timerSeconds, gameStarted])
    
    
    function getBestTime(){
      return localStorage.getItem('myTime') || 9999
    }
    function updateBestTime(time){
      if(time < Number(getBestTime()) )
        localStorage.setItem('myTime', time)
    }

    
    //console.log(timerSeconds)


      
    return (
        <main>

            <Info 
              bestRolls={getBestRolls()} 
              rolls={rolls} 
              bestTime={getBestTime()}
              timerSeconds={timerSeconds}/>
            {tenzies && <Confetti />}
            <h1 className="title">  <span style={{color:'#2301ff'}}>C</span>
                                    <span style={{color:'#a40b43'}}>o</span> 
                                    <span style={{color:'#8846fa'}}>l</span> 
                                    <span style={{color:'#35ff86'}}>o</span> 
                                    <span style={{color:'#ffda35'}}>r</span> 
                                    <span style={{color:'#fc35ff'}}>-</span> 
            Tenzies</h1>
            <p className="instructions"><strong>New Color-Tenzies game!</strong> <br/>
                                        Click each color dice to freeze it at its current state. 
                                        Remember freezed dice and Roll until <br/><strong>all dice are frozen</strong> at the same state. 
                                        <br/>Remember each click! GL & HF
            </p>
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