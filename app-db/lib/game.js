'use strict'

module.exports = function setupGame (GameModel) {
  async function findAll () {
    return GameModel.findAll({
      attributes: ['uuid','name', 'description'],
      raw: true
    })
  }

  async function createOrUpdate (game) {
    const cond = {
      where: {
        uuid: game.uuid
      }
    }

    const existingGame = await GameModel.findOne(cond)

    if (existingGame) {
      const updated = await GameModel.update(game, cond)
      return updated ? GameModel.findOne(cond) : existingGame
    }

    const result = await GameModel.create(game)
    return result.toJSON()
  }


  return {
    createOrUpdate,
    findAll
  }
}
