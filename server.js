var express = require('express');

// usando multer npm, para subida de archivos
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

/* start */

// usamos multer, middleware
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  console.log( req.file );

  // del archivo, necesitamos solo algunos datos
  // desestructuramos el objeto de respuesta
  const { originalname, mimetype, size} = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size
  })
  // req.file es el `avatar` del archivo
  // req.body tendrá los campos textuales, en caso de haber alguno.
})

/* end */

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
