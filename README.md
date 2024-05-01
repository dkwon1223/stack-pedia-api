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
| `http://localhost:8080/api/v1/technologies/all` | GET | not needed | Array of all existing technologies: `[{ _id: 5, name: 'Python', type: 'Programming Language'...}, {_id: 6, name: "Java", type: "Programming Language"...}, ... ]` |
| `http://localhost:8080/api/v1/technologies/:category` | GET | not needed | Array of technologies sorted by category: `[{overall_type: <category>}, {overall_type: <category>}... ]` |
| `http://localhost:8080/api/v1/technology/:id` | GET | not needed | Single technology by id: `{_id: <id>}` |
| `http://localhost:8080/api/v1/stacks/all` | GET | not needed | Array of all existing stacks: `[{ _id: 5, name: 'MERN Stack', type: 'fullstack'...}, {_id: 6, name: "LAMP Stack", type: "fullstack"...}, ... ]` |
| `http://localhost:8080/api/v1/stacks/:type` | GET | not needed | Array of stacks sorted by category: `[{overall_type: <category>}, {overall_type: <category>}... ]` |
| `http://localhost:8080/api/v1/stack/:id` | GET | not needed | Single stack by id: `{_id: <id>}` |

### Endpoints for Deployed Server(used in the front end application)

| url | verb | options | sample response |
| ----|------|---------|---------------- |
| `https://stack-pedia-api.adaptable.app/api/v1/technologies/all` | GET | not needed | Array of all existing technologies: `[{ _id: 5, name: 'Python', type: 'Programming Language'...}, {_id: 6, name: "Java", type: "Programming Language"...}, ... ]` |
| `https://stack-pedia-api.adaptable.app/api/v1/technologies/:category` | GET | not needed | Array of technologies sorted by category: `[{overall_type: <category>}, {overall_type: <category>}... ]` |
| `https://stack-pedia-api.adaptable.app/api/v1/technology/:id` | GET | not needed | Single technology by id: `{_id: <id>}` |
| `https://stack-pedia-api.adaptable.app/api/v1/stacks/all` | GET | not needed | Array of all existing stacks: `[{ _id: 5, name: 'MERN Stack', type: 'fullstack'...}, {_id: 6, name: "LAMP Stack", type: "fullstack"...}, ... ]` |
| `https://stack-pedia-api.adaptable.app/api/v1/stacks/:type` | GET | not needed | Array of stacks sorted by category: `[{overall_type: <category>}, {overall_type: <category>}... ]` |
| `https://stack-pedia-api.adaptable.app/api/v1/stack/:id` | GET | not needed | Single stack by id: `{_id: <id>}` |
