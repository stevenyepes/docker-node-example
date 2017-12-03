'use strict'

const debug = require('debug')('app:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const db = require('app-db')
const config = require('./config')

const api = asyncify(express.Router())

let services, Game

api.use(bodyParser.json());

api.use('*', async(req, res, next) => {
  if (!services) {
    debug('conecting to database...')
    try {
      services = await db(config.db)
    } catch (err) {
      return next(err)
    }

    Game = services.Game
  }

  next()
})

api.get('/games', async (req, res, next) => {
  debug('A request has come to /games')

  let games = []
  try {
    games = await Game.findAll()
  } catch (err) {
    return next(err)
  }

  res.send(games)
})

api.post('/games', async (req, res, next) => {
  debug('A request to post has come to /games')

  let game = req.body
  if (!game.uuid) {
    game.uuid = uuidv4()
  }
  let result
  try {
    result = await Game.createOrUpdate(game)
  } catch (err) {
    return next(err)
  }

  res.send(result)
})

module.exports = api
