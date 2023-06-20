
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express()

// puerto por el que escuchamos
app.set('port', process.env.PORT || 3000);

// motor de plantillas
app.set('view engine', 'ejs');

// indicamos la carpeta de las vistas
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(fileUpload());

app.use(express.static(path.join(__dirname, 'public')));

// ******* rutas *************************
// aquí tenemos las rutas -> asociadas a nuestra aplicación
app.use(require('./routes/rutaprincipal'));
app.use(require('./routes/lasrutas_VSMAQUINA'));

// iniciamos el servidor
app.listen(app.get('port'), () =>
{
   console.log('server iniciado en el puerto: ', app.get('port'));
});
