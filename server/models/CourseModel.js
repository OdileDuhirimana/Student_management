const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) =>{
    const Course = sequelize.define('Course',{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description:{
            type: DataTypes.TEXT,
        },
        code:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },{
        tableName: 'courses',
        timestamp: true,
    });

    Course.associate = (models) =>{
        Course.belongsToMany(models.User, {
            through: 'enrollments',
            foreignKey: 'courseId',
            otherKey: 'userId',
            as: 'students',
        });
    };
    return Course;
}
