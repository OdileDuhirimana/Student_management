const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: "Register a new user"
 *     description: "Registers a new user and returns user data upon successful registration"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the user"
 *               email:
 *                 type: string
 *                 description: "Email of the user"
 *               password:
 *                 type: string
 *                 description: "Password of the user"
 *               role:
 *                 type: string
 *                 enum: ["student", "admin"]
 *                 description: "Role of the user (optional, default is student)"
 *     responses:
 *       201:
 *         description: "User registered successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: "Invalid data"
 */
router.post('/register', UserController.register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: "Login a user"
 *     description: "Logs in a user with valid credentials and returns a JWT token"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "Email of the user"
 *               password:
 *                 type: string
 *                 description: "Password of the user"
 *     responses:
 *       200:
 *         description: "Login successful, returns JWT token"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: "JWT token"
 *       401:
 *         description: "Invalid credentials"
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: "Get user profile"
 *     description: "Returns the profile information of the logged-in user"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "User profile"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: "Unauthorized, user not logged in"
 */
router.get('/profile', authMiddleware, UserController.getProfile);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: "List all users"
 *     description: "Returns a list of all users, accessible only by admin"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "List of users"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: "Forbidden, admin only"
 */
router.get('/users', authMiddleware, adminMiddleware, UserController.list);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: "Get user details"
 *     description: "Returns the details of a specific user by ID, accessible only by admin"
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the user"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "User details"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: "Forbidden, admin only"
 *       404:
 *         description: "User not found"
 */
router.get('/users/:id', authMiddleware, adminMiddleware, UserController.show);

module.exports = router;
