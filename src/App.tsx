import React, {useState} from 'react';
import './App.css';
import Game from "./Game";
import Result from "./Result";

const initState = ['Start', 'Choose time']
const timeState = [5, 10, 20, 30]
const colors = ['#0066CC', '#00CC66', '#6600CC', '#FF9933', '#66FF66', '#FF3333', '#FFFF33', '#FFFF99']

function App() {
    const [start, setStart] = useState<boolean>(false)
    const [startTime, setStartTime] = useState<boolean>(false)
    const [time, setTime] = useState<number | null>(null)
    const [circle, setCircle] = useState(<div/>)
    let [point, setPoint] = useState<number>(0)
    let [restartTime, setRestartTime] = useState<number | null>(null)
    const startHandler = () => {
        setStart(true)
        setTime(null)

    }
    const setTimeHandler = (num: number) => {
        startGame(num)
        createRandomCircle()
        setRestartTime(num)
    }

    const startGame = (time: number|null) => {
        setInterval(() => {
            if (time === 0) {
                setStart(true)
            } else {
                // @ts-ignore
                setTime(--time)
            }
        }, 1000)
        setStartTime(true)
    }

    const createRandomCircle = () => {
        let size = getRandomNumber(10, 60)
        const x = getRandomNumber(0, 500 - size)
        const y = getRandomNumber(0, 500 - size)
        let color = colors[Math.floor(Math.random() * colors.length)]
        setCircle(<div onClick={pointHandler} className={'circle'}
                       style={{
                           width: `${size}px`,
                           height: `${size}px`,
                           top: `${y}px`,
                           left: `${x}px`,
                           backgroundColor: `${color}`
                       }}/>)
    }
    const getRandomNumber = (max: number, min: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const pointHandler = () => {
        createRandomCircle()
        if(restartTime===0){
            setPoint(0)
        }else{
            setPoint(++point)
        }

    }
    const newGame = () => {
        setCircle(<div/>)
        setStart(false)
        setStartTime(false)
        setPoint(0)
        setTime(null)
    }
    // const restartGame = (time:number|null) => {
    //     setPoint(0)
    //     startGame(time)
    //     setCircle(<div/>)
    //     createRandomCircle()
    // }
    return (
        <div className="App">
            <div className={start ? 'screen up' : 'screen'}>
                <h1>Aim Training</h1>
                <button className={'start'} onClick={startHandler}> {initState[0]}</button>
            </div>
            <div className={'screen'}>
                <h1> {initState[1]} </h1>
                <ul className={'time-list'}>
                    {timeState.map((el, i) =>
                        <li key={i}>
                            <Game
                                time={el}
                                setTimeHandler={setTimeHandler}/>
                        </li>
                    )}
                </ul>
            </div>
             <Result
                 startTime={startTime}
                 time={time}
                 circle={circle}
                 point={point}
                 newGame={newGame}
                 // restartGame={restartGame}
                 restartTime={restartTime}
             />
            {/*<div className={startTime ? 'screen up' : 'screen'}>*/}
            {/*    <div>*/}
            {/*        {time ! > 0 ? <h3> Left <span>00:{time ! < 10 && '0'}{time}sec</span></h3> : ''}*/}
            {/*        <div className={'board'}>{time !== 0 ? circle :*/}
            {/*            <h1 className={'screen'}>Score: {point}</h1>*/}
            {/*        }*/}
            {/*        </div>*/}
            {/*        {time===0&&*/}
            {/*    <span>*/}
            {/*        One more time ?*/}
            {/*        <button onClick={newGame} className={'new'}>Yes</button>*/}
            {/*        <button onClick={()=>restartGame(restartTime)} className={'new'}>No</button>*/}
            {/*    </span>}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
