const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' });

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {
    useNewUrlParser: true
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        const existe = whiteList.some(dominio => dominio === origin);
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
};

app.use(cors(corsOptions));

app.use('/', routes());

app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

app.listen(port, host, () => {
    console.log(`Servidor corriendo en http://${host}:${port}`);   
});
