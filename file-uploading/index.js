const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const port = process.env.PORT || 3000;

const upload = multer({ storage });

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    return res.render('homepage');
});

app.post('/upload', upload.single('myImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect('/')
})

app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));