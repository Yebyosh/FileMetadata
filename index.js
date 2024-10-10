var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
let bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/*
You can submit a form that includes a file upload.
The form file input field has the name attribute set to upfile.
When you submit a file, you receive the file name, type, and size in bytes within the JSON response.
*/
/*
Uncoded Upload wo file: "Cannot POST /api/fileanalyse"
name of browse input: upfile
form is multipart/form-data
single file allowed only
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const {originalname, mimetype, size} = req.file;
  res.json({ name: originalname, type: mimetype, size: size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
