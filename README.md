# StackPedia API

This application is the back-end server for the [StackPedia](https://github.com/dkwon1223/stack-pedia-ui) front end React application. 

## Technologies Used
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) 
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

### Installation

1. Clone down this repository.
    - `git clone git@github.com:dkwon1223/stack-pedia-api.git`
2. Change into the new directory.
    - `cd stack-pedia-api`
3. Install the dependencies.
    - `npm install`

### Usage

1. To fire up the server, run `node server.js` OR `nodemon server.js`.

### Endpoints for Local Server

| url | verb | options | sample response |
| ----|------|---------|---------------- |
| `http://localhost:8080/api/v1/drinks` | GET | not needed | Array of all existing reservations: `[{ id: 5, name: 'Campari Orange', ingredients: {...}, directions: {...}, alcoholic: true, isFavorite: false, image: <url> created_at: <dateString>, updated_at: <dateString> }, {<moreDrinkObjects>}, ...]` |
| `http://localhost:10000/api/v1/drinks/:id` | GET | not needed | Single Drink(by id): `{ id: 5, name: 'Campari Orange', ingredients: {...}, directions: {...}, alcoholic: true, isFavorite: false, image: <url> created_at: <dateString>, updated_at: <dateString> }` |


### Endpoints for Deployed Server(used in the front end application)

| url | verb | options | sample response |
| ----|------|---------|---------------- |
| `https://mix-master-api.onrender.com/api/v1/drinks` | GET | not needed | Array of all existing reservations: `[{ id: 5, name: 'Campari Orange', ingredients: {...}, directions: {...}, alcoholic: true, isFavorite: false, image: <url> created_at: <dateString>, updated_at: <dateString> }, {<moreDrinkObjects>}, ...]` |
| `https://mix-master-api.onrender.com/api/v1/drinks/:id` | GET | not needed | Single Drink(by id): `{ id: 5, name: 'Campari Orange', ingredients: {...}, directions: {...}, alcoholic: true, isFavorite: false, image: <url> created_at: <dateString>, updated_at: <dateString> }` |
