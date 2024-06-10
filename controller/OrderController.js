// const conn = require('../mariadb')
const mariadb = require('mysql2/promise')
const { StatusCodes } = require('http-status-codes')

const getOrders = async (req, res) => {
  const conn = await mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Bookmarket',
    dateStrings: true,
  })

  let sql = `SELECT orders.id, created_at, address, receiver, contact, book_title, total_price, total_quantity
FROM orders LEFT JOIN delivery
ON orders.delivery_id = delivery.id`

  let [rows, filds] = await conn.query(sql)
  return res.status(StatusCodes.OK).json(rows)
}

module.exports = {
  getOrders,
}
