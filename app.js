const GameData = require('./config')
const Core = require('./core')
const args = require('yargs').argv

/*****
 * USAGE:
 * $ node app.js --task=update
 * or
 * $ node app.js --task=check
 * or use NPM
 * npm run update or npm run check
*****/


// PROGRAM EXECUTION
// Pass --task=FUNCTION

// Update data files with Steam information
if (args.task === 'update') Core.updateSteamData(GameData.games)

// check games
if (args.task === 'check') Core.getGameData(GameData.games)
