const axios = require("axios")
const parse = require("csv-parse")

const sp500ListUrl = "https://raw.githubusercontent.com/datasets/s-and-p-companies-financials/master/data/constituents-financials.csv"

const statsUrl = ticker => {
  return `https://api.iextrading.com/1.0/stock/${ticker}/stats`
}

const getCurrentSP500Companies = next => {
  return axios.get(sp500ListUrl)
  .then(results => {
    parse(results.data, {
      columns: true
    }, (error, list) => {
      if (error) return next(error)
      return next(null, list.map(stock => stock.Symbol))
    })
  }).catch(error => {
    return next(error)
  })
}

const getStockStats = (ticker, next) => {
  return axios.get(statsUrl(ticker))
  .then(results => {
    return next(null, results.data)
  }).catch(error => {
    console.log("huh?")
    console.log(error)
    return next(error)
  })
}

module.exports = {
  getCurrentSP500Companies,
  getStockStats
}
