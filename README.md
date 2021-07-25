# nodejs-authentication


Start this project
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