import { useEffect, useState } from 'react'
interface Props {
    pause: boolean;
    restart: boolean;
}

const Counter: React.FC<Props> = (props) => {
    const { pause, restart } = props;
    const SECOND: number = 1000;
    const MINUTE: number = SECOND * 60;
    const HOUR: number = MINUTE * 60;
    const DAY: number = HOUR * 24;
    const [time, setTime] = useState<number>(0)

    useEffect(() => {
        if (!pause) {
            const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
                setTime(time + 1);
            }, 1);
            return () => clearTimeout(timeout);
        }
    });

    useEffect(() => {
        setTime(0);
    }, [restart]);
    return (<>
        <div className='clock'>
            Time: {Math.floor(time / DAY)} d {Math.floor((time / HOUR) % 24)} h {Math.floor((time / MINUTE) % 60)} m {Math.floor((time / SECOND) % 60)} s
        </div>
    </>)
}

export default Counter
