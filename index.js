const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var app = express();
const port =1996;

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'anjzsc',
    password: 'anjzsc1996',
    database: 'moviebertasbih',
    port: 3306
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send("<h1>WELCOME TO MOVIES API!!!</h1>");        
})

app.get('/getmovcat/:nama', (req,res) => {
    var movcat = req.params.nama;
    var sql = `SELECT categorylist as namaMovies, namaCategorie from movies
                join categorylist on movies.id = categories.id
                join categories on movies.id categories.id`

    conn.query(sql, (err, result) => {
        if(err) throw err;
        res.send(reslut);
    })
})

app.post('/addmovcat', (req, res) => {
    var { namaMovie, namaCategory } = req.body;

    var sql = `insert into movcat values
                ((select id from movie where nama like '%${namaMovie}%'),
                (select id from category where nama like '%${namaCategory}%))`;

    conn.query(sql, (err, result) => {
        if(err) throw err;
        res.send(`movie ${namaMovie} telah ditambahkan ke category ${namaCategory}`)
    })
})

app.delete('/deletemovcat', (req, res) => {
    var { namaMovie, namaCategory } = req.body;
    var sql = `delete `
})
app.get('/movielist', (req,res) => {
    var sql = 'SELECT * from movies;'
    conn.query(sql, (err, result) => {
        if(err) throw err;

        res.send(result)
    })
    res.send()
})

app.get('/categorylist', (req,res) => {
    var sql = 'SELECT * from categories;'
    conn.query(sql, (err, result) => {
        if(err) throw err;

        res.send(result)
    })
    res.send()
})

app.post('/addmovie', (req,res) => {
    var { nama, tahun ,description} = req.body;

    var sql= 'insert into movies value 
    ((select))'
})

app.post('/addcategory', (req,res) => {
    var { nama } = req.body;

    var sql=
    
})

app.delete('/deletemovie',(req,res) => {

})

app.delete('/deletecategory',(req,res) => {

})

app.listen(port, () => console.log('API Aktif di port ' + port));