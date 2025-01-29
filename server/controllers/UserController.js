const { User } = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const UserController = {
    async register(req, res) {
        const { name, email, password, role } = req.body;

        try {
            // Check if the email already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            // Create the user if the email doesn't exist
            const newUser = await User.create({ name, email, password, role });
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        try {
            // Check if the user exists
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check the password
            const isValidPassword = await user.comparePassword(password);
            if (!isValidPassword) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getProfile(req, res) {
        const userId = req.params.userId;

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async list(req, res) {
        const userRole = req.user.role;

        try {
            if (userRole !== 'admin') {
                return res.status(403).json({ message: 'Access denied' });
            }

            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async show(req, res) {
        const userRole = req.user.role;

        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { id } = req.params;

        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = UserController;
