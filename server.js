const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 3000

const { getCurrentSP500Companies, getCurrentSP500CompaniesLogos, getStockStats } = require("./func")

app.use(cors())

app.get("/sp500", (req, res) => {
  getCurrentSP500Companies((error, companies) => {
    if (error) return res.status(500).json({error})
    return res.status(200).json(companies)
  })
})

app.get("/sp500logos", (req, res) => {
  getCurrentSP500CompaniesLogos((error, logos) => {
    if (error) return res.status(500).json({error})
    return res.status(200).json(logos)
  })
})

app.get("/stock/:ticker", (req, res) => {
  const ticker = req.params.ticker

  getStockStats(ticker, (error, stats) => {
    if (error) return res.status(500).json({error})
    return res.status(200).json(stats)
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
