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

// Routes
const casesRouter = require('./routes/cases');
// const decisionTreeRouter = require('./routes/decisiontrees')

app.use('/cases', casesRouter);
// app.use('/decision-trees, decisionTreesRouter');

// Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});