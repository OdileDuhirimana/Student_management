import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Course = sequelize.define(
    'Course',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'courses',
      timestamps: true,
    }
  );

  Course.associate = (models) => {
    Course.belongsToMany(models.User, {
      through: 'enrollments',
      foreignKey: 'courseId',
      otherKey: 'userId',
      as: 'students',
    });

    Course.hasMany(models.Marks, { foreignKey: 'courseId', as: 'marks' });
  };

  return Course;
};
