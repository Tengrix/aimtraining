import React, {useState} from 'react';
import './App.css';

type GameType = {
    setTimeHandler: (num: number) => void
    time: number
}

const Game =  React.memo(({setTimeHandler, time}: GameType) => {
    const [currentTime,setCurrentTime] = useState<number>(time)
    return (
        <button onClick={() => setTimeHandler(currentTime)} className={'time-btn'}>{currentTime}sec</button>
    );
})

export default Game
