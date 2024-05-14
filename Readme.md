# Todo Managment

This is a RESTful API for a todo list application. The API handles user authentication, manages todo tasks, and provides data persistence.

## Table of Contents

1. [API Endpoints](#api-endpoints)
2. [Technical Requirements](#technical-requirements)
3. [Setup and Usage](#setup-and-usage)

## API Endpoints

### User Authentication

- **POST users/register**: Allows new users to register. Required data: email, name, password.
- **POST auth/login**: Authenticates users and returns a token.
- **POST auth/logout**: Invalidates the user's session or token.
- **PUT users/reset-password**: Reset password.

### Todo Management

- **POST /todos**: Allows authenticated users to add new tasks.
- **GET /todos**: Retrieves the list of tasks for the authenticated user.
- **PUT /todos/:id**: Allows users to update the details of a task.
- **DELETE /todos/:id**: Allows users to delete a task.

## Technologies Used

- Backend Language: TypeScript
- Server Framework: Node.js with Express.js
- Database: MySQL
- ORM: Typeorm
- Test: Jest
- JWT

## Documentation

- Postman Collection: `./Test.postman_collection.json`

## Setup and Usage

### manual

1. Clone the repository. https://github.com/crackdev01/todo_list.git
2. Move directory using cd ./todo_list.
3. Install dependencies using `npm install`.
4. Set up a MySQL database.

- Run MySQL DB Server

5. Update the database connection details in the .env file.

```
DB_HOST={localhost} MySQL server host
DB_PORT={5432} MySQL server port
DB_USERNAME={postgres} MySQL credential user
DB_PASSWORD={12345678} MySQL server password
DB_NAME=todo_db
```

6. Start the server using `npm start`.
7. Test the server using `npm test`.
