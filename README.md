## Description

This is very simple app of inventory mangement with categories relation. App also have user authentication and role base authorization.

I have also attached the postman colleciton with my working url of heroku app, If you want to run this on local please change the url with that `http://localhost:4000`.

### User Module
```
a. Authentication
b. Authorization
    i. User Roles
    ii. Permissions (based on this permission a user can access further APIs)
```

### Product Module
```
a. Base Schema
b. Dynamic Attribute Schema (The attribute should be dynamic schema it can be extendable at any time 
for any kind of product, and product can be anything, like electronic items, 
foods items, properties, services.)
```

### Categories Module
```
a. Base Categories
b. Multi-Level Categories (Multi Nested Categories)
```

## Installation

```bash
$ npm install
```

## Create .env file at root

```bash
PORT=4000
MONGO_URI= set your mongodb url here.
```

## Running the app

```bash
# development
$ npm run start
```

### `Screenshots`

See screenshots of postman working below.


![ScreenShot](/screenshots/Login-screen.png)

![ScreenShot](/screenshots/User%20Listing.png)
