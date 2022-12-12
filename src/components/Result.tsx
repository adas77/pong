import React from 'react'
interface Props {
    leftPlayer: number;
    rightPlayer: number;
}
const Result: React.FC<Props> = (props) => {
    const { leftPlayer, rightPlayer } = props;
    return (
        <div className='result'>{leftPlayer}:{rightPlayer}</div>
    )
}

export default Result