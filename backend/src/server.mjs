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

const storage = multer.diskStorage({
    // destination: "./build/images/",
    destination: "src/build/images/",
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

const storageJSON = multer.diskStorage({
    // destination: "./build/images/",
    destination: "",
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

const uploadMovies = multer({});
const upload = multer({storage: storage});

const app = express();
app.use(express.static(path.join(__dirname, '/build')));

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

const uploadFiles = async (req, res) => {
    try{
        console.log(req.body);
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
        const db = client.db("movies");

        await db.collection('movies').insertOne({name:req.body.name, date:req.body.date, actors:req.body.actors.split(', '), poster:"images/"+req.file.filename, rating:req.body.rating});
        const movieInfo = await db.collection('movies').find({}).toArray();
        res.status(200).json({message:"Success", movies: movieInfo});
        client.close();
    }
    catch (error) {
        res.status(500).json({message: "Error connecting to db", error});
    }

}

app.post('/api/addMovie', upload.single("poster"), uploadFiles);

app.post('/api/addMovies', async(req, res) => {
    const apiKey = "ef72570ff371408f9668e414353b7b2e";
    console.log(req.headers);

    if (req.headers.apikey == apiKey) {
        try{
            let movieData = req.body
            const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
            const db = client.db("movies");
    
            await db.collection('movies').insertMany(movieData);
            res.status(200).json({message:"Success", movies: req.body});
            client.close();
        }
        catch (error) {
            res.status(500).json({message: "Error connecting to db", error});
        }
    } else {
        res.status(500).json({message: "Invalid API Key"});
    }

});

app.post('/api/removeMovie', async (req, res) => {
    try{
        upload.single("poster");
        console.log("We're in the removeMovie API");
        console.log(req.body.name);
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
        const db = client.db("movies");

        // to delete the image file associated with the movie
        const movieInfo = await db.collection('movies').findOne({name:req.body.name})
        console.log(movieInfo);
        //fs.unlink("./src/build"+movieInfo.poster, (err) => {
        fs.unlink(movieInfo.poster, (err) => {
            if (err) {
              console.error(err)
              return
            }});
        console.log("File removed:", movieInfo.poster);
        
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

app.get('*', (req, res) => { res.sendFile(path.join(__dirname + '/build/index.html'))})

app.listen(8000, () => console.log("listening on port 8000"));