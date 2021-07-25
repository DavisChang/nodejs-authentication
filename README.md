# nodejs-authentication

Start this project. The reference is from [Painless Node.js Authentication].(https://developer.okta.com/blog/2019/10/03/painless-node-authentication#test-okta--oidc-authentication-in-your-nodejs-app) 

```bash
npm install && npm start
```

Test token-based authentication
```bash
curl -X POST http://localhost:3000/jwt-login \
  -H "Content-Type: application/json" \
  -d '{"email": "first.user@gmail.com", "password": "password"}'

curl -X POST http://localhost:3000/messages \
  -H "Content-Type: application/json" \
  -H "Access-Token: ${ACCESS_TOKEN}" \
  -d '{"text": "hello again!", "toUserId": "2"}'
```

Test authentication via Okta using OpenID Connect
Need to create okta Appliactions (Appliactions) and get OKTA_DOMAIN, CLIENT_ID, CLIENT_SECRET
Login URL: http://localhost:3000/login
Then create a user account to test from okta Directroy (People) Add person for user id
```bash
curl -X POST http://localhost:3000/messages \
  -H 'Content-Type: application/json' \
  -H 'Cookie: connect.sid=${COOKIE_NAME_CONNET.SID}' \
  -d '{"text": "hello again!", "toUserId": ${okta_user_id_get_from_url}}'
```
