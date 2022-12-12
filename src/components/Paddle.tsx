interface Props {
    px: number;
    py: number;
    isLeft: boolean;
}
export const PADDLE_WIDTH: number = 20;
export const PADDLE_HEIGHT: number = 120;
const Paddle: React.FC<Props> = (props) => {
    const { px, py, isLeft } = props;

    return (
        isLeft ? <div className="paddle-left" style={{ left: px, top: py, width: PADDLE_WIDTH, height: PADDLE_HEIGHT }}>l</div> : <div className="paddle-right" style={{ left: px - PADDLE_WIDTH, top: py, width: PADDLE_WIDTH, height: PADDLE_HEIGHT }}>r</div>
    )
}

export default Paddle