import React, { useEffect, useState } from 'react';
import './App.css';
import PlayNumber from './PlayNumber';
import PlayAgain from './PlayAgain'
import { utils } from './SharedUtils';
import { StarDisplay } from './StarsDisplay';

function Game(props) {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailabelNums] = useState(utils.range(1, 9));
  const [candidateNums, setCanditateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      console.log('Rendered....');
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active'

  // Alternate way to reset is unmount and mount the cpomplete game again!! Check the onClick used in <PlayAgain  ..../>
  // const resetGame = () => {
  //   setStars(utils.random(1, 9));
  //   setAvailabelNums(utils.range(1, 9));
  //   setCanditateNums([]);
  //   setSecondsLeft(10);
  // };

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
    // currStatus => newStatus
    if (gameStatus !== 'active' || currStatus === 'used') {
      return;
    }

    //candidate
    const newCandidateNums = currStatus === 'available' ? candidateNums.concat(number) : candidateNums.filter(cn => cn !== number);

    if (utils.sum(newCandidateNums) !== stars) {
      setCanditateNums(newCandidateNums);
    } else {
      const newAvalNums = availableNums.filter(n => !newCandidateNums.includes(n));
      // redraw stars
      setStars(utils.randomSumIn(newAvalNums, 9));
      setAvailabelNums(newAvalNums);
      setCanditateNums([]);
    }
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
    <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>
  );
}

export default App;
