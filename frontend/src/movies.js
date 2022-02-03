import React, { useState } from "react";
import { FaTrash, FaStar, FaVenusDouble } from "react-icons/fa"; 
import Fade from "react-bootstrap/Fade"
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"

export function MovieList({ movies = [], onRemoveMovie = f => f }){
    if (!movies.length) return <div className="pt-3">No Games Available</div>;

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

export function Movie({gamePk, status, teams, onRemove = f => f}) {
    const [open, setOpen] = useState(true);

    const colors = [[24,"#F47A38","#000000"], // Anaheim Ducks
    [53,"#8C2633", "#5F259F"], // Arizona Coyotes
    [6, "#000000", "#FFB81C"], // Boston Bruins
    [7, "#002654", "#FCB514"], // Buffalo Sabres
    [20, "#C8102E", "#F1BE48"], // Calgary Flames
    [12, "#CC0000", "#000000"], // Carolina Hurrincanes
    [16, "#CF0A2C", "#000000"], // Chicago Blackhawks
    [21, "#6F263D", "#236192"], // Colorado Avalanche
    [29, "#002654", "#CE1126"], // Columbus Blue Jackets
    [25, "#006847", "#8F8F8C"], // Dallas Stars
    [17, "#CE1126", "#FFFFFF"], // Detroit Red Wings
    [22, "#041E42", "#FF4C00"], // Edmonton Oilers
    [13, "#041E42", "#C8102E"], // Florida Panthers
    [26, "#111111", "#A2AAAD"], // LA Kings
    [30, "#A6192E", "#154734"], // Minnesota Wild
    [8, "#AF1E2D", "#192168"], // Montreal Canadiens
    [18, "#041E42", "#FFB81C"], // Nashville Predators
    [1, "#CE1126", "#000000"], // New Jersey Devils
    [2, "#00539B", "#F47D30"], // New York Islanders
    [3, "#0038A8", "#CE1126"], // New York Rangers
    [9, "#C52032", "#000000"], // Ottawa Senators
    [4, "#F74902", "#000000"], // Philadelphia Flyers
    [5, "#000000", "#FCB514"], // Pittsburgh Penguins
    [28, "#006D75", "#EA7200"], // San Jose Sharks
    [55, "#001628", "#99D9D9"], // Seattle Kraken
    [19, "#002F87", "#FCB514"], // St. Louis Blues
    [14, "#002868", "#000000"], // Tampa Bay Lightning
    [10, "#00205B", "#FFFFFF"], // Toronto Maple Leafs
    [23, "#00205B", "#041C2C"], // Vancouver Canucks
    [54, "#B4975A", "#000000"], // Vegas Golden Knights
    [15, "#041E42", "#C8102E"], // Washington Capitals
    [52, "#041E42", "#AC162C"]]; // Winnipeg Jets

    // let bgColor = "";
    // let boardColor = "";
    // for (let color of colors){
    //     if (color[0]==id){
    //         bgColor = color[1];
    //         boardColor = color[2];
    //     }
    // }


    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    // let releaseDate = new Date(date);


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
            <Fade key={gamePk+"key"} in={open} onExited={()=>fadeInReview(gamePk)}>
                <div key={gamePk} id={`card${gamePk}`} className="m-auto text-center p-3">
                <div id={gamePk} className="card border-dark m-auto rounded" style={{maxWidth:"540px", backgroundColor:"#E6E6E6", boxShadow:"0 0.5rem 1rem rgba(0,0,0,.5)"}}>
                        <div className="row g-0 h-100">
                            <div className="col-md-9">
                                <div className="row g-0 d-flex">
                                    <div className="col-md-8">
                                        <p className="mt-3">{teams.away.team.name}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="mt-3">{teams.away.score}</p>
                                    </div>
                                    <div className="col-md-8">
                                        <p>{teams.home.team.name}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p>{teams.home.score}</p>
                                    </div>
                                    {/* <img id="moviePoster" className="p-3" src={poster} width="100%" height="100%" style={{margin: "auto"}}/> */}
                                </div>
                            </div>
                            <div className="col-md-3 d-flex">
                                <p className="m-auto d-flex">Final</p>
                            </div>
                            
                            
                            {/* <div className="">
                                <div className="card-body h-100 w-100"  style={{position:"relative", margin:"auto"}}>
                                    <h5 className="card-title mb-0">{gamePk}</h5>
                                    <p key={gamePk} className="card-title">
                                        
                                    </p>
                                
                                    <div className="card-text w-100 pb-4"  style={{margin:"auto"}}>  
                                    </div>

                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </Fade>
        </>
    )
}