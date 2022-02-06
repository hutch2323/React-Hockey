import React, { useEffect, useState } from "react";
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

async function getGameStatus(gamePk, teams, status){
    try{
        let url = `https://statsapi.web.nhl.com/api/v1/game/${gamePk}/linescore`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        console.log(teams.away.team.name + " vs. " + teams.home.team.name + ":  " + json.currentPeriodOrdinal);
      //   console.log(json.dates[0].games);
      //   let endStatus = json.dates[0].games;
        // teams.sort(function (a, b) {
        //   if (a["name"] > b["name"]) {
        //       return 1;
        //   } else {
        //       return -1;
        //   }
      // });
        const gameStatus = json.currentPeriodOrdinal;
        return gameStatus
      } catch(e){
        return "";
      }
};

export function Movie({gamePk, gameDate, status, teams, currentPeriodOrdinal, onRemove = f => f}) {
    const [open, setOpen] = useState(true);
    // const [gameStatus, setGameStatus] = useState("");

    // useEffect(async () => {
    //     try{
    //       let url = `https://statsapi.web.nhl.com/api/v1/game/${gamePk}/linescore`;
    //       const response = await fetch(url);
    //       const json = await response.json();
    //       console.log(json);
    //       console.log(teams.away.team.name + " vs. " + teams.home.team.name + ":  " + json.currentPeriodOrdinal);
    //         setGameStatus(json.currentPeriodOrdinal);
    //     } catch(e){
    //         setGameStatus("");
    //     }
    // }, []);

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

    function checkPeriodOrdinal(){
        if ((currentPeriodOrdinal != "1st") && (currentPeriodOrdinal != "2nd") && (currentPeriodOrdinal != "3rd")){
            return (
                <p className="m-auto">{currentPeriodOrdinal}</p>
            );
        }
    }

    // let gameTime = gameDate.substring(gameDate.indexOf("T")+1, gameDate.indexOf("Z"))
    let gameTime = new Date(gameDate);
    console.log(gameTime);
    // gameTime.setTime(gameTime.getTime() + gameTime.getTimezoneOffset()*60*1000);
    console.log((gameTime.getHours()-12)+":"+gameTime.getMinutes());
    let timeString = "";
    if (gameTime.getHours() > 12){
        timeString = (gameTime.getHours()-12)+":"+gameTime.getMinutes() + " PM"
    } else if (gameTime.getHours() == 12){
        timeString = gameTime.getHours()+":"+gameTime.getMinutes() + " PM"
    } else {
        timeString = gameTime.getHours()+":"+gameTime.getMinutes() + " AM"
    }
    console.log("Game time: " + timeString);

    function checkGameStatus(){
        console.log(status.statusCode);
        // console.log(gameStatus);
        if (status.statusCode >= 5){
            return(
                <>
                    {/* <div className="col-md-9">
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
                        </div>
                    </div>
                    <div className="col-md-3 d-flex">
                        <div className="row g-0 d-flex">
                            <div className="col-md-12">
                                <p className="m-auto d-flex">Final</p>
                            </div>
                            {checkPeriodOrdinal()}
                        </div>
                    </div> */}

                    <div className="row w-100">
                        <div className="col-9 m-auto">
                            <div className="row">
                                <div className="col-10 m-auto">
                                    <p className="m-auto">{teams.away.team.name}</p>
                                </div>
                                <div className="col-2 m-auto">
                                    <p className="m-auto">{teams.away.score}</p>
                                </div>
                            </div>
                            <div className="row d-flex aligns-items-center justify-content-center">
                                <div className="col-10 m-auto">
                                    <p className="m-auto">{teams.home.team.name}</p>
                                </div>
                                <div className="col-2 m-auto">
                                    <p className="m-auto">{teams.home.score}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 m-auto">
                            <div className="row">
                                <p className="m-auto">Final</p>
                                {checkPeriodOrdinal()}
                            </div>
                        </div>
                    </div>
                   
                </>
            )
        } else if (status.statusCode >= "3"){
            return (
                <>
                    <div className="row w-100">
                        <div className="col-9 m-auto">
                            <div className="row">
                                <div className="col-10 m-auto">
                                    <p className="m-auto">{teams.away.team.name}</p>
                                </div>
                                <div className="col-2 m-auto">
                                    <p className="m-auto">{teams.away.score}</p>
                                </div>
                            </div>
                            <div className="row d-flex aligns-items-center justify-content-center">
                                <div className="col-10 m-auto">
                                    <p className="m-auto">{teams.home.team.name}</p>
                                </div>
                                <div className="col-2 m-auto">
                                    <p className="m-auto">{teams.home.score}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 m-auto">
                            <div className="row">
                                {checkPeriodOrdinal()}
                            </div>
                        </div>
                    </div>
                </>
            )
        } else{
            return (
                <>                    
                    <div className="row w-100">
                        <div className="col-9 m-auto">
                            <div className="row">
                                <div className="col-10 m-auto">
                                    <p className="m-auto">{teams.away.team.name}</p>
                                </div>
                            </div>
                            <div className="row d-flex aligns-items-center justify-content-center">
                                <div className="col-10 m-auto">
                                    <p className="m-auto">{teams.home.team.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 m-auto">
                            <div className="row">
                                {timeString}
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <Fade key={gamePk+"key"} in={open} onExited={()=>fadeInReview(gamePk)}>
                <div key={gamePk} id={`card${gamePk}`} className="m-auto text-center p-3">
                    <div id={gamePk} className="card border-dark m-auto rounded" style={{width:"350px", height:"100px", backgroundColor:"#E6E6E6", boxShadow:"0 0.5rem 1rem rgba(0,0,0,.5)"}}>
                        <div className="w-100 h-100 d-flex aligns-items-center justify-content-center">
                            {checkGameStatus()}
                        </div>
                    </div>
                </div>
            </Fade>
        </>
    )
}