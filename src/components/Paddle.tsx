import React, { useState } from 'react'
import CSS from 'csstype';
interface Props {
    px: number;
    py: number;
    isLeft: boolean;
}
export const PADDLE_WIDTH: number = 20;
export const PADDLE_HEIGHT: number = 120;
const Paddle: React.FC<Props> = (props) => {
    const { px, py, isLeft } = props;


    const paddleStyle: CSS.Properties = {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        position: 'absolute',
        right: "100px",
        bottom: '2rem',
        padding: '0.5rem',
    };

    return (
        isLeft ? <div className="paddle-left" style={{ left: px, top: py, width: PADDLE_WIDTH, height: PADDLE_HEIGHT }}>l</div> : <div className="paddle-right" style={{ left: px - PADDLE_WIDTH, top: py, width: PADDLE_WIDTH, height: PADDLE_HEIGHT }}>r</div>
    )
}

export default Paddle