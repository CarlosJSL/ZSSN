import bodyParser from 'body-parser';
import express from 'express';
import config from './config/config';
import datasource from './config/datasource';
import personsRouter from './routes/person';


const app = express();

app.config = config;
app.datasource = datasource(app);

app.set('port', 7000);
app.use(bodyParser.json());
personsRouter(app);


export default app;
