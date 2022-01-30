import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
// import multer from 'multer';
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import { Movie } from "./movies";

export function AddReviewForm({ onNewReview = f => f }){
    const [name, setName] = useState("");
    const [date, setDate] = useState([]);
    const [actors, setActors] = useState("");
    const [poster, setPoster] = useState("");
    const [rating, setRating] = useState(0);
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
        onNewReview(name, date, actors.split(", "), poster, rating);
        // formData.append("name", "hello");
        // formData.append('date', '10/20/2020');
        // formData.append('actors', 'Me, you, someone else');
        // formData.append('poster', 'blah');
        // formData.append('rating', '4');
        // onNewReview(formData);
        
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

        setName("");
        setDate(null);
        setActors([]);
        setPoster({});
        setRating(0);
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

        let fileToUpload = evt.target.files[0];

        getBase64(fileToUpload)
            .then(result => {
                
                fileToUpload["base64"] = result;
                console.log("File Is", fileToUpload);
                console.log("Poster Data:", fileToUpload["base64"]);
                setPoster(fileToUpload["base64"]);
            })
            .catch(err => {
                console.log(err);
            });

        // setState({
        //     file: evt.target.files[0]
        // });

        console.log(poster);
    }

    // const formData = new FormData();

    // formData.append()

    // const storage = multer.diskStorage({
    //     destination: (req, file, cb) => {
    //         cb(null, 'images');
    //     },
    //     filename: (req, file, cb) => {   
    //         cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    //     }
    // });
    
    // const fileFilter = (req, file, cb) => {
    //     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    //     if(allowedFileTypes.includes(file.mimetype)) {
    //         cb(null, true);
    //     } else {
    //         cb(null, false);
    //     }
    // }
    
    // let upload = multer({ storage, fileFilter });

    return(
        <>
            <form name="addReview" encType="multipart/form-data" className="pt-3 container border border-dark" onSubmit={submit} style={{textAlign:"left", maxWidth:"720px"}}>
                <div className="mb-4">
                    <label className="form-label fw-bold" htmlFor="name">Movie Name:</label>
                    <input 
                        className="form-control"
                        value={name} 
                        onChange = {evt => setName(evt.target.value)}
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                    />
                </div>

                <div className="mb-4 row g-3 align-items-center">
                    <div className="col-auto">
                        <label className="fw-bold" htmlFor="date">Release Date:</label>
                    </div>
                    <div className="col-auto">
                        <input 
                            value={date}
                            onChange = {evt => setDate(evt.target.value)}
                            type="date" 
                            id="date" 
                            name="date" 
                            required
                        />
                    </div>
                    <div id="spacer" className="col-auto px-5">

                    </div>
                    <div id="ratingLabel" className="col-auto">
                        <label htmlFor="rating"><b>Rating</b> (out of 5):</label>
                    </div>
                    <div id="ratingCol" className="col-auto">
                        <select 
                            value={rating}
                            onChange = {evt => setRating(evt.target.value)} 
                            id="rating" 
                            name="rating" 
                            required
                        >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="form-label" htmlFor="actors"><b>Actors</b> (Separate by comma & space -> Ex: Daniel Craig, Javier Bardem):</label>
                    <input 
                        className="form-control"
                        value={actors} 
                        onChange = {evt => setActors(evt.target.value)}
                        type="text" 
                        id="actors" 
                        name="actors" 
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label fw-bold" htmlFor="image">Poster:</label>
                    <input 
                        className="form-control"
                        onChange = {evt => onFileChange(evt)} 
                        type="file" 
                        id="poster" 
                        name="poster" 
                        accept=".png, .jfif, .jpg, .jpeg" 
                        required
                    />
                </div>



                <div className="pb-3" style={{textAlign:"center"}}>
                    <button className="btn btn-primary" type="submit" value="Submit">Add Review</button>
                </div>
                
                {/* <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>        */}
            </form>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
        </>
    );
}