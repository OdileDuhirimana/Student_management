const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('student', 'admin'),
        defaultValue: 'student',
      },
    },
    {
      tableName: 'users',
      timestamps: true,
    }
  );

  // Hashing before saving password to DB
  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  // Relationship with both course and marks
  User.associate = (models) => {
    User.hasMany(models.Marks, { foreignKey: 'userId', as: 'marks' });
    User.belongsToMany(models.Course, {
      through: 'enrollments',
      foreignKey: 'userId',
      otherKey: 'courseId',
      as: 'courses',
    });
  };

  return User;
};
