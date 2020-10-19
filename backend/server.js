const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
dotenv.config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected successfully!");
});

// Routers
const casesRouter = require('./routes/cases');
const legacyWealthBuildingRouter = require('./routes/legacyWealthBuilding');
const maintainCurrentHomeRouter = require('./routes/maintainCurrentHome');
const sellHouseRouter = require('./routes/sellHouse');
const userRouter = require('./routes/users');

app.use('/cases', casesRouter);
app.use('/legacy-wealth-building', legacyWealthBuildingRouter);
app.use('/maintain-current-home', maintainCurrentHomeRouter);
app.use('/sell-House', sellHouseRouter);
app.use('/users', userRouter);

// Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});