/**
 * @swagger
 * definitions:
 *   ValidatorErrorItem:
 *     type: object
 *     properties:
 *       value:
 *         type: string
 *         description: The value got on request
 *       msg:
 *         type: string
 *         description: The error message
 *       param:
 *         type: string
 *         description: The key of value
 *       location:
 *         type: string
 *         description: The location of value
 */

/**
 * @swagger
 * definitions:
 *   ValidatorError:
 *     type: object
 *     properties:
 *       success:
 *         type: boolean
 *       errors:
 *         type: array
 *         items:
 *           $ref: '#/definitions/ValidatorErrorItem'
 *     example: {
 *        success: false,
 *        errors: [
 *          {
 *            "value": "mail mail",
 *            "msg": "must be an email",
 *            "param": "username",
 *            "location": "body"
 *          }
 *        ]
 *     }
 */
