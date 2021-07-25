import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as messagesController from './messages.controller';
import { isAuthenticatedMiddleware, jwtAuthenticationMiddleware, jwtLogin } from './jwt-authentication';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(jwtAuthenticationMiddleware);

app.post('/jwt-login', jwtLogin);
app.get('/messages', isAuthenticatedMiddleware, messagesController.getAll);
app.post('/messages', isAuthenticatedMiddleware, messagesController.post);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log(`Authentication example app listening on port ${PORT}!`));