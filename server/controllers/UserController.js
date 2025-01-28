import { where } from 'sequelize';
import {User} from '../models/UserModel';
import jwt from 'jsonwebtoken';

const UserController ={
    async register(req, res){
        // Getting the user info from the body
        const { name, email, password, role} = req.body;

        try{
            // checking if the email arleady exist
            const existingUser = await User.findOne({ where: {email}});
            if(existingUser){
                return res.status(400).json({ message: 'Email arleady in use'});
            }
            // Creating the user if the email doesn't exist
            const newUser = await User.create({name, email, password, role});
            res.status(201).json({ message: 'User created successfully', user});
        } catch(error){
            res.status(500).json({message: error.message})
        }
    },

    //Login

    async login(req, res){
        const{ email, password } = req.body;

        try{
            //Checking the presence of the user
            const user = await User.findOne({where: {email}});
            if(!user){
                return res.status(404).json({ message: 'User not found' });
            }
           //Checking the password
           const isValidPassword = await user.comparePassword(password);
           if(!isValidPassword){
            return res.status(400).json({ message: 'Invalid credentials'});
           }

           //Generate JWT token
           const token = jwt.sign({userId: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
           return res.status(200).json({ message: 'Login successful', token});
        } catch(error){
            res.status(500).json({ message: error.message });
        }
    },

    async getProfile(req, res){
        // continue from here .......
    }
}