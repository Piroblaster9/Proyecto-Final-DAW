const express = require('express');
const router = express.Router();

const dbConnection = require('../config/dbConnection');
// realizamos una conexión a la base de datos
const connection = dbConnection();

//*********************************************************
//********************** PRINCIPAL*************************/
//*********************************************************
router.get('/', (req, res) => {
    res.render('principal', { titulo: 'Principal' });
});



//******************************************************/
// para exportar las rutas a otros módulos
module.exports = router;
//******************************************************/
