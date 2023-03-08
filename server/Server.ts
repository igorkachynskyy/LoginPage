/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'
import { Pool } from 'pg'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { join } from 'node:path'

dotenv.config({ path: join('/server/.env') })

const port = 5001
const app = express()
app.use(cors())
app.use(bodyparser.json())

interface user {
  id: number
  email: string
  username: string
  firstname: string
  lastname: string
  password: string
  iat: number
}
const pool = new Pool({
  user: 'igork',
  host: 'database',
  database: 'Login',
  password: 'qwery3333',
  port: 5432
})

app.post('/login', async function (req: Request, res: Response) {
  const username = req.body.username
  const password = req.body.password
  const result = await pool.query('select * from userstable')
  const users = result.rows as user[]
  for (let i = 0; i < users.length; i++) {
    if ((users[i].email === username || users[i].username === username) && password === users[i].password) {
      const accesToken = jwt.sign(users[i], process.env.ACCESS_TOKEN_SECRET as string)
      return res.status(200).send(JSON.stringify({
        id: users[i].id,
        jwt: accesToken
      }))
    }
  }
  return res.status(404).send(JSON.stringify({ message: 'Error' }))
})

app.post('/user', authentificateToken, function (req: Request, res: Response) {
  const user = req.body.user as user
  if (user.id === Number(req.body.id)) {
    return res.status(200).send(JSON.stringify(user))
  }
  console.log('Error in 49 line')
  return res.status(403).send(JSON.stringify({ message: 'Error' }))
})

app.post('/users', async function (req: Request, res: Response) {
  const result = await pool.query('select * from userstable')
  return res.status(200).send(JSON.stringify(result.rows))
})

app.post('/register', async function (req: Request, res: Response) {
  const user = req.body.user as user
  console.log(req.body)
  if (!validateUser(user)) {
    return res.status(400).send(JSON.stringify({ message: 'Error' }))
  }
  try {
    await pool.query(`insert into userstable(email, username, lastname, firstname, password) values('${user.email}', '${user.username}', '${user.lastname}', '${user.firstname}', '${user.password}')`)
    return res.status(200).send(JSON.stringify({ message: 'Success' }))
  } catch (e) {
    console.log(e)
    return res.status(400).send(JSON.stringify({ message: 'Error' }))
  }
})

function validateUser (user: user): boolean {
  console.log(user)
  const isemailvalid = user.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  const otheritemsvalid = user.firstname.length > 0 && user.lastname.length > 0 && user.password.length > 0 && user.username.length > 0
  return (isemailvalid != null) && otheritemsvalid
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function authentificateToken (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  // eslint-disable-next-line @typescript-eslint/space-infix-ops, @typescript-eslint/prefer-optional-chain, @typescript-eslint/strict-boolean-expressions
  const token = authHeader&& authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, function (err, user) {
    if ((err != null) || (Date.now() - (user as user).iat * 1000) / 1000 / 60 > 60) { return res.sendStatus(403) }
    req.body.user = user as user
    next()
  })
}
app.listen(port)
