# TicTacToe Game
Written on React/Redux.

## Run
1. Launch docker compose:
`docker-compose up --build`
2. Or run `yarn install && yarn start` locally. Yarn version should be `<2.0`.

## Todos
1. ~Update layout of <Playground> to support random field size, not 3 only. (Use css grid and flex.)~
2. ~Improve Thunk usage into gameSlice — read https://redux-toolkit.js.org/tutorials/advanced-tutorial#thinking-in-thunks~
3. ~Update logic of processMove invoking — now reducers are been calling even after a game finishes.~
4. ~Write some tests with Redux Toolkit!~
5. ~Try to use Saga instead of Thunk.~
6. Improve logic of displaying different game steps/states in <App />.
7. Implement calculation result logic for case with SIZE != 3 plus add an input for getting SIZE from user.
8. Learn and use PropTypes in the project.
9. Add eslint && prettier
10. ~Add docker-compose support to avoid yarn version incompatibility.~
