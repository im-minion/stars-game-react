import React, { useState } from 'react';
import './App.css';
import PlayNumber from './PlayNumber';
import { utils } from './SharedUtils';
import { StarDisplay } from './StarsDisplay';

function App() {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailabelNums] = useState(utils.range(1, 9));
  const [candidateNums, setCanditateNums] = useState([]);

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

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
    if (currStatus === 'used') {
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
          <StarDisplay count={stars} />
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
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
}
export default App;
