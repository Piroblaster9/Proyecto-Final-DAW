const express = require('express');
const router = express.Router();

const dbConnection = require('../config/dbConnection');
const connection = dbConnection();

router.get('/vsmaquina', async function (req, res) {
  try {
	let sql = 'SELECT * FROM campeones ORDER BY RAND() LIMIT 30';

    await connection.query(sql, function (error, rows, fields) {
      if (error) {
        console.error("El error producido:\n" + error.message);
        res.status(500).json({ error: 'Error al obtener los personajes' });
      } else {
        console.log('filas afectadas: ', rows.length);
        res.render('vsmaquina', {
          personajes: rows,
          titulo: 'vsmaquina',
        });
      }
    });
  } catch (error) {
    console.error("El error producido:\n" + error.message);
    res.status(500).json({ error: 'Error al obtener los personajes' });
  }
});

module.exports = router;
