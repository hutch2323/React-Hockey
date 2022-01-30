import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { MongoClient } from 'mongodb';
import { request } from 'http';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// let movieData = undefined;
// fs.readFile("./data/movies.json", "utf8", (err, data) => {
//     console.log(err)
//     console.log(data)
//     movieData = data;
// });

// const multer  = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "./images/");
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname);
//     }
// })

// const upload = multer({storage: storage});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
// app.use(bodyParser.urlencoded({extended:false}));

// app.use(bodyParser.json());

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
// app.get('/hello', (req, res) => { res.send("Hello")});

// app.post('/hello', (req, res) => { res.send(`Hello there ${req.body.name}`)})

app.post('/api/addMovie', async (req, res) => {
    // res.send(movieData);
    // req.params.name
    // console.log(req.params.name);
    try{
        const url = req.protocol + '://' + req.get('host');
        // console.log("req", req);
        // console.log("poster", req.body.poster);
        console.log(req.body);
        // upload.single(req.body.poster)
        // console.log(req.body.get('name'));
        // console.log(req.body.poster);
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
        const db = client.db("movies");

        //const movieInfo = await db.collection('movies').find({name:req.params.name}).toArray();
        await db.collection('movies').insertOne({name:req.body.name, date:req.body.date, actors:req.body.actors, poster:req.body.poster, rating:req.body.rating});

        // console.log(movieInfo);
        const movieInfo = await db.collection('movies').find({}).toArray();
        res.status(200).json({message:"Success", movies: movieInfo});
        client.close();
    }
    catch (error) {
        res.status(500).json({message: "Error connecting to db", error});
    }

})

app.post('/api/removeMovie', async (req, res) => {
    // res.send(movieData);
    // req.params.name
    // console.log(req.params.name);
    try{
        console.log("We're in the removeMovie API")
        console.log(req.body.name);
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
        const db = client.db("movies");

        //const movieInfo = await db.collection('movies').find({name:req.params.name}).toArray();
        let returnVal = await db.collection('movies').deleteOne({name:req.body.name});
        console.log(returnVal);

        if (returnVal.deletedCount == 1){
            const movieInfo = await db.collection('movies').find({}).toArray();
            res.status(200).json({message: `Movie ${req.body.name} deleted`, movies: movieInfo});
        } else {
            res.status(200).json({message: "Unable to delete movie"});
        }
        // console.log(movieInfo);
        // res.status(200).json({message:"Success"});
        client.close();
    }
    catch (error) {
        res.status(500).json({message: "Error connceting to db"});
    }
})

app.get('/api/oneMovie/:name', async (req, res) => {
    // res.send(movieData);
    req.params.name
    console.log(req.params.name);
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
        const db = client.db("movies");

        const movieInfo = await db.collection('movies').find({name:req.params.name}).toArray();
        console.log(movieInfo);
        res.status(200).json(movieInfo);
        client.close();
    }
    catch (error) {
        res.status(500).json({message: "Error connceting to db", error});
    }

})

app.get('/api/movies', async (req, res) => {
    // res.send(movieData);
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
        const db = client.db("movies");

        const movieInfo = await db.collection('movies').find({}).toArray();
        console.log(movieInfo);
        res.status(200).json(movieInfo);
        client.close();
    }
    catch (error) {
        res.status(500).json({message: "Error connceting to db", error});
    }

})


//app.get('*', (req, res) => { res.sendFile(path.join(__dirname + '/build/index.html'))})

app.listen(8000, () => console.log("listening on port 8000"));