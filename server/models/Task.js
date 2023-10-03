module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        isDone: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
    },
    {
      timestamps: true,
      updatedAt: false,
    }
  )

  return Task
}
