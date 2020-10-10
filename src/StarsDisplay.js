import React from 'react';
import { utils } from './SharedUtils';

export function StarDisplay(props) {
    return (
        <>
            {utils.range(1, props.count).map(starId =>
                <div key={starId} className="star" />
            )}
        </>
    );
}