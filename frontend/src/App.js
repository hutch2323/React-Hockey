import './App.css';
import { Routes, Route } from "react-router-dom";
import { Home, AddReview } from './pages';
import { useState, useEffect } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState(false);

  useEffect(() => {
      fetch('/api/movies')
      .then((response) => response.json())
      .then(setMovies)
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home movies={movies} newMovie={newMovie} setNewMovie={setNewMovie} setMovies={setMovies} />}/>
        <Route path="/addReview" element={<AddReview movies={movies} newMovie={newMovie} setNewMovie={setNewMovie} setMovies={setMovies} />}/>
        {/* <Route path="/uploadFile" element={<UploadFile movies={movies} setMovies={setMovies} />}/> */}
      </Routes>
    </div> 
  );
}

export default App;
