const withPagination = require('@middleware/withPagination');
const withFullUser = require('@middleware/withFullUser');
const UserController = require('@controller/client/user');
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *       properties:
 *     Transfer:
 *       type: object
 *       required:
 *         - to
 *         - from
 *         - amount
 *       properties:
 *         to:
 *           type: string
 *           description: The id of the user to transfer to
 *         from:
 *           type: string
 *           description: The id of the user to transfer from
 *         amount:
 *           type: Number
 *           description: The amount to transfer
 *       example:
 *         to: 6371cdf493efc52bd60541fb
 *         from: 6371cffc5bcdd12e70747a05
 *         amount: 20
 */
module.exports = function (router) {
    /**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
    router.post('/',[],UserController.postUser);
/**
 * @swagger
 * /api/user/balance/{id}:
 *   get:
 *     summary: Get the balance by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user balance fetched successfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
    router.get('/balance/:id',[],UserController.getBalance);
    /**
 * @swagger
 * /api/user/transfer:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transfer'
 *     responses:
 *       200:
 *         description: Transfer successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tansfer'
 *       404:
 *         description: The user was not found
 *       400:
 *         description: Insufficient balance in account
 *       500:
 *         description: Some server error
 */

    router.post('/transfer',[],UserController.transferBalance);
}