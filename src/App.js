import React, { useState } from 'react';
import './App.css';
import PlayNumber from './PlayNumber';
import PlayAgain from './PlayAgain'
import { utils } from './SharedUtils';
import { StarDisplay } from './StarsDisplay';
import { useGameState } from './useGameState'

function Game(props) {
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
  } = useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active'

  const numberStatus = (num) => {
    if (!availableNums.includes(num)) {
      return 'used';
    }
    if (candidateNums.includes(num)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  }

  const onNumberClick = (number, currStatus) => {
    if (gameStatus !== 'active' || currStatus === 'used') {
      return;
    }

    const newCandidateNums = currStatus === 'available' ? candidateNums.concat(number) : candidateNums.filter(cn => cn !== number);

    setGameState(newCandidateNums);

    // Alternate way to reset is unmount and mount the cpomplete game again!! Check the onClick used in <PlayAgain  ..../>

    // const resetGame = () => {
    //   setStars(utils.random(1, 9));
    //   setAvailabelNums(utils.range(1, 9));
    //   setCanditateNums([]);
    //   setSecondsLeft(10);
    // };
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
    </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ?
            (<PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />) : (<StarDisplay count={stars} />)}
        </div>
        <div className="right">
          {utils.range(1, 9).map(number =>
            <PlayNumber
              key={number}
              status={numberStatus(number)}
              onNumClick={onNumberClick}
              number={number} />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
}


export function App() {
  const [gameId, setGameId] = useState(1);
  // Unmount and then mount the new game
  return (
    <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />
  );
}

export default App;
