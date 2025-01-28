import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Marks = sequelize.define(
    'Marks',
    {
      score: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('CAT', 'Exam'),
        allowNull: false,
      },
    },
    {
      tableName: 'marks',
      timestamps: true,
    }
  );

  Marks.associate = (models) => {
    Marks.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE', // Removes marks when the student is deleted
    });

    Marks.belongsTo(models.Course, {
      foreignKey: 'courseId',
      as: 'course',
      onDelete: 'CASCADE', // also marks are deleted when a course which related to it is deleted
    });
  };

  return Marks;
};
