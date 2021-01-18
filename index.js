const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

//Rutas
app.use('/api', require('./routes/routes'));
app.set('port', 5002);
app.listen(app.get('port'), ()=>{
    console.log('Servidor corriendo en el puerto 5002')
});