import React from 'react'
import {v4 as uuid} from 'uuid'

export const baseURL = 'http://localhost:3001'

const App: React.FC = () => {
  const product = {
    id: uuid(),
    name: 'pineapple',
    category: 'greens',
    price: 42
  }
  return (
    <div className="app">
      <h3>Happy hacking!</h3>
      <button onClick={() => addProduct(product)}>Push me, why don't ya!</button>
    </div>
  );
};

const addProduct = async (product: Product) => {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product)
  }
  console.log('Sending:', req)
  const response = await fetch(`${baseURL}/products`, req);
  console.log('Received', response)
}

export default App;
