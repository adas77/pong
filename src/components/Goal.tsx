import React from 'react'
interface Props {
    top: number,
    left: number,
    w: number,
    h: number,
}
const Goal: React.FC<Props> = (props) => {
    const { top, left, w, h } = props;
    return (
        <div className='goal' style={{ top: top, left: left, width: w, height: h, backgroundColor: "green" }}></div>
    )
}

export default Goal