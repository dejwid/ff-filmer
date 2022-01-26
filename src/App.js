import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {PacmanLoader} from "react-spinners";

function App() {
  const [loadMovies,setLoadMovies] = useState(false);
  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    if (!loadMovies) return;
    setIsLoading(true);
    axios.get('/top')
      .then(response => {
        setMovies(response.data.results);
        setIsLoading(false);
      });
  }, [loadMovies]);

  if (!loadMovies) {
    return <div>
        <button onClick={() => setLoadMovies(true)}>Hämta filmer</button>
      </div>
  }

  if (isLoading) {
    return <div>
      <PacmanLoader size={120} speedMultiplier={3} />
    </div>
  }

  if (!isLoading && movies.length > 0) {
    return <div className="movies">
      {movies.map(({poster_path,backdrop_path,title,overview,vote_average,vote_count}) => (
        <div className="movie">
          <img src={'https://image.tmdb.org/t/p/w500'+poster_path} alt="poster" className="poster"/>
          <div className="data">
            <img src={'https://image.tmdb.org/t/p/w500'+backdrop_path} alt="" className="backdrop"/>
            <h3>{title}</h3>
            <p>&#9733;&nbsp;{vote_average} ({vote_count} votes)</p>
            <p>{overview}</p>
          </div>
        </div>
      ))}
    </div>
  }

  return '';

}

export default App;
