import React, { useState } from "react";
import { FaTrash, FaStar } from "react-icons/fa"; 
import Fade from "react-bootstrap/Fade"
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"

export function MovieList({ movies = [], onRemoveMovie = f => f }){
    if (!movies.length) return <div className="pt-3">No Movie Reviews Available</div>;

    return(
        <div id="movieReviewContainer" className="mt-3" style={{display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "center"}}>
            {
                movies.map((movie, i) => {
                    return <Movie key={i} {...movie} onRemove={onRemoveMovie} />
                })
            }
        </div>
    );
}

export function Movie({name, date, actors, poster, rating, onRemove = f => f}) {
    const [open, setOpen] = useState(true);


    let stars = [];
    for(let i = 0; i < rating; i++){
        stars.push(i);
    }

    let greyStars = []
    for(let i = 0; i < ( 5  - rating ); i++){
        greyStars.push(i)
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    let releaseDate = new Date(date);


    const fadeOutReview = (evt, name) => {
        setOpen(!open);
    }

    const fadeInReview = name => {
        // this will ensure that the proceeding review will not be faded out when the currently faded element/component is removed
        
        setTimeout( () => {
            onRemove(name);
            setOpen(!open);
        }, 100);
    }

    return (
        <>
            <Fade key={name+"key"} in={open} onExited={()=>fadeInReview(name)}>
                <div key={name} id={`card${name}`} className="m-auto text-center p-3">
                    <div id={name} className="card border-dark m-auto rounded" style={{maxWidth:"540px", backgroundColor:"#E6E6E6", boxShadow:"0 0.5rem 1rem rgba(0,0,0,.5)"}}>
                        <div className="row g-0 h-100">
                            <div className="col-md-4">
                            <img id="moviePoster" className="p-3" src={poster} width="100%" height="100%" style={{margin: "auto"}}/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body h-100 w-100"  style={{position:"relative", margin:"auto"}}>
                                    <h5 className="card-title mb-0">{name}</h5>
                                    <p key={name} className="card-title">
                                        {monthNames[releaseDate.getMonth()] + " " + releaseDate.getFullYear()}
                                    </p>
                                    <p id="actors" className="p-4 card-text mb-0"><b>Actors: </b>
                                        {actors.map( (actor, i) => {
                                            if (i + 1 == actors.length){
                                                if (actors.length == 1){
                                                    return <span key={i}>{actor}</span>
                                                } else {
                                                    return <span key={i}>and {actor}</span>
                                                }
                                            } else {
                                                return <span key={i}>{actor}, </span>
                                            }
                                            // (i + 1 == actors.length) ? <>and {actor}</> : <>{actor}, </>
                                        })}
                                    </p>
                                    <div className="card-text w-100 pb-4"  style={{margin:"auto"}}>
                                        {stars.map( (star, i) => {return <FaStar key={i} color="red"/>})}
                                        {greyStars.map( (star, i) => { return <FaStar key={i} color="grey"/>})}   
                                    </div>
                                    <button id="deleteButton" onClick={evt => fadeOutReview(evt, name)}
                                        aria-controls={`card${name}`}
                                        aria-expanded={open}
                                    >
                                        <FaTrash/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        </>
    )
}