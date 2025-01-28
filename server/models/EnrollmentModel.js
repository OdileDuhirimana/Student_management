import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Enrollment = sequelize.define(
    'Enrollment',
    {
      enrollmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.ENUM('active', 'completed', 'dropped'),
        defaultValue: 'active',
      },
    },
    {
      tableName: 'enrollments',
      timestamps: true,
    }
  );

  Enrollment.associate = (models) => {
    Enrollment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Enrollment.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
  };

  return Enrollment;
};
