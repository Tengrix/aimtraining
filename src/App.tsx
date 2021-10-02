import React, {useState} from 'react';
import './App.css';
import Game from "./Game";

const initState = ['Start', 'Choose time']
const timeState = [5, 10, 20, 30]
const colors = ['#0066CC', '#00CC66', '#6600CC', '#FF9933', '#66FF66', '#FF3333', '#FFFF33', '#FFFF99']

function App() {
    const [start, setStart] = useState<boolean>(false)
    const [startTime, setStartTime] = useState<boolean>(false)
    const [time, setTime] = useState<number | null>(null)
    const [circle, setCircle] = useState(<div/>)
    let [point, setPoint] = useState<number>(0)
    const startHandler = () => {
        setStart(true)
    }
    const setTimeHandler = (num: number) => {
        startGame(num)
        createRandomCircle()
    }

    const startGame = (time: number) => {
        setInterval(() => {
            if (time === 0) {
                setTime(0)
            } else {
                setTime(time--)
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
        setPoint(point++)
        createRandomCircle()

    }
    const newGame = () => {
        setCircle(<div/>)
        setStart(false)
        setStartTime(false)
        setPoint(0)
        setTime(0)
    }

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
            <div className={startTime ? 'screen up' : 'screen'}>
                <div>
                    {time ! > 0 ? <h3> Left <span>00:{time ! < 10 && '0'}{time}sec</span></h3> : ''}
                    <div className={'board'}>{time !== 0 ? circle :
                        <h1 className={'screen'}>Score: {point}</h1>
                    }
                    </div>
                    {/*{time===0&&<button onClick={newGame} className={'new'}>New game</button>}*/}
                </div>
            </div>
        </div>
    );
}

export default App;
