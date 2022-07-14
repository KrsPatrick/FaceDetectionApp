import express from "express";
import bcrypt from 'bcryptjs'
import cors from 'cors'
import knex from "knex";

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

db.select('*').from('users')

const salt = bcrypt.genSaltSync(10)


const app = express()


const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john',
            password: 'john',
            entries: '0',
            joined: new Date()
        },
        {
            id: '124',
            name: 'marie',
            email: 'marie',
            password: 'john',
            entries: '0',
            joined: new Date()
        },

    ],
    
}

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json(database.users)
})

app.post('/signin', (req, res) => {
    const password = req.body.password
    const hashedPassword = database.users[2].password
    const bool = bcrypt.compareSync(password, hashedPassword)
    if (bool) res.json('success')
    else res.json('nix is los')
    
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body

     database.users.push({
                        id: '125',
                        name: name,
                        email: email,
                        password: bcrypt.hashSync(password, salt),
                        entries: '0',
                        joined: new Date()
                    })

    return res.status(201).json(req.body)
    
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            found = true;
            return res.json(user)
        }
    })
    if (!found){
        res.status(400).json('not found')
    }


})

app.post('/image', (req, res) => {
    const {id} = req.body
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            found = true;
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found){
        res.status(400).json('not found')
    }
})

export default app