const express = require("express")
const bodyParser = require("body-parser")

const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

open({
  filename: "./db/test.db",
  driver: sqlite3.Database
}).then((db) => {
  app.get('/people/register', async (req, res) => {
    const people = await db.all("SELECT * FROM People")
    res.json(people)
  })
  app.get('/team', async (req, res) => {
    const people = await db.all("SELECT * FROM Team")
    res.json(people)
  })
  app.get('/people/lk', async (req, res) => {
    const people = await db.all("SELECT * FROM LK")
    res.json(people)
  })



  //.............................
  app.post('/people/register', async (req, res) => {
    const row = { nickname, email, password } = req.body;
    const zapros = `SELECT * FROM People WHERE email = "${email}"`

    const result = await db.all(`SELECT * FROM People WHERE email = "${email}"`)
    console.log(result)
    if (result.length > 0) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    else {
      const userAdd = async (res, req) => {
       await db.run(`INSERT INTO People (nickname, email, password) VALUES ("${nickname}", "${email}", "${password}")`, (err) => {
          if (err) {
            return res.status(500).json({ message: 'Ошибка при добавлении пользователя в базу данных' });
          }
          res.json({
            data: "responce"
          });
        }

        )
      }
      userAdd()
    }
    return res.json({ nickname, email, password });

  });
});

//.............................
app.listen(3000, () => {
  console.log("rabotaet" + 3000)
})





// expres nodemon sqlite sqlite3 установить