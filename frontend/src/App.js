import './App.css';
import { Routes, Route } from "react-router-dom";
import { Home, AddReview } from './pages';
import { useState, useEffect } from 'react';

const getDateString = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + '-' + dd;
  return today;
}

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState(false);
  const [date, setDate] = useState(getDateString)

  useEffect(async () => {
      try{
        let url = `https://statsapi.web.nhl.com/api/v1/schedule?date=${date}`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        console.log(json.dates[0].games);
        let teams = json.dates[0].games;
        // teams.sort(function (a, b) {
        //   if (a["name"] > b["name"]) {
        //       return 1;
        //   } else {
        //       return -1;
        //   }
      // });
        setMovies(teams);
      } catch(e){
          setMovies([]);
      }
  }, [date]);

  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home date={date} setDate={setDate} movies={movies} newMovie={newMovie} setNewMovie={setNewMovie} setMovies={setMovies} />}/>
        <Route path="/addReview" element={<AddReview movies={movies} newMovie={newMovie} setNewMovie={setNewMovie} setMovies={setMovies} />}/>
        {/* <Route path="/uploadFile" element={<UploadFile movies={movies} setMovies={setMovies} />}/> */}
      </Routes>
    
    </div> 
  );
}

export default App;
