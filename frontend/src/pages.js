import React from "react";
import { Link } from "react-router-dom";
import { MovieList } from "./movies";
import { AddReviewForm } from "./addReviewForm";
import bootstrap from "bootstrap";
import './App.css';
import { Helmet } from 'react-helmet';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function NavigationBar({setNewMovie}){
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div id="navContainer" className="container-fluid">
                    <img id="logo" src="images/movieReviews.png" height="100px" width="600px"/>
                        <div className="navbar-nav" style={{width:"100%", position:"relative",float:"right"}}>
                            <ul className="navbar-nav w-100 nav-fill mx-auto order-0">
                                <li id="firstLink" className="nav-item fs-5" >
                                    <Link className="nav-item nav-link active" to="/">Home</Link>
                                </li>
                                <li className="nav-item fs-5">
                                    <Link className="nav-item nav-link active" to="/addReview" onClick={()=>setNewMovie(false)}>Add Review</Link>
                                </li>
                                {/* <li className="nav-item fs-5">
                                    <Link className="nav-item nav-link active" to="/uploadFile">Add Review</Link>
                                </li>		 */}
                            </ul>
                        </div>
                    </div>
            </nav>

        </>
    )
}

export function Home({date, setDate, movies, newMovie, setNewMovie, setMovies}){
    const [showAlert, setShowAlert] = useState(newMovie);
    const [removeAlert, setRemoveAlert] = useState(false);
    const [movieName, setMovieName] = useState("");

    // if (props.location.state != null){
    //     console.log(props.location.state.newMovie);
    // }
    let newMovieName = '';
    if(newMovie){
        newMovieName = movies[movies.length-1].name;
    }

    // useEffect(() => {
    //     // setNewMovie(false);
    // }, [showAlert]);
    return(
        <>
            <div>
                <Helmet>
                    <title>Movie Reviews</title>
                </Helmet>
            </div>
            <NavigationBar setNewMovie={setNewMovie}/>
            {/* <h1>Movie Reviews</h1> */}

            <Alert variant="success" show={newMovie} onClose={() => {setNewMovie(false)}} dismissible>
                <Alert.Heading>{newMovieName} has been Added!</Alert.Heading>
            </Alert>
            <Alert variant="danger" show={removeAlert} onClose={() => setRemoveAlert(false)} dismissible>
                <Alert.Heading>{movieName} has been removed!</Alert.Heading>
            </Alert>
            <div className="col-auto pt-3">
                        <label className="fw-bold pe-3" htmlFor="date">Date:</label>
                        
                        <input 
                            value={date}
                            onChange = {evt => setDate(evt.target.value)}
                            type="date" 
                            id="date" 
                            name="date" 
                            required
                        />
                    </div>
            <MovieList 
                movies={movies} 
                onRemoveMovie = {
                    movieName => {                        
                        console.log(movieName);
                        const removeMovie = async () =>{
                            const result = await fetch('/api/removeMovie', {
                                method: "post",
                                body: JSON.stringify({name: movieName}),
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                                
                            });
                            const body = await result.json();
                            console.log(body);
                            if (body.message !== "Unable to delete movie"){
                                setMovies(body.movies);
                            }
                        }
                        removeMovie();
                        setNewMovie(false);
                        if (removeAlert){
                            setMovieName(movieName);
                        } else {
                            setMovieName(movieName);
                            setRemoveAlert(!removeAlert);
                        }                
                    }
                } 
            />
        </>
    );
}

export function AddReview({movies, newMovie, setNewMovie, setMovies}){
    const [alert, setAlert] = useState(false);
    return(
        <>
            <NavigationBar setNewMovie={setNewMovie}/>
            {/* <Alert variant="success" show={alert} onClose={() => setAlert(false)} dismissible>
                <Alert.Heading>{movieName} has been added!</Alert.Heading>
                <p>
                    Change this and that and try again. Duis mollis, est non commodo
                    luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                    Cras mattis consectetur purus sit amet fermentum.
                </p>
            </Alert> */}
            <div className="mt-4 p-2 bg-dark text-white" style={{width:"100%", maxWidth:"720px", margin:"auto"}}>
                <h2 style={{textAlign:"center"}}>Movie Review Form</h2>
            </div>
            <AddReviewForm
                onNewReview={(formData) => {
                    // const newReviews = [
                    // ...movies,
                    //     {
                    //         name,
                    //         date,
                    //         actors,
                    //         poster,
                    //         rating
                    //     }
                    // ];
                    // setMovies(newReviews);
                    // const data = new FormData();
                    // data.append('name', name);
                    // data.append('date', date);
                    // data.append('actors', actors);
                    // data.append('poster', poster);
                    // data.append('rating', rating);
                    // console.log(poster);
                    // console.log(formData.get('poster'));
                    
                    const addMovie = async () =>{
                        const result = await fetch('/api/addMovie', {
                            method: "post",
                            // body: JSON.stringify({name, date, actors, poster, rating}),
                            // headers: {
                            //     'Content-Type': 'application/json',
                            // },
                            body: formData,
                        });
                        const body = await result.json();
                        console.log(body);
                        if (body.message == "Success"){
                            setMovies(body.movies);
                            setNewMovie(true);
                        }
                    }
                    addMovie();  
                }}
            />
        </>
    );
}

// export function UploadFile({movies, setMovies}){
//     return(
//         <>
//             <NavigationBar />
//             <div className="mt-4 p-2 bg-dark text-white" style={{width:"100%", maxWidth:"720px", margin:"auto"}}>
//                 <h2 style={{textAlign:"center"}}>Upload Movie Reviews File</h2>
//             </div>
//             <AddReviewForm
//                 onNewReview={(formData) => {
                    
//                     const addMovies = async () =>{
//                         const result = await fetch('/api/addMovies', {
//                             method: "post",
//                             body: formData,
//                         });
//                         const body = await result.json();
//                         console.log(body);
//                         if (body.message == "Success"){
//                             setMovies(body.movies);
//                         }
//                     }
//                     addMovies();  
//                 }}
//             />
//         </>
//     );
// }