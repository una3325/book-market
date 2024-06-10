const express = require('express')
const { getOrders } = require('../controller/OrderController')
const router = express.Router()

router.use(express.json())

router.get('/', getOrders)

module.exports = router
