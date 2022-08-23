## Codebase SSR with Typescript

### Installation
- Clone project
- Run `npm install`
- Run  `npx husky add .husky/pre-commit "npm run test && npm run lint"`
- Run `npm run dev`
- Open `localhost:3000` in browser

### Development
- Run `npm run dev`
- Open `localhost:3000` in browser

### Testing
- Run `npm test`
- Run `npm run test:cover`
- Open file from directory `./coverage/lcov-report/index.html` in browser

### Production Build
- Run `npm run build`
- Run `npm start`
- Open `localhost:4000` in browser
