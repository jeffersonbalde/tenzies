import React from 'react'
import Die from './components/Die'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

const App = () => {

  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  // create 10 random numbers array
  const allNewDice = () => {
    const diceArr = []
    for(let i = 0; i < 10; i++) {
      diceArr.push(generateNewDie())
    }
    return diceArr;
  }

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if(allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  const handleClick = () => {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  const holdDice = (id) => {
    setDice(oldDice => oldDice.map(die =>{
      return die.id === id ? {...die , isHeld: !die.isHeld} : die
    }))
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. 
      Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {dice.map(item => {
          return <Die 
          value={item.value} 
          key={item.id} 
          isHeld={item.isHeld}
          holdDice={() => holdDice(item.id)}
          />
        })}
        <button onClick={handleClick} className="roll-dice">{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </main>
  )
}

export default App