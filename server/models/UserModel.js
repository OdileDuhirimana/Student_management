'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('User', {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true,
            },
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false, 
        },
        role:{
            type: DataTypes.ENUM('student', 'admin'),
            defaultValue: 'student',
        },
        },{
            tableName: 'users',
            timestamps: true,
        });

        User.associate = (models) => {
            User.hasMany(models.Mark, { foreignKey: 'studentId', as: 'marks'});
            User.belongsToMany(models.Course, {
                through: 'enrollments',
                foreignKey: 'userId',
                otherKey: 'courseId',
                as: 'courses',
            });
        };

        return User;
};