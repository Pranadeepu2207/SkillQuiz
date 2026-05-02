const express = require('express')
const cors = require('cors')
require('dotenv').config()

const db = require('./models/index')

const app = express()

app.use(cors())
app.use(express.json())

db.sequelize.sync()
// .then(() => {
//     console.log("Database synced");
//     app.listen(3000, () => console.log("Server running"));
// })
// .catch((err) => console.log(err));

app.use('/user', require('./routes/auth.routes'))

module.exports = app