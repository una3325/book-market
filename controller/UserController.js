const conn = require('../mariadb')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const dotenv = require('dotenv').config()

const join = (req, res) => {
  const { email, password } = req.body

  let sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)'

  const salt = crypto.randomBytes(10).toString('base64')
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, 'sha512')
    .toString('base64')

  let values = [email, hashPassword, salt]
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(StatusCodes.BAD_REQUEST).end()
    }
    return res.status(StatusCodes.CREATED).json(results)
  })
}

const login = (req, res) => {
  const { email, password } = req.body
  let sql = 'SELECT * FROM users WHERE email = ?'
  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(StatusCodes.BAD_REQUEST).end()
    }

    const loginUser = results[0]

    const hashPassword = crypto
      .pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512')
      .toString('base64')

    if (loginUser && loginUser.password == hashPassword) {
      const token = jwt.sign(
        {
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: '5m',
          issuer: 'yuna',
        }
      )
      res.cookie('token', token, {
        httpOnly: true,
      })
      console.log(token)

      res.status(StatusCodes.OK).json(results)
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end()
    }
  })
}

module.exports = {
  join,
  login,
}
