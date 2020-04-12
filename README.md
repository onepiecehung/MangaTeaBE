# Project structure
![](https://i.imgur.com/QBDrq5w.png)


## Introduction: 
- This template backend write by nodejs
- Demo: Admin Manage User. (Add, Edit, Delete, Get) User 
- Test api in swagger [API docs](http://localhost:3001/api-docs)

### 1. Setup Environment:
  - File `.env`
````
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DATABASE_NAME=demo
SERVER_PORT=3001
SERVER_ORIGIN=*
USER_ADMIN=admin
PASS_ADMIN=admin
````
### 2. Install package
`npm install`
### 3. Run development
`npm start`
### 4. Run docker:
- Start docker:
`docker-compose up -d`
- View container:
`docker exec -it demo-backend bash`
- Get list container:
`docker ps`
- Stop docker:
`docker-compose down -v`
### 5. Docs page:
- Swagger:
[API docs](http://localhost:3001/api-docs)
- Link guide Swagger: `https://swagger.io/`
- Authentication in Header: `JWT <token>`
### 6. Requirement:

 - Every model must have a swagger definitions
 ````js
import mongoose from 'mongoose';

/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *      username:
 *        type: string
 */
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
});

export default mongoose.model('User', UserSchema);
````
 - Every api must have a swagger document definitions
 ````js
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Get users
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/definitions/User'
 *           example: {
 *             "success": true,
 *             "data": {
 *               "id": "5c812eef0a60504e4c0cf84b",
 *               "username": "John Smith"
 *             }
 *           }
 *       404:
 *         description: When the User not found
 *       500:
 *         description: When got server exception
 */
````
 - Every service function need return an APIError with statusCode and message:
   We have an custom Error - APIError: it ship the statusCode inside to easy handle with Express.
   You need to import it from **server/util/APIError.js**
   
   Example:
 ````js
   import APIError from 'util/APIError.js';
   // ...
   const error = new APIError(404, 'User not found');
 ````
 
 - Each controller function:
 
 ````js
export async function getUser(req, res) {
  try {
    // Do something
    let data = {};
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}
 ````
 - Success response structure:
 
 ````js
  const successDataResponse = {
    success: true,
    data: {}, // Any data here
  }
 ````
  - Fail response structure:
  
  ````js
   const failDataResponse = {
     success: false,
     message: 'Internal server error', // Please don't response detail error to client
   }
  ````
 
 - Must use logger for important log:
 
 ````js
  import logger from 'server/api/logger.js';
  // ...
  logger.debug('Debug');
  logger.info('Info');
  logger.error(Error('An error'));
  logger.error(new APIError(500, 'An error with statusCode'));
 ````
  - On catch block must use logger:
  
  ````js
   try {
     // Do something
   } catch (error) {
     logger.error('error');
     logger.error(error);
   }
  ````
