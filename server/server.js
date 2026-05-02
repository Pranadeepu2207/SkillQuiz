const app = require('./app')

const PORT = process.env.PORT || 3000
// console.log(PORT)

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})