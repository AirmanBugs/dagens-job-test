import express, { Response, Request } from 'express'
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { products } from './db';

const app = express();
const PageSize = 24
const N = 10

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

http.createServer(app).listen(3001, () => {
  console.log('Listen on 0.0.0.0:3001');
});

app.get('/', (_, res: Response) => {
  res.send({ status: 200 });
});

app.get('/products/:page', (req, res: Response) => {
  const category = req.query.category
  const maxPrice = typeof req.query.maxPrice === 'string' ? parseFloat(req.query.maxPrice) : Number.MAX_SAFE_INTEGER
  const minPrice = typeof req.query.minPrice === 'string' ? parseFloat(req.query.minPrice) : 0
  const filteredProducts = category || maxPrice < Number.MAX_SAFE_INTEGER || minPrice > 0 ? products.filter(
    p => p.category === category &&
    p.price < maxPrice &&
    p.price > minPrice
    ) : products
  const page = parseInt(req.params.page)
  // TODO: Redirect if page is NaN, too low, or too high
  const start = (page - 1) * PageSize
  const end = page * PageSize
  res.send({
    status: 200,
    products: filteredProducts.slice(start, end)
  })
})

app.get('/products/nearestPrice/:id', (req: Request, res: Response) => {
  const id = req.params.id
  const price = products.find(p => p.id === id)?.price!!
  console.log(products.find(p => p.id == id))
  const productsWithDiffs = products.filter(product => product.id !== id)
  .map(
    product => ({...product, diff: Math.abs(price - product.price)})
    )
  const sortedByDiff = productsWithDiffs.sort((p0, p1) => p0.diff - p1.diff)
  res.send({
    status: 200,
    products: sortedByDiff.slice(0, N).map(product => {
      const { diff, ...rest } = product
      return rest
    })
  })
})

app.post('/products', (req: Request, res: Response) => {
  console.log('Received:', req.body)
  products.push(req.body)
  console.log(products.slice(-10))
  res.send('Got a POST request')
})

process.on('SIGINT', function () {
  process.exit();
});
