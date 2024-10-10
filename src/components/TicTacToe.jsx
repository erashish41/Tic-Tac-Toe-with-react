import { useEffect, useState } from "react";

function Square ({value, onClick}) {
    return <button onClick={onClick} className="square">{value}</button>
}

export const TicTacToe = () => {

    const [squares, setSquares] = useState(Array(9).fill(""));
    const [isXTurn, setIsXTurn] = useState(true);
    const [status, setStatus] = useState("");
    console.log(squares);

    function getWinner (){
        const winnerPattern = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [2,4,6],
            [1,4,7],
            [0,3,6],
            [2,5,8]
        ]

        for(let i=0; i<winnerPattern.length; i++){
            const [x,y,z] = winnerPattern[i];
            if(squares[x] && squares[x] === squares[y] && squares[x] === squares[z]){
                return squares[x]
            }
        }
        return null;
    }
    
    function handleOnClick(getCurrentSquare){
        let cpySquares = [...squares]
        if (getWinner(cpySquares) || cpySquares[getCurrentSquare]) return;
        cpySquares[getCurrentSquare] = isXTurn ? "X" : "O"
        setIsXTurn(!isXTurn);
        setSquares(cpySquares)
    }

    const handleRestart = () => {
        setIsXTurn(true);
        setSquares(Array(9).fill(""));
    }   

    useEffect(()=>{
        if (!getWinner (squares) && squares.every ((item) => item !== "")) {
            setStatus (`This is a draw ! Please restart the game`);
            } else if (getWinner (squares)) {
            setStatus(`Winner is ${getWinner (squares)}. Please restart the game`);
            } else {
            setStatus(`Next player is ${isXTurn ? "X" : "0"}`);
            }
    },[squares, isXTurn])

    console.log(squares);
    

    return (
        <div className="tic-tac-toe-container">
            <div className="row">
                <Square value={squares[0]} onClick={() => handleOnClick(0)}/>
                <Square value={squares[1]} onClick={() => handleOnClick(1)}/>
                <Square value={squares[2]} onClick={() => handleOnClick(2)}/>
            </div>
            <div className="row">
                <Square value={squares[3]} onClick={() => handleOnClick(3)}/>
                <Square value={squares[4]} onClick={() => handleOnClick(4)}/>
                <Square value={squares[5]} onClick={() => handleOnClick(5)}/>
            </div>
            <div className="row">
                <Square value={squares[6]} onClick={() => handleOnClick(6)}/>
                <Square value={squares[7]} onClick={() => handleOnClick(7)}/>
                <Square value={squares[8]} onClick={() => handleOnClick(8)}/>
            </div>
            <h1>{status}</h1>
            <button onClick={handleRestart}>Restart</button>
        </div>
    )
}