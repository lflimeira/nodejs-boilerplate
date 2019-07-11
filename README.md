# :computer: Node.js Boilerplate

## Introduction

This is a boilerplate created to turn it easier when I start a new project, it has an initial architecture and good practice implementations that I usually follow in my Node.js projects.

## Technology
Stuff we use:
- **[Docker](https://docs.docker.com)** and **[Docker Compose](https://docs.docker.com/compose/)** to create our development and test environments.
- **[Express](https://expressjs.com/pt-br/)** a web framework for Node.js
- **[CircleCI](https://circleci.com)** for deployment and as general CI.
- **[Postgres](https://www.postgresql.org)** to store our data and 
- **[Sequelize](http://docs.sequelizejs.com)** as a Node.js ORM.
- **[Jest](https://github.com/facebook/jest)** as a framework for tests.

### Run project configured

To run the project you just need to run the following command:

```
make
```

### Run only migrations

To run the migrations you just need to run the following command:

```
make setup
```

### Run just the Application

If you want to run only the application, just run the following command:

``` 
docker-compose up app
```
or
```
make app
```

Then access `http://localhost:5678/_health_check` in your browser or [Postman](https://www.getpostman.com/) and it should return `Status Code 200`.

### Run tests

To run the application tests just run the following command:

```
docker-compose up app-test
```
or
```
make test
```

## Endpoints, response e requests

### Calculate health plan refund

#### Request

Method POST: `http://localhost:5678/example`

**Body**
```json
{
    "medicines": {
        "name": "Luiz Felipe",
        "email": "xxxx@gmail.com"
    }
}
```

#### Response

```JSON
{
    "data": {
        "name": "Luiz Felipe",
        "email": "xxxx@gmail.com",
        "message": "Success example message",
        "status": "example_success",
    }
}
```

## Credits

- [Luiz Felipe de Oliva Limeira](https://github.com/lflimeira)

