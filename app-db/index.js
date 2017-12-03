'use strict'

const setupDatabase = require('./lib/db')
const setupGameModel = require('./models/game')
const setupGame = require('./lib/game')
const defaults = require('defaults')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)
  const GameModel = setupGameModel(config)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({force: true})
  }

  const Game = setupGame(GameModel)
    return {
        Game,
    }
}
