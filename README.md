# 100-things

## Description
Open localhost:PORT for swagger.

## Installation

```bash
$ npm install
```

## Running the app

```bash

# development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Create new module with Nestjs
```bash
nest g module core
// creates module

nest g controller coreModule/islands
// creates controller
// creates test file for controller
// adds controller to module file
```

## TODO
Where should we set return types of endpoints? For now its in service layer. Maybe mappers?

Error handlings and where to do them with encapsulation?

JWT auth for admin
Middleware mechanism for admin only endpoints.

Inherit classes from Plot

CI/CD

Run tests after every commit

Unit tests, Integration tests
