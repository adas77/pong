import React, { useEffect, useState } from 'react'
import Ball from './Ball';
import Paddle from './Paddle';
import { PADDLE_WIDTH, PADDLE_HEIGHT } from './Paddle'
import { BALL_RADIUS } from './Ball'
import Goal from './Goal';
import Result from './Result';

interface Props {
    pause: boolean;
    restart: boolean;
}
const WIDTH: number = 900;
const HEIGHT: number = 600;
const LEFT: number = 150;
const TOP: number = 100;
const GOAL_HEIGHT: number = 250;
const GOAL_WIDTH: number = 2
const START_BALL_MARGIN: number = 200;
const JUMP: number = 5;
const BALL_SPEED: number = 20;
const RIGHT: number = LEFT + WIDTH;
const BOTTOM: number = TOP + HEIGHT;
const MIDDLE_X: number = LEFT + WIDTH / 2;
const MIDDLE_Y: number = TOP + HEIGHT / 2;
const GOAL_TOP: number = MIDDLE_Y + GOAL_HEIGHT / 2;
const GOAL_BOTTOM: number = MIDDLE_Y - GOAL_HEIGHT / 2;

const Court: React.FC<Props> = (props) => {
    const FancyButton = React.forwardRef<HTMLButtonElement, React.HTMLProps<HTMLButtonElement>>((props, ref) => (
        <button type="button" ref={ref} className="FancyButton">
            {props.children}
        </button>
    ))
    const { pause, restart } = props;

    const [leftPlayerTop, setLeftPlayerTop] = useState(MIDDLE_Y - PADDLE_HEIGHT / 2)
    const [rightPlayerTop, setRightPlayerTop] = useState(MIDDLE_Y - PADDLE_HEIGHT / 2)
    const [scoreLeft, setScoreLeft] = useState<number>(0)
    const [scoreRight, setScoreRight] = useState<number>(0)
    const [direction, setDirection] = useState<{ jx: number, jy: number }>({
        jx: JUMP,
        jy: JUMP,
    });

    const randomBallPosition = function (margin: number): { bx: number, by: number } {
        let rnd = function (min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        let left = LEFT + PADDLE_WIDTH + margin;
        let right = RIGHT - (PADDLE_WIDTH + margin);
        let top = TOP + margin;
        let bottom = BOTTOM - margin;
        return { bx: rnd(left, right), by: rnd(top, bottom) }
    };

    const [ball, setBall] = useState<{ bx: number, by: number }>({
        bx: randomBallPosition(START_BALL_MARGIN).bx,
        by: randomBallPosition(START_BALL_MARGIN).by,
    });

    const keyDownHandler = function (event: React.KeyboardEvent<HTMLDivElement>): void {
        if (!pause) {
            if (event.code === "ArrowUp" && leftPlayerTop > TOP) {
                setLeftPlayerTop((leftPlayerTop) => leftPlayerTop - JUMP);
            }
            if (event.code === "ArrowDown" && (leftPlayerTop + PADDLE_HEIGHT) < BOTTOM) {
                setLeftPlayerTop((leftPlayerTop) => leftPlayerTop + JUMP);
            }
            if (event.code === "ArrowLeft" && rightPlayerTop > TOP) {
                setRightPlayerTop((rightPlayerTop) => rightPlayerTop - JUMP);
            }
            if (event.code === "ArrowRight" && (rightPlayerTop + PADDLE_HEIGHT) < BOTTOM) {
                setRightPlayerTop((rightPlayerTop) => rightPlayerTop + JUMP);
            }
        }
    };

    const wait = function (ms: number): void {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    };

    const afterGoal = function (isLeft: boolean): void {
        isLeft ? setScoreLeft((scoreLeft) => scoreLeft + 1) : setScoreRight((scoreRight) => scoreRight + 1)
        // console.log(`scoreLeft:${scoreLeft}`)
        // console.log(`scoreRight:${scoreRight}`)
        wait(1000);
        setLeftPlayerTop(MIDDLE_Y - PADDLE_HEIGHT / 2);
        setRightPlayerTop(MIDDLE_Y - PADDLE_HEIGHT / 2);
        let ball = randomBallPosition(START_BALL_MARGIN);
        setBall({ bx: ball.bx, by: ball.by });
    };
    const ballOnGoalheight = function (): boolean {
        return ball.by >= GOAL_BOTTOM && ball.by <= GOAL_TOP;
    };
    const ballOnPaddleheight = function (isLeft: boolean): boolean {
        let top = isLeft ? leftPlayerTop : rightPlayerTop;
        return ball.by >= top && ball.by <= top + PADDLE_HEIGHT;
    };

    const update = function (): void {

        setBall({ bx: ball.bx + direction.jx, by: ball.by + direction.jy })

        if (ball.by - JUMP < TOP) {
            setDirection({ jx: 1 * direction.jx, jy: JUMP });
        }
        if (ball.by + BALL_RADIUS + JUMP > BOTTOM) {
            setDirection({ jx: 1 * direction.jx, jy: -1 * JUMP });
        }
        if (ball.bx - JUMP < LEFT || (ball.bx - JUMP - BALL_RADIUS < LEFT && ballOnPaddleheight(true))) {
            setDirection({ jx: 1 * JUMP, jy: 1 * direction.jy });
        }
        if (ball.bx + BALL_RADIUS + JUMP > RIGHT || (ball.bx + BALL_RADIUS + JUMP + BALL_RADIUS > RIGHT && ballOnPaddleheight(false))) {
            setDirection({ jx: -1 * JUMP, jy: 1 * direction.jy });
        }

        if (ballOnGoalheight()) {
            if (ball.bx - JUMP < LEFT) {
                afterGoal(true);
                // console.log("gol lewy")
            }
            else if (ball.bx + BALL_RADIUS + JUMP > RIGHT) {
                afterGoal(false);
                // console.log("gol prawy")
            }
        }
    }
    useEffect(() => {
        const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
            if (!pause) {
                update();
            }
        }, BALL_SPEED);
        return () => clearTimeout(timeout);
    });

    useEffect(() => {
        setScoreLeft(0);
        setScoreRight(0);
        let b = randomBallPosition(START_BALL_MARGIN);
        setBall({ bx: b.bx, by: b.by });
    }, [restart]);

    return (<>
        <div className="court" tabIndex={0} style={{ position: 'absolute', left: LEFT, width: WIDTH, top: TOP, height: HEIGHT, background: "pink" }} onKeyDown={keyDownHandler}>
            <p>Court</p>
            <Paddle px={LEFT} py={leftPlayerTop} isLeft={true} />
            <Paddle px={RIGHT} py={rightPlayerTop} isLeft={false} />
            <Ball bx={ball.bx} by={ball.by} />
            <Goal top={MIDDLE_Y - GOAL_HEIGHT / 2} left={LEFT} w={GOAL_WIDTH} h={GOAL_HEIGHT} />
            <Goal top={MIDDLE_Y - GOAL_HEIGHT / 2} left={RIGHT + GOAL_WIDTH} w={GOAL_WIDTH} h={GOAL_HEIGHT} />
            <div className='middle-line' style={{ borderLeft: "4px black dotted", top: TOP, left: MIDDLE_X, height: HEIGHT }}></div>
        </div>
        <Result leftPlayer={scoreLeft} rightPlayer={scoreRight} />


    </>)
}

export default Court
