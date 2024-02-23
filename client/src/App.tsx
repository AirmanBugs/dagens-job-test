import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Product } from '../../interface/types'

export const baseURL = 'http://localhost:3001'

const App: React.FC = () => {
  const [product, setProduct] = useState<Partial<Product>>({})

  return (
    <div className="app">
      <h3>Happy hacking!</h3>
      <h2>Add New Product</h2>
      <form
        onSubmit={event => {
          event.preventDefault()
          const validProduct = validateProduct(product)
          validProduct && addProduct(validProduct)
        }}
      >
        <section>
          <label>
            Name:
            <input
              type="text"
              name="name"
              onChange={event =>
                setProduct({
                  ...product,
                  name: event.target.value
                })
              }
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              onChange={event =>
                setProduct({
                  ...product,
                  category: event.target.value
                })
              }
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              name="price"
              onChange={event => {
                const floatValue = parseFloat(event.target.value)
                setProduct({
                  ...product,
                  price: floatValue
                })
              }}
            />
          </label>
        </section>
        <button type="submit" disabled={validateProduct(product) === null}>
          Add Product
        </button>
      </form>
    </div>
  )
}

const addProduct = async (product: Product) => {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  }
  console.log('Sending:', req)
  const response = await fetch(`${baseURL}/products`, req)
  console.log('Received', response)
}

const validateProduct = (product: Partial<Product>): Product | null =>
  product.name &&
  product.category &&
  product.price &&
  !Number.isNaN(product.price)
    ? {
        id: uuid(),
        name: product.name,
        category: product.category,
        price: product.price
      }
    : null

export default App
