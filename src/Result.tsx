import React, {ReactElement} from "react";
type ResultType = {
    startTime:boolean;
    time:number | null;
    circle:ReactElement;
    point:number;
    newGame:()=>void;
    // restartGame:(value:number|null) =>void;
    restartTime:number | null;
}
const Result = React.memo( ({startTime,time,circle,point,newGame,restartTime}:ResultType) => {
    return(
        <div className={startTime ? 'screen up' : 'screen'}>
            <div>
                {time ! > 0 ? <h3> Left <span>00:{time ! < 10 && '0'}{time}sec</span></h3> : ''}
                <div className={'board'}>{time !== 0 ? circle :
                    <h1 className={'screen'}>Score: {point}</h1>
                }
                </div>
                {time===0&&
                <span>
                    <button onClick={newGame} className={'new'}>Try it Again</button>
                </span>}
            </div>
        </div>
    )
})
export default Result;