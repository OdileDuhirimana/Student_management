const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

'use strict';
module.export = (sequelize, DataTypes) =>{
    const Enrollment = sequelize.define('Enrollement', {
        enrollmentDate:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        status:{
            type: DataTypes.ENUM('active', 'completed', 'dropped'),
            defaultValue: 'active'
        },
    },{
        tableName: 'enrollments',
        timestamps: true,
    });

    Enrollment.associate = (models) =>{
        Enrollment.belongsTo(models.User, {foreignKey: 'userId', as:'student' });
        Enrollment.belongsTo(models.Course, {foreignKey: 'courseId', as: 'course'})
    };

    return Enrollment;
};