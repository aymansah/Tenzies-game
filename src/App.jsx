import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies]= useState(false)

  useEffect(() => {
    console.log("Dice state changed!")
    const allHeld = dice.every(die => die.isHeld)
    const firstVal = dice[0].value
    const allSameVal = dice.every(die => die.value === firstVal)
    if(allHeld && allSameVal){
      setTenzies(true)
      console.log("you won!")
    }
  }, [dice])
  // function allNewDice(){
  //   const newDice = []
  //   for (let i=0; i<10 ; i++){
  //     newDice[i] = {
  //       value: Math.ceil(Math.random() * 6),
  //       isHeld: false
  //     }
  //   }  
  //   return newDice
  // }
  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push({
            value: Math.ceil(Math.random() * 6), 
            isHeld: false,
            id: nanoid()
        })
    }
    // console.log(newDice);
    return newDice
  }
  function rollDice() {
    if (!tenzies) {
      const element = array[index];
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }
  function hold(id){
    setDice( oldDice => oldDice.map((die) => {
          if(die.id === id){
            return {...die, isHeld: !die.isHeld}
          } else {
            return die
          }
        })
    )
  }
  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} hold={() => hold(die.id)} />)
//console.log(allNewDice())
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button 
        className='roll-dice'
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
    
  )
}

export default App
