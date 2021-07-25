import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as messagesController from './messages.controller';
// import { isAuthenticatedMiddleware, jwtAuthenticationMiddleware, jwtLogin } from './jwt-authentication';
import { ExpressOIDC } from '@okta/oidc-middleware';
import session from 'express-session';

const app = express();


const { OKTA_DOMAIN, CLIENT_ID, CLIENT_SECRET, APP_BASE_URL, APP_SECRET } = process.env;

const oidc = new ExpressOIDC({
  issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  appBaseUrl: APP_BASE_URL,
  scope: 'openid profile',
  post_logout_redirect_uri: 'http://localhost:3000/logout/callback',
});

app.use(session({
  secret: APP_SECRET,
  resave: true,
  saveUninitialized: false,
}));


app.use(oidc.router);

app.use(cors());
app.use(bodyParser.json());

// app.use(jwtAuthenticationMiddleware);


// oidc
app.get('/messages', oidc.ensureAuthenticated(), messagesController.getAll);
app.post('/messages', oidc.ensureAuthenticated(), messagesController.post);

// Token-based authentication
// app.post('/jwt-login', jwtLogin);
// app.get('/messages', isAuthenticatedMiddleware, messagesController.getAll);
// app.post('/messages', isAuthenticatedMiddleware, messagesController.post);


app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.get('/logout', oidc.forceLogoutAndRevoke(), (req, res) => {
  // This is never called because forceLogoutAndRevoke always redirects.
});


const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log(`Authentication example app listening on port ${PORT}!`));