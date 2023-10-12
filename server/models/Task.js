module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      date: {
        type: DataTypes.STRING,
        defaultValue: new Date().toLocaleString().replaceAll('.', '/'),
      },
      partialDate: {
        type: DataTypes.STRING,
        defaultValue: new Date().toLocaleString().slice(0, 10),
      },
    },
    {
      timestamps: true,
      updatedAt: false,
    }
  )

  return Task
}
