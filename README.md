# Nose JS, Express Authentication sample with Session ID and JWT

NodeJS/Express authentication server with two examples of endpoints for login users using SessionID and JWT.

In this project we can see the differences between authenticate with Session and storing the session ID in a cookie, and the authentication with Token using a key-jwt to generate it.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.
In the env.example file you will find the enviroment varibles to add.

`PORT`

`JWT PRIVATE KEY`


## Endpoints

### ROUTES

- /account
- /auth
- /auth-token
- /auth-session


#### AUTH-TOKEN Endpoints

__POST /login__

You can do a post to /login for logging a user

The body must have:

- `email`: The user's email
- `password`: The user's password

It returns the following:

```json
{
  "jwt": {jwt}
}
```

The `jwt` will contain the `guig` user's id and the `extra` information sent.

__GET /profile__

You can do a get to get user's data when `Authorization header` is passed.

The header must have the following key-value:

- `Authorization`: `jwt`

It returns the following:

```json
{
    "guid": {guid},
    "name": {name},
    "email": {email},
    "role": admin | user,
    "isActive": {boolean},
    "balance": {balance},
    "age": {number},
    "eyeColor": {color},
    "company": {company},
    "phone": {phone},
    "address": {address},
    "registered": {timestamp}
}
```

#### AUTH-SESSION Endpoints

__POST /login__

You can do a post to /login for logging a user

The body must have:

- `email`: The user's email
- `password`: The user's password

It returns the following:

```json
{
  "jwt": {jwt}
}
```

The `jwt` will contain the `guig` user's id and the `extra` information sent.

__GET /profile__

You can do a get to get user's data once you logged in and you got the __cookie session__ id.

It returns the following:

```json
{
    "guid": {guid},
    "name": {name},
    "email": {email},
    "role": admin | user,
    "isActive": {boolean},
    "balance": {balance},
    "age": {number},
    "eyeColor": {color},
    "company": {company},
    "phone": {phone},
    "address": {address},
    "registered": {timestamp}
}
```
## Tech Stack

**Server:** Node, Express

**NPM Packages:** 

- nanoid : To generate uniques ids for creating sessions ids.
- JOSE : To create jwt and validate it.
- typebox: Use to create JSON Schema obect.
- ajv: For validating DTO.


## Authors

- [Ali Cembranos](https://www.github.com/alicembranos)

