import { useEffect, useState } from 'react';
import { utils } from './SharedUtils';

export const useGameState = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailabelNums] = useState(utils.range(1, 9));
    const [candidateNums, setCanditateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        // inz side effects
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
            // clean up side effect
            return () => clearTimeout(timerId);
        }
    });

    const setGameState = (newCandidateNums) => {
        if (utils.sum(newCandidateNums) !== stars) {
            setCanditateNums(newCandidateNums);
        } else {
            const newAvalNums = availableNums.filter(n => !newCandidateNums.includes(n));
            // redraw stars
            setStars(utils.randomSumIn(newAvalNums, 9));
            setAvailabelNums(newAvalNums);
            setCanditateNums([]);
        }
    }

    return { stars, availableNums, candidateNums, secondsLeft, setGameState };
}

export default useGameState;