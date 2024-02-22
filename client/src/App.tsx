import React from 'react'

export const baseURL = 'http://localhost:3001'

const App: React.FC = () => (
  <div className="app">
    <h3>Happy hacking!</h3>
    <button onClick={sendPushRequest}>Push me, why don't ya!</button>
  </div>
);

const sendPushRequest = async () => {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      answer: 42
    })
  }
  console.log('Sending:', req)
  const response = await fetch(baseURL, req);
  console.log('Received', response)
}

export default App;
