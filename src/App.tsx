import React, { useState } from 'react';
import './App.css';
import Counter from './components/Counter';
import Court from './components/Court';

function App() {
  const [pause, setPause] = useState<boolean>(false)
  const [restart, setRestart] = useState<boolean>(false)

  const changePause = () => (event: React.MouseEvent<HTMLElement>) => {
    setPause(!pause)
  };
  const changeRestart = () => (event: React.MouseEvent<HTMLElement>) => {
    setRestart(!restart)
  };

  return (
    <>
      <Court pause={pause} restart={restart} />
      <Counter pause={pause} restart={restart} />
      <div className='option'>
        <button onClick={changePause()}>Pause</button>
        <button onClick={changeRestart()}>Restart</button>
      </div>
    </>
  );
}

export default App;
