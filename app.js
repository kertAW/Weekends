const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const exchange_rates = require('./modules/exchange_rates');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/news', require('./routes/news.routes'));

const PORT = config.get('PORT') || 5000;

async function startServer() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port: ${PORT}`));
    } catch (err) {
        console.log(`Server error: ${err.message}`);
        process.exit(1);
    }
}

startServer();