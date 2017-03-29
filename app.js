const http = require('http')
const fs = require('fs')
const colors = require('colors/safe');
const fetch = require('node-fetch')
const GameData = require('./config')
const args = require('yargs').argv
const PricingData = {}

/*****
 * USAGE:
 * $ node app.js --task=update
 * or
 * $ node app.js --task=check
 * or use NPM
 * npm run update or npm run check
*****/

function getSteamData (id) {
  const apiURL = GameData.config.steamAPI + id
  const file = fs.createWriteStream(GameData.config.dataDirectory + GameData.config.steamFilePrefix + id + '.json')
  http.get(apiURL, function (response) {
    response.pipe(file)
  })
}

function shouldNotify (game) {
  // adding some quick n dirty error checking
  // dump games without stores or price nodes.
  if (!game.hasOwnProperty('stores')) return false;
  if (!game.stores.hasOwnProperty('price')) return false;
  if (game.stores.price === null) return false;

  let notify = false
  let reason
  let color
  const currentPrice = (game.stores.hasOwnProperty('price')) ? game.stores.price.price : -1;
  const currentBestStore = (game.stores.hasOwnProperty('price')) ? game.stores.price.store : 'UNKNOWN';
  const historicalLowPrice = (game.stores.hasOwnProperty('lowest')) ? game.stores.lowest.price : -1;
  const personalBuyPrice = (GameData.config.historicalAdjust)
    ? Number(GameData.games[game.id].buyPrice * GameData.config.historicalAdjustPercent) : GameData.games[game.id].buyPrice;
  // notify if notifyHistorical is on and the game is at its historical price
  if (GameData.config.notifyHistorical && (currentPrice === historicalLowPrice)) {
    notify = true
    reason = 'Historical Low'
    color = GameData.config.historicalLowColor
  }
  // notify if game is at or below buyPrice & override historical low reasoning since this is more important.
  if (currentPrice <= personalBuyPrice) {
    notify = true
    reason = 'Buy Price'
    color = GameData.config.buyColor
  }
  if (notify) {
    console.log(colors[color](`${reason} :: ${game.gameName} - ${currentPrice} at ${currentBestStore} (HISTORICAL LOW: ${historicalLowPrice})`))
  }
}

function getGameData (games) {
  // TODO: Right now this only supports games with pricing_overview. Need to support games with packages (subs), which lack the pricing_overview node.
  // example: http://store.steampowered.com/api/appdetails/?appids=230230
  for (const game in games) {
    // read Steam data from file
    const currentSteamInformation = JSON.parse(fs.readFileSync(GameData.config.dataDirectory + GameData.config.steamFilePrefix + game + '.json', 'utf8'))
    const pricing = (currentSteamInformation[game]['data'].hasOwnProperty('price_overview')) ? currentSteamInformation[game]['data']['price_overview'] : 0
    const gameName = currentSteamInformation[game]['data'].name
    const finalPrice = (pricing.hasOwnProperty('final')) ? Number(pricing.final / 100) : Number(pricing.initial / 100)
    if (pricing !== 0) {
      // Put pricing data in PricingData{}
      PricingData[game] = {gameName, finalPrice, id: game}
      // Have STEAM price, so proceed
      const apiURL = GameData.config.enhancedsteamPrefix + game + GameData.config.enhancedsteamSuffix
      fetch(apiURL, { game })
        .then(function(res) {
          return res.json();
        })
        .then(function(data){
          PricingData[game]['stores'] = data
          shouldNotify(PricingData[game])
        })
        .catch(function(error) {
          console.log(`~~~~~~~~ Fetch Error: ${error.message} (Game ID: ${game})~~~~~~~~`);
        })
    }
  }
}

function updateSteamData (games) {
  for (const game in games) {
    getSteamData(game)
  }
}

// PROGRAM EXECUTION
// Pass --task=FUNCTION

// Update data files with Steam information
if (args.task === 'update') updateSteamData(GameData.games)

// check games
if (args.task === 'check') getGameData(GameData.games)
