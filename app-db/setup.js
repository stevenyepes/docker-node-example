'use strict'

const debug = require('debug')('app:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()
async function setup () {
  
  if (process.argv[2] !== '--y') {
    const answer = await prompt({
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database!, are you sure?'
    })

    if (!answer.setup) {
      return console.log('Nothing happend')
    }
  }
    const config = {
    database: process.env.DB_NAME || 'test',
    username: process.env.DB_USER || 'jsteven',
    password: process.env.DB_PASS || 'jsteven',
    host: process.env.DB_HOST || 'db',
    dialect: 'mysql',
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)
  console.log('success')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red(['fatal error'])} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()