import React, {useState} from 'react';
import './App.css';

type GameType = {
    setTimeHandler: (num: number) => void
    time: number
}

function Game({setTimeHandler, time}: GameType) {


    return (
        <button onClick={() => setTimeHandler(time)} className={'time-btn'}>{time}sec</button>
    );
}

export default Game
