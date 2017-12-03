'use strict'

const Sequelize = require('sequelize')
const setupDataBase = require('../lib/db')

module.exports = function setupGameModel (config) {
  const sequelize = setupDataBase(config)

  return sequelize.define('game', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  })
}