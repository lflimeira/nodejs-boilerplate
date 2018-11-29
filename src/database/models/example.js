const modelName = 'Example'

module.exports = (sequelize, DataTypes) => {
  const Example = sequelize.define(modelName, {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    underscored: true,
    indexes: [{
      fields: ['id'],
      unique: true,
    }, {
      fields: ['name', 'email'],
      unique: true,
    }, {
      fields: ['name'],
    }, {
      fields: ['email'],
    }],
  })

  return Example
}
