const colors = require('colors/safe')
const fetch = require('node-fetch')
const fs = require('fs')
const http = require('http')
const Transforms = require('./transforms')
const GameData = require('./config')
const PricingData = {}

function getSteamData (id) {
  const apiURL = GameData.config.steamAPI + id
  const file = fs.createWriteStream(GameData.config.dataDirectory + GameData.config.steamFilePrefix + id + '.json')
  http.get(apiURL, function (response) {
    response.pipe(file)
  })
}

function isDataValid (game) {
  let hasError = false
  if (!game.hasOwnProperty('stores')) hasError = true
  if (!game.stores.hasOwnProperty('price')) hasError = true
  if (game.stores.price === null) hasError = true
  return hasError
}

function shouldNotify (game) {
  // adding some quick n dirty error checking
  if (!isDataValid(game)) return false

  let notify = false
  let reason
  let color
  const voucher = Transforms.setVoucherCode(game)
  const currentPrice = Transforms.setBestPrice(game)
  const currentBestStore = Transforms.setBestStore(game)
  const historicalLowPrice = Transforms.setHistoricalLowPrice(game)
  const adjustedBuyPrice = Number(GameData.games[game.id].buyPrice * GameData.config.historicalAdjustPercent)
  const configBuyPrice = GameData.games[game.id].buyPrice
  const personalBuyPrice = (GameData.config.historicalAdjust) ? adjustedBuyPrice : configBuyPrice
  const historicalNotification = GameData.config.notifyHistorical

  // notify if notifyHistorical is on and the game is at its historical price
  if (historicalNotification && (currentPrice === historicalLowPrice)) {
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

  // log out the notification
  if (notify) {
    console.log(colors[color](`${reason} :: ${game.gameName} - ${currentPrice} at ${currentBestStore} ${voucher} (HISTORICAL LOW: ${historicalLowPrice})`))
  }
}

/* EXPORTS */

exports.getGameData = function (games) {
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
          shouldNotify(PricingData[game], GameData)
        })
        .catch(function(error) {
          console.log(`~~~~~~~~ Fetch Error: ${error.message} (Game ID: ${game})~~~~~~~~`);
        })
    }
  }
}

exports.updateSteamData = function (games) {
  for (const game in games) {
    getSteamData(game, GameData)
  }
}
