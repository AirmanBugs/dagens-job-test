import express, { Response, Request } from 'express'
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { products } from './db';

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

http.createServer(app).listen(3001, () => {
  console.log('Listen on 0.0.0.0:3001');
});

app.get('/', (_, res: Response) => {
  res.send({ status: 200 });
});

app.get('/products', (_, res: Response) => {
  res.send({ 
    status: 200, 
    products
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
