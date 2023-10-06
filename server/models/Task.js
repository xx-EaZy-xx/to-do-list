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
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      date: {
        type: DataTypes.STRING,
        defaultValue: new Date().toLocaleString().replaceAll('.', '/'),
      },
    },
    {
      timestamps: true,
      updatedAt: false,
    }
  )

  return Task
}
