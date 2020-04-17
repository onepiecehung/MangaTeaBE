# Project structure


<p align="center">
  <img src="https://i.imgur.com/QBDrq5w.png">
</p>


# Setup local
### Step 1: Install NodeJS > v12.x and development tools
### Step 2: Install MongoDB, Erlang 20.x, RabbitMQ 3.8.x, Redis 5.x
### Step 3: Editing file host
````
127.0.0.1 manga.net
127.0.0.1 api.manga.net
````

## Introduction: 
- Test api in swagger [API docs](http://api.manga.net:3002/doccuments)
### How it works.

<p align="center">
  <img src="https://github.com/onepiecehung/MBE/blob/develop/logic/Image/HighLevelDesign.png">
</p>

### Logic for user

<p align="center">
  <img src="https://github.com/onepiecehung/MBE/blob/develop/logic/Image/Introduction.png">
</p>

### How Registration works.

<p align="center">
  <img src="https://github.com/onepiecehung/MBE/blob/develop/logic/Image/Register.png">
</p>

### 1. Setup Environment:
  - File `.env`
````
PORT=2111
RABBIT_URL="amqp://guest:guest@localhost:5672/"
URL_DB=mongodb+srv://onepiecehung:Hung01684657540@3hmanga-p9tow.gcp.mongodb.net/truyentranh?retryWrites=true&w=majority
````
### 2. Install package
`npm install`
### 3. Run development
`npm start`
### 4. Run docker: (Enough, don't use below, if you don't know it, thanks. After step 3 you can be running this project)
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
