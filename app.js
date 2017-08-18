import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.set('port', 7000);
app.use(bodyParser.json());

export default app;
