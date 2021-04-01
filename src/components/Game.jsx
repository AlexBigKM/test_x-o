import React, { useState } from 'react'
import Board from './Board'
import { calculateWinner } from '../winner'

import './Game.css'

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [xNext, setXNext] = useState(true)
    const [step, setStep] = useState(9)
    const winner = calculateWinner(board)


    const handleClick = (index) => {
        const boardCopy = [...board]
        
        if (winner || boardCopy[index]) return 
        
        boardCopy[index] = xNext ? 'X' : 'O'
        
        setBoard(boardCopy)
        setXNext(!xNext)
        setStep(step - 1)
    }

    const newGame = () => {
        return (
            <button className="start__btn" onClick={() => {
                setBoard(Array(9).fill(null))
                setStep(9)
            }}>New Game</button>
        )
    }

    const resetGame = () => {

        return (
            <button className="reset__btn" onClick={() => {
                setBoard(Array(9).fill(null)) &&
                setStep(9)
            }}>Reset Game</button>
        )
    }


    return (
        <div className="wrapper">
            <div className="player__block">
                <button className="player__btn" onClick={() => setXNext(!xNext)}>X or O</button>
            </div>
            {newGame()}
            <Board squares={board} click={handleClick} />
            <p className="board__info">
                {
                    winner ? 'Победил: ' + winner : 'Сейчас ходит: ' + ( xNext ? 'X' : 'O')
                }
            </p>
            <p className="board__info">
                Ходов осталось: { !winner ? step : '0'}
            </p>
            <div className="win__table">
                <p className="win__title">Игрок 1 побед: {(winner === 'X') ? + 1 : 0}</p>
                <p className="win__title">Игрок 2 побед: {(winner === 'O') ? + 1 : 0}</p>
            </div>
        </div>
    );
}

export default Game;
