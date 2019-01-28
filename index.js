const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var app = express();
const port = 1996;

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

app.get('/getmovie', (req,res) => {
    
    var sql = `SELECT * FROM movies`;

    conn.query(sql, (err, result) => {
        if (err) throw err; 
        res.send(result);
    })

})

app.get('/movielist/:keyword', (req,res) => {

    var kategori = req.params.keyword;
    var sql =  `SELECT M.id AS 'ID Movie',  
                M.nama AS 'Nama Movie',
                M.tahun AS 'Tahun',
                M.description AS 'Deskripsi',
                C.id AS 'ID Kategori',
                C.nama AS 'Kategori'
                FROM movcat MC
                JOIN movies M 
                ON MC.idmovie = M.id
                JOIN categories C
                ON MC.idcategory = C.id
                WHERE C.nama LIKE '%${kategori}%';`;

    conn.query(sql, (err, result) => {
        if (err) throw err; 
        res.send(result);
    })

})

app.post('/addmovie', (req,res) => {

    var { nama, tahun, description } = req.body;

    var sql =   `INSERT INTO movies VALUES
                (null, '${nama}', ${tahun}, '${description}');`;

    conn.query(sql, (err, result) => {
    if(err) throw err;
    res.send(result);
    })
})

app.delete('/deletemovie/:id', (req,res) => {
    var idMovie = req.params.id;

    sql = `DELETE FROM movies WHERE id = ${idMovie};`;

    conn.query(sql, (err, result) => {
        if(err) throw err;
        
        sql = `DELETE FROM movcat WHERE idmovie = ${idMovie};`;

        conn.query(sql, (err1, result1) => {
            if(err1) throw err1;
            console.log(`ID Movie: ${idMovie}, BERHASIL DIHAPUS dari MOVCAT`)
        })
        
        console.log(`ID Movie: ${idMovie}, BERHASIL DIHAPUS dari MOVIES`)
        res.send(result);
    })

})

app.get('/categorylist', (req,res) => {
    
    var sql = `SELECT * FROM categories`;

    conn.query(sql, (err, result) => {
        if (err) throw err; 
        res.send(result);
    })

})

app.post('/addcategory', (req,res) => {

    var { nama } = req.body;

    var sql =   `INSERT INTO categories VALUES
                (null, '${nama}');`;

    conn.query(sql, (err, result) => {
    if(err) throw err;
    res.send(result);
    })
})


app.delete('/deletecategory/:id', (req,res) => {
    var idCategory = req.params.id;

    sql = `DELETE FROM categories WHERE id = ${idCategory};`;

    conn.query(sql, (err, result) => {
        if(err) throw err;
        
        sql = `DELETE FROM movcat WHERE idcategory = ${idCategory};`;

        conn.query(sql, (err1, result1) => {
            if(err1) throw err1;
            console.log(`ID Category: ${idCategory}, BERHASIL DIHAPUS dari MOVCAT`)
        })
        console.log(`ID Category: ${idCategory}, BERHASIL DIHAPUS dari CATEGORIES`)
        res.send(result);
    })

})

app.get('/movcatlist', (req,res) => {
    
    var sql = `SELECT M.nama AS 'Nama Movie', C.nama AS 'Kategori'
                from movcat MC JOIN movies M 
                ON MC.idmovie = M.id
                JOIN categories C
                ON MC.idcategory = C.id`;

    conn.query(sql, (err, result) => {
        if (err) throw err; 
        res.send(result);
    })

})

app.post('/addMovcat', (req,res) => {

    var { idmovie, idcategory } = req.body;

    var sql = `INSERT INTO movcat VALUES (${idmovie}, ${idcategory});`;

    conn.query(sql, (err, result) => {
    if(err) throw err;
    res.send(result);
    })
})

app.delete('/deleteMovcat', (req,res) => {
    var {idmovie, idcategory} = req.body;

    sql = `DELETE FROM movcat WHERE idmovie = ${idmovie} AND idcategory = ${idcategory};`;

    conn.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })

})

app.listen(port, () => console.log('API Aktif di port ' + port));