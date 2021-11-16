/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const { Client } = require('discord.js')

/**
 * @param {Client} client
 */

module.exports = async (client, pG, Ascii) => {
  const Table = new Ascii('Button Loaded')
  Table.setHeading('Command', 'Status')

  const buttonsArray = [];

  (await pG(`${process.cwd()}/modules/*/buttons/*.js`)).map(async (file) => {
    const button = require(file)

    if (!button.name) {
      return Table.addRow(file.split('/')[9], '🔶 FAILED', 'Missing a name.')
    }

    if (!button.description) {
      return Table.addRow(button.name, '🔶 FAILED', 'Missing a description.')
    }

    if (button.permission) {
      if (!Perms.includes(button.permission)) {
        return Table.addRow(button.name, '🔶 FAILED', 'Invalid Permissions')
      }
    }
    client.buttons.set(button.name, button)
    buttonsArray.push(button)

    await Table.addRow(button.name, '✅ SUCCESSFUL')
  })
  console.log(Table.toString())
}
