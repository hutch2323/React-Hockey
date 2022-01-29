import React from "react";
import { Link } from "react-router-dom";
import { MovieList } from "./movies";
import { AddReviewForm } from "./addReviewForm";
import bootstrap from "bootstrap";
import './App.css';
import { Helmet } from 'react-helmet';


function NavigationBar(){
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
                                    <Link className="nav-item nav-link active" to="/addReview">Add Review</Link>
                                </li>	
                            </ul>
                        </div>
                    </div>
            </nav>

        </>
    )
}

export function Home({movies, setMovies}){

    return(
        <>
            <div>
                <Helmet>
                    <title>Movie Reviews</title>
                </Helmet>
            </div>
            <NavigationBar />
            {/* <h1>Movie Reviews</h1> */}

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
                    }
                } 
            />
        </>
    );
}

export function AddReview({movies, setMovies}){
    return(
        <>
            <NavigationBar />
            <div className="mt-4 p-2 bg-dark text-white" style={{width:"100%", maxWidth:"720px", margin:"auto"}}>
                <h2 style={{textAlign:"center"}}>Movie Review Form</h2>
            </div>
            <AddReviewForm
                onNewReview={(name, date, actors, poster, rating) => {
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
                            body: JSON.stringify({name, date, actors, poster, rating}),
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        });
                        const body = await result.json();
                        console.log(body);
                        if (body.message == "Success"){
                            setMovies(body.movies);
                        }
                    }
                    addMovie();   
                }}
            />
        </>
    );
}