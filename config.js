/*
 * Games key is the STEAM ID for the game.
 * For example, the url for Grim Dawn is: http://store.steampowered.com/app/219990/
 * The ID is 219990, thus the entry in exports.games with a buy point of $15 would be exports.games = { 219990: {buyPrice: 15} }
 */
exports.games = {
  383870: {buyPrice: 7},
  367520: {buyPrice: 5},
  344850: {buyPrice: 6},
  376870: {buyPrice: 8},
  368500: {buyPrice: 12},
  524220: {buyPrice: 16},
  289930: {buyPrice: 4},
  481510: {buyPrice: 5},
  272270: {buyPrice: 13},
  305620: {buyPrice: 9},
  404590: {buyPrice: 13},
  364360: {buyPrice: 15},
  362960: {buyPrice: 18},
  230230: {buyPrice: 5},
  220200: {buyPrice: 9},
  245620: {buyPrice: 5},
  355790: {buyPrice: 20},
  292030: {buyPrice: 15},
  289070: {buyPrice: 19},
  359320: {buyPrice: 10},
  370360: {buyPrice: 3},
  386900: {buyPrice: 2},
  356190: {buyPrice: 20},
  80310: {buyPrice: 3},
  282140: {buyPrice: 3.50},
  362680: {buyPrice: 3.50},
  387290: {buyPrice: 3.50},
  373420: {buyPrice: 10},
  367670: {buyPrice: 1},
  378720: {buyPrice: 8.50},
  365590: {buyPrice: 8.50},
  365450: {buyPrice: 3.50},
  369990: {buyPrice: 4.50},
  32440: {buyPrice: 5.50},
  388880: {buyPrice: 6.50},
  435150: {buyPrice: 13.50},
  503560: {buyPrice: 3.50},
  477870: {buyPrice: 7.50},
  460920: {buyPrice: 13.50},
  447020: {buyPrice: 9.50},
  433100: {buyPrice: 6.50},
  392470: {buyPrice: 13.50},
  418370: {buyPrice: 17.50},
  418240: {buyPrice: 10.50},
  405580: {buyPrice: 1.50},
  403640: {buyPrice: 13.50},
  403120: {buyPrice: 1.50},
  397340: {buyPrice: 3.50},
  287980: {buyPrice: 3.50},
  201810: {buyPrice: 3.50},
  206190: {buyPrice: 3.50},
  212680: {buyPrice: 3.50},
  228260: {buyPrice: 6.50},
  228280: {buyPrice: 6.50},
  231160: {buyPrice: 3.50},
  241260: {buyPrice: 6.50},
  244430: {buyPrice: 3.50},
  257350: {buyPrice: 6.50},
  274500: {buyPrice: 4.50},
  281640: {buyPrice: 6.50},
  359230: {buyPrice: 4.50},
  289950: {buyPrice: 3.50},
  290300: {buyPrice: 5.50},
  296970: {buyPrice: 5.50},
  300570: {buyPrice: 5.50},
  312660: {buyPrice: 10.50},
  320240: {buyPrice: 7.50},
  331670: {buyPrice: 6.50},
  337760: {buyPrice: 6.50},
  346940: {buyPrice: 5.50},
  352400: {buyPrice: 5.50},
  352550: {buyPrice: 9.50},
  40980: {buyPrice: 5.50},
  536220: {buyPrice: 7.50}
}

/*
* Config Explanation:
*
* dataDirectory: path where you want data files stored -- make sure you create the directory.
* steamFilePrefix: each JSON file for Steam data will be named with this prefix (steamAPI-123.json).
* steamAPI: the Steam API URL minus the game id at the end.
* enhancedsteamPrefix + enhancedsteamSuffix: I'm using their API for data. The game ID goes between these two.
* notifyHistorical - If true, game will appear if it's at or within 10% of historical low.
* historicalAdjust - If true, it will only notify you if your buyPrice is within the historicalAdjustPercent of the historical low.
* historicalAdjustPercent - If using historicalAdjust, you can set a buy price at any price, but you'll only be notified if the current lowest is historical low + percent adjustment or lower. Formula is historicalPrice * historicalAdjustPercent
*/

exports.config = {
  dataDirectory: 'data/',
  steamFilePrefix: 'steamAPI-',
  steamAPI: 'http://store.steampowered.com/api/appdetails/?appids=',
  enhancedsteamPrefix: 'http://api.enhancedsteam.com/pricev2/?search=app/',
  enhancedsteamSuffix: '&stores=cdkeys,amazonus,bundlestars,coinplay,direct2drive,dlgamer,dotemu,fireflower,funstock,gamebillet,gamersgate,gamesplanet,gamesrepublic,gog,greenmangaming,humblestore,humblewidgets,imperialgames,impulse,indiegalastore,indiegamestand,newegg,nuuvem,origin,playfield,silagames,squenix,steam,uplay,wingamestore,&cc=US&coupon=true',
  notifyHistorical: true,
  historicalAdjust: false,
  historicalAdjustPercent: 1.10
}
