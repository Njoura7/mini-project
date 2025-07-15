import { Button } from '@mui/material';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex flex-col p-10 mx-auto max-w-md border border-amber-500 rounded-md'>
      <h1>Vite + React</h1>
      <div className='card'>
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <Button variant='contained'>Contained</Button>
      </div>
    </div>
  );
}

export default App;
