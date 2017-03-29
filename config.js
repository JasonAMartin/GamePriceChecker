/*
 * Games key is the STEAM ID for the game.
 * For example, the url for Grim Dawn is: http://store.steampowered.com/app/219990/
 * The ID is 219990, thus the entry in exports.games with a buy point of $15 would be exports.games = { 219990: { nickname: 'GrimDawn', buyPrice: 15} }
 * 
 * buyPrice: the price you'd buy the game at.
 * nickname: just a way for you to know what game the ID is for. No 
 */
exports.games = {
  383870: { nickname: 'firewatch', buyPrice: 7},
  367520: { nickname: 'hollow knight', buyPrice: 5},
  344850: { nickname: 'big pharma', buyPrice: 6},
  376870: { nickname: 'minecraft story', buyPrice: 8},
  368500: { nickname: 'AC syndicate', buyPrice: 12},
  524220: { nickname: 'Nier Automata', buyPrice: 16},
  289930: { nickname: 'transocean', buyPrice: 4},
  481510: { nickname: 'night in woods', buyPrice: 5},
  272270: { nickname: 'torment', buyPrice: 13},
  305620: { nickname: 'long dark', buyPrice: 9},
  404590: { nickname: 'vikings wolves', buyPrice: 13},
  364360: { nickname: 'TW warhammer', buyPrice: 15},
  362960: { nickname: 'tyranny', buyPrice: 18},
  230230: { nickname: 'divinity original sin', buyPrice: 5},
  220200: { nickname: 'kerbal space program', buyPrice: 9},
  245620: { nickname: 'tropico 5', buyPrice: 5},
  355790: { nickname: 'styx shards of darkness', buyPrice: 20},
  292030: { nickname: 'witcher 3', buyPrice: 15},
  289070: { nickname: 'civ 6', buyPrice: 19},
  359320: { nickname: 'elite dangerous', buyPrice: 10},
  370360: { nickname: 'tis-100', buyPrice: 3},
  386900: { nickname: 'cat machine', buyPrice: 2},
  356190: { nickname: 'middle-earth shadow of war', buyPrice: 20},
  80310: { nickname: 'gemini rue', buyPrice: 3},
  282140: { nickname: 'soma', buyPrice: 3.50},
  362680: { nickname: 'fran bow', buyPrice: 3.50},
  387290: { nickname: 'ori', buyPrice: 3.50},
  373420: { nickname: 'divinity OS enhanced', buyPrice: 10},
  367670: { nickname: 'controller companion', buyPrice: 1},
  378720: { nickname: 'Thea', buyPrice: 8.50},
  365590: { nickname: 'The Division', buyPrice: 8.50},
  365450: { nickname: 'hacknet', buyPrice: 3.50},
  369990: { nickname: 'gremlins', buyPrice: 4.50},
  32440: { nickname: 'lego star wars', buyPrice: 5.50},
  388880: { nickname: 'oxenfree', buyPrice: 6.50},
  435150: { nickname: 'divinity original sin 2', buyPrice: 13.50},
  503560: { nickname: '911 operator', buyPrice: 3.50},
  477870: { nickname: 'yomawari', buyPrice: 7.50},
  460920: { nickname: 'steep', buyPrice: 13.50},
  447020: { nickname: 'farming sim 17', buyPrice: 9.50},
  433100: { nickname: 'town of light', buyPrice: 6.50},
  392470: { nickname: 'nobunagas ambition', buyPrice: 13.50},
  418370: { nickname: 'RE 7', buyPrice: 17.50},
  418240: { nickname: 'shadow tactics - shogun', buyPrice: 10.50},
  405580: { nickname: 'RCT', buyPrice: 1.50},
  403640: { nickname: 'dishonored 2', buyPrice: 13.50},
  403120: { nickname: 'LIFE', buyPrice: 1.50},
  397340: { nickname: 'simple planes', buyPrice: 3.50},
  287980: { nickname: 'mini metro', buyPrice: 3.50},
  201810: { nickname: 'wolfenstrein', buyPrice: 3.50},
  206190: { nickname: 'gunpoint', buyPrice: 3.50},
  212680: { nickname: 'ftl', buyPrice: 3.50},
  228260: { nickname: 'fallen enchantress', buyPrice: 6.50},
  228280: { nickname: 'baldurs gate enhanced', buyPrice: 6.50},
  231160: { nickname: 'swapper', buyPrice: 3.50},
  241260: { nickname: 'crimes punishment sherlock holmes', buyPrice: 6.50},
  244430: { nickname: 'realmyst', buyPrice: 3.50},
  257350: { nickname: 'baldurs gate 2 enhanced', buyPrice: 6.50},
  274500: { nickname: 'brigador', buyPrice: 4.50},
  281640: { nickname: 'banner saga2', buyPrice: 6.50},
  359230: { nickname: 'lethis', buyPrice: 4.50},
  289950: { nickname: 'construction sim 2015', buyPrice: 3.50},
  290300: { nickname: 'rebel galaxy', buyPrice: 5.50},
  296970: { nickname: 'renowned explorers', buyPrice: 5.50},
  300570: { nickname: 'infinifactory', buyPrice: 5.50},
  312660: { nickname: 'sniper elite 4', buyPrice: 10.50},
  320240: { nickname: 'we happy few', buyPrice: 7.50},
  331670: { nickname: 'jackbox', buyPrice: 6.50},
  337760: { nickname: 'decisive campaigns', buyPrice: 6.50},
  346940: { nickname: 'shadowrun hong kong', buyPrice: 5.50},
  352400: { nickname: 'lego jurassic', buyPrice: 5.50},
  352550: { nickname: 'urban empire', buyPrice: 9.50},
  40980: { nickname: 'stronghold legends', buyPrice: 5.50},
  536220: { nickname: 'walking dead new frontier', buyPrice: 7.50}
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
