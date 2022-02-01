import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
// import multer from 'multer';
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import { Movie } from "./movies";

export function AddReviewForm({ onNewReview = f => f }){
    const [name, setName] = useState("");
    const [movieFile, setMovieFile] = useState("");
    const navigate = useNavigate();

    // const [showA, setShowA] = useState(true);
    // const [showB, setShowB] = useState(true);

    // const toggleShowA = () => setShowA(!showA);
    // const toggleShowB = () => setShowB(!showB);

    const getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load something...
            reader.onload = () => {
                // Make a fileInfo Object
                console.log("Called", reader);
                baseURL = reader.result;
                console.log(baseURL);
                resolve(baseURL);
            };
            console.log(fileInfo);
        });
    };

    const formData = new FormData();

    const submit = evt => {
        evt.preventDefault();
        // onNewReview(name, date, actors.split(", "), poster, rating);
        formData.append("apiKey", name);
        console.log(formData.get("apiKey"))
        onNewReview(formData);
        
        // const addMovie = async () =>{
        //     const result = await 
            // fetch('/api/addMovie', {
            //     method: "post",
            //     body: formData,
            //     // headers: {
            //     //     'Content-Type': 'multipart/form-data',
            //     // }
            // });
        //     const body = await result.json();
        //     console.log(body);
        // }
        // addMovie();
            // if (body.message == "Success"){
            //     setMovies(body.movies);
            // }

        setApiKey("");
        setPoster({});
        // navigate('/', { state: {newMovie: name,}});
        navigate('/');
    }

    
    // const multer  = require('multer');

    // const storage = multer.diskStorage({
    //     destination: (req, file, callback) => {
    //         callback(null, "./public/images/");
    //     },
    //     filename: (req, file, callback) => {
    //         callback(null, file.originalname);
    //     }
    // })

    // const upload = multer({storage: storage});

    const onFileChange = evt => {
        // let file = evt.target.files[0];
        // // // setPoster(URL.createObjectURL(file));
        // setPoster(file);
        // // formData.append('poster', file);
        // console.log(evt.target.files[0]);
        // // console.log(poster);
        // console.log("Poster", poster);
        // // let { file } = state;

        formData.append("movieFile", evt.target.files[0]);

        console.log(formData.get("movieFile"));
    }

    return(
        <>
            <form name="addMovieFile" encType="multipart/form-data" className="pt-3 container border border-dark" onSubmit={submit} style={{textAlign:"left", maxWidth:"720px"}}>
                <div className="mb-4">
                    <label className="form-label fw-bold" htmlFor="apiKey">API Key:</label>
                    <input 
                        className="form-control"
                        value={name} 
                        onChange = {evt => setApiKey(evt.target.value)}
                        type="text" 
                        id="apiKey" 
                        name="apiKey" 
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label fw-bold" htmlFor="movieFile">Poster:</label>
                    <input 
                        className="form-control"
                        onChange = {evt => onFileChange(evt)} 
                        type="file" 
                        id="movieFile" 
                        name="movieFile" 
                        accept=".json" 
                        required
                    />
                </div>



                <div className="pb-3" style={{textAlign:"center"}}>
                    <button className="btn btn-primary" type="submit" value="Submit">Upload File</button>
                </div>
            </form>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
        </>
    );
}