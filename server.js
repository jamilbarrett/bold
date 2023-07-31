const express = require('express')

const app = express()
const PORT = process.env.PORT || 3333

// Import Our Routes
const user_routes =require('./routes/user_routes')
const thought_routes =require('./routes/thought_routes')



const db = require('./config/connection')

// Middleware
app.use(express.json())


// Routes
// Load the user routes and prefix them with /api
app.use('/api', user_routes, thought_routes)

// Load Database and start server
db.once('open', () => {
    app.listen(PORT, () => console.log('Server started on port %s', PORT))
})