import express, { Response } from 'express'
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import './db';

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

process.on('SIGINT', function () {
  process.exit();
});
