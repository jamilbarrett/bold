const express = require('express')

const app = express()
const PORT = process.env.PORT || 3333

// Import Our Routes
const user_routes =require('./routes/user_routes')


const db = require('./config.connection')

// Middleware
app.use(json())


// Load Database and start server
db.once('open', () => {
    app.listen(PORT, () => console.log('Server started on port %s', PORT))
})