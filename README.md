# Portal

## How to run the code locally?

First time setting up, create a `.env.local` file at project root with these values

```
# auth zero
AUTH0_SECRET=0a9e9866ff2ee0f3ccd55473173ac62bc8dafc21e442902b76abf7875c0aacc3
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://dev-q7qncgd1btfgkm11.us.auth0.com
AUTH0_CLIENT_ID=ybqYp4MqYZCW2Ku9PaPdGHPvCqIkyBnm
AUTH0_CLIENT_SECRET=GsRhLen3j8CFbUPtIdrJGf1L9OZrWS50SIXZyzPKVyN-j_KaabjUsZmSa7P7s29Q
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Then

```bash
npm install
npm run dev
```
