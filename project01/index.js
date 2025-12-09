const express = require('express');

const {connectDB} = require('./config/db.config.js');
const userRoutes = require('./routes/user.routes.js');
const {logReqRes} = require('./middleware/log.middleware.js');

const app = express();
const port = 3000;

// Connection
connectDB('mongodb://localhost:27017/project01')
    .then(() => console.log('MongoDB Connected'));

//Middleware
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes('log.txt'));

// Routes
app.use('/api/user', userRoutes);

// Server Listen
app.listen(port, () => {
    console.log(`Server running on port: ${port}
    Access from: http://localhost:${port}/users`);
});