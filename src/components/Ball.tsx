import React from 'react'
export interface Props {
    bx: number;
    by: number;
}
export const BALL_RADIUS = 20;
const Ball: React.FC<Props> = (props) => {
    const { bx, by } = props;
    return (
        <>
            <div className='ball' style={{ left: bx, top: by, height: BALL_RADIUS, width: BALL_RADIUS, borderRadius: "50%", backgroundColor: "black" }}>piłka</div >
            {bx}::{by}
        </>
    )
}
export default Ball