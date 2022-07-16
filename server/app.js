import express, { response } from "express";
import bcrypt from 'bcryptjs'
import cors from 'cors'
import knex from "knex";
import dotenv from 'dotenv'

import handleRegister from './controllers/register.js'
import handleSingin from './controllers/signin.js'
import handleProfile from "./controllers/profile.js";

dotenv.config()

 const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'patrick',
      password : process.env.DB_PASSWORD,
      database : 'face-detection'
    }
  });


const salt = bcrypt.genSaltSync(10)


const app = express()

app.use(express.json())
app.use(cors())


app.post('/signin', (req, res) => {handleSingin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt, salt)} )

app.get('/profile/:id', (req, res,) => {handleProfile(req, res, db)})

// app.post('/image', (req, res) => {
//     const {id} = req.body
//     let found = false;
//     database.users.forEach(user => {
//         if (user.id === id){
//             found = true;
//             user.entries++
//             return res.json(user.entries)
//         }
//     })
//     if (!found){
//         res.status(400).json('not found')
//     }
// })

export default app