const tableName = 'Examples'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
      .then(() =>
        queryInterface.addIndex(tableName, ['id'], {
          fields: ['id'],
          unique: true,
        }))
      .then(() =>
        queryInterface.addIndex(tableName, ['name'], {
          fields: ['name'],
          unique: true,
        }))
      .then(() =>
        queryInterface.addIndex(tableName, ['email'], {
          fields: ['email'],
          unique: true,
        })),

  down: queryInterface =>
    queryInterface.dropTable('Examples'),
}
