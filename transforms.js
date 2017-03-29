exports.setBestPrice = function (game) {
  let bestPrice = -1
  if (game.stores.hasOwnProperty('price')) {
    if (game.stores.price.hasOwnProperty('price_voucher')) {
      bestPrice = game.stores.price['price_voucher']
    } else {
      bestPrice = game.stores.price.price
    }
  }
  return bestPrice
}

exports.setBestStore = function (game) {
  return (game.stores.hasOwnProperty('price')) ? game.stores.price.store : 'UNKNOWN';
}

exports.setVoucherCode = function (game) {
  return (game.stores.price.hasOwnProperty('voucher')) ? `VOUCHER CODE: ${game.stores.price.voucher}` : ''
}

exports.setHistoricalLowPrice = function (game) {
  return (game.stores.hasOwnProperty('lowest')) ? game.stores.lowest.price : -1;
}
