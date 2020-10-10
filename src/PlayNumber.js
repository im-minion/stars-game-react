import React from 'react'
import { colors } from './SharedUtils'
export function PlayNumber({ number, status, onNumClick }) {
    return (
        <button key={number}
            style={{ backgroundColor: colors[status] }}
            className="number"
            onClick={() => { onNumClick(number, status) }}>
            {number}
        </button>);
}

export default PlayNumber;