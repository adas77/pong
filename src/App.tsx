import React, { useState } from 'react';
import './App.css';
import Counter from './components/Counter';
import Court from './components/Court';

function App() {

  const [pause, setPause] = useState<boolean>(false)
  const [restart, setRestart] = useState<boolean>(false)

  // const [leftPlayer, setLeftPlayer] = useState<number>(0)
  // const [rightPlayer, setrightPlayer] = useState<number>(0)

  const changePause = () => (event: React.MouseEvent<HTMLElement>) => {
    setPause(!pause)
  };
  const changeRestart = () => (event: React.MouseEvent<HTMLElement>) => {
    setRestart(!restart)
  };

  // const leftScore = () => (event: React.MouseEvent<HTMLElement>) => {
  //   setLeftPlayer(leftPlayer + 1)
  // }
  // const rightScore = () => (event: React.MouseEvent<HTMLElement>) => {
  //   setrightPlayer(rightPlayer + 1)
  // }



  return (
    <>
      <Counter pause={pause} restart={restart} />
      <button onClick={changePause()}>Pause</button>
      <button onClick={changeRestart()}>Restart</button>
      <div>p:{String(pause)}</div>
      <div>r:{String(restart)}</div>
      <Court pause={pause} restart={restart} />
    </>
  );
}

export default App;
