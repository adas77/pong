import React, { useEffect, useState } from 'react'
import Ball from './Ball';
import Paddle from './Paddle';
import { PADDLE_WIDTH, PADDLE_HEIGHT } from './Paddle'
import { BALL_RADIUS } from './Ball'
import Goal from './Goal';
import Result from './Result';
import { TIMEOUT } from 'dns';
import { setInterval } from 'timers/promises';

interface Props {
    pause: boolean;
    restart: boolean;
}
const Court: React.FC<Props> = (props) => {
    // const { pause, restart } = props;
    const { pause } = props;
    const WIDTH: number = 900;
    const HEIGHT: number = 600;

    const LEFT: number = 150;
    const RIGHT: number = LEFT + WIDTH;
    const TOP: number = 100;
    const BOTTOM: number = TOP + HEIGHT;

    // const MIDDLE_X: number = LEFT + WIDTH / 2;
    const MIDDLE_Y: number = TOP + HEIGHT / 2;



    const GOAL_HEIGHT: number = 600;
    const GOAL_WIDTH: number = 2

    const GOAL_TOP: number = MIDDLE_Y + GOAL_HEIGHT / 2;
    const GOAL_BOTTOM: number = MIDDLE_Y - GOAL_HEIGHT / 2;

    const START_BALL_MARGIN = 200

    const JUMP: number = 5;
    const BALL_SPEED: number = 20;

    const [leftPlayerTop, setLeftPlayerTop] = useState(MIDDLE_Y - PADDLE_HEIGHT / 2)
    const [rightPlayerTop, setRightPlayerTop] = useState(MIDDLE_Y - PADDLE_HEIGHT / 2)

    const [scoreLeft, setScoreLeft] = useState<number>(0)
    const [scoreRight, setScoreRight] = useState<number>(0)
    // const [messages, setMessages] = useState<string[]>([])

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
    }

    );
    const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!pause) {


            if (event.code === "ArrowUp" && leftPlayerTop > TOP) {
                // console.log(event.code)
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

    const [direction, setDirection] = useState<{ jx: number, jy: number }>({
        jx: JUMP,
        jy: JUMP,
    });



    const wait = function (ms: number): void {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    };


    // useEffect(() => {

    //     if (ballOnGoalheight()) {
    //         if (ball.bx - JUMP < LEFT) {
    //             afterGoal(true);
    //             console.log("gol lewy")
    //         }
    //         else if (ball.bx + BALL_RADIUS + JUMP > RIGHT) {
    //             afterGoal(false);
    //             console.log("gol prawy")

    //         }
    //     }

    // })
    const afterGoal = function (isLeft: boolean): void {
        // let score: number = 1 + (isLeft ? scoreLeft : scoreRight);
        // isLeft ? setScoreLeft(scoreLeft + 1) : setScoreRight(scoreRight + 1);
        isLeft ? setScoreLeft((scoreLeft) => scoreLeft + 1) : setScoreRight((scoreRight) => scoreRight + 1)
        console.log(`scoreLeft:${scoreLeft}`)
        console.log(`scoreRight:${scoreRight}`)
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

    const update = () => {
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
                console.log("gol lewy")
            }
            else if (ball.bx + BALL_RADIUS + JUMP > RIGHT) {
                afterGoal(false);
                console.log("gol prawy")
            }
        }
    }


    // useEffect(() => {
    //     const interval: any = setTimeout(() => {
    //         if (!pause) {
    //             update();
    //         }
    //     }, BALL_SPEED);
    //     return () => clearTimeout(interval);
    // });

    useEffect(() => {
        const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
            if (!pause) {
                update();
            }
        }, BALL_SPEED);
        return () => clearTimeout(timeout);
    });






    return (<>
        <div className="court" tabIndex={0} style={{ position: 'absolute', left: LEFT, width: WIDTH, top: TOP, height: HEIGHT, background: "pink" }} onKeyDown={keyDownHandler}>
            <p>Court</p>
            <Paddle px={LEFT} py={leftPlayerTop} isLeft={true} />
            <Paddle px={RIGHT} py={rightPlayerTop} isLeft={false} />
            <Ball bx={ball.bx} by={ball.by} />
            <Goal top={MIDDLE_Y - GOAL_HEIGHT / 2} left={LEFT} w={GOAL_WIDTH} h={GOAL_HEIGHT} />
            <Goal top={MIDDLE_Y - GOAL_HEIGHT / 2} left={RIGHT - GOAL_WIDTH} w={GOAL_WIDTH} h={GOAL_HEIGHT} />
            <div>BALL={ball.bx}:{ball.by}</div>
        </div>
        <Result leftPlayer={scoreLeft} rightPlayer={scoreRight} />
        {/* <p>MESSAGES</p>
        {messages.map((m, i) => (<p key={i}>{m}</p>))}
        <p>MESSAGES</p> */}
    </>
    )
}

export default Court


