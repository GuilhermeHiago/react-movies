import { useState, useEffect } from 'react';
import './App.css';
import { Button, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from './services/api';
import MovieList from './components/MovieList/MovieList';
import MovieView from './components/MovieView/MovieView';
import FilterList from './components/FilterList/FilterList';
import PaginationSystem from './components/PaginationSystem/PaginationSystem'

// url = https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate

function App() {
  var api_key = '129f4b088f4bc0060eab14b4f45b9659'
  const lastPage = 500
  const [numPages, setNumPages] = useState(500)
  const [currentPage, setCurrentPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [movie, setMovie] = useState([])
  const [currentMovieId, setCurrentMovieId] = useState([])
  const [isMovieView, setIsMovieView] = useState([false])
  const [filters, setFilters] = useState({})
  const [actualFilters, setActualFilters] = useState([])

  function handlePagination(pageKey){
    if(pageKey <= lastPage && pageKey <= numPages){
      setCurrentPage(pageKey)
    }
  }

  function makeGenresString(){
    var str = ''
    
    actualFilters.map(genre => str += `with_genres=${filters[genre]}&`)

    return str
  }

  async function getPopularMovies(){
    // let url = `discover/movie?api_key=${api_key}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    let url = `movie/popular?api_key=${api_key}&${makeGenresString(actualFilters)}&language=pt-BR&page=${currentPage}`

    let resposta = await api.get(url)

    setMovies(resposta.data.results)
    setNumPages(resposta.data.total_pages)
    
    return resposta
  }

  async function getMovie(){
    var movieId = 293660//634649
    let url = `movie/${movieId}?api_key=${api_key}&language=pt-BR`

    let resposta = await api.get(url)
    setMovie(resposta.data)

    return resposta
  }

  async function getGenreList(){
    let url = `genre/movie/list?api_key=${api_key}&language=pt-BR`
    let resposta = await api.get(url)

    resposta = resposta.data.genres
    let dict = {}

    resposta.map(genero => dict[genero.name] = genero.id)
    setFilters(dict)
  }

  function handleIconClick(){
    if(isMovieView){
      setIsMovieView(false)
    }
  }

  function handleCardClick(id){
    setMovie(movies.find(movie => movie.id === id))
    setIsMovieView(true)
  }

  function handleFilterClick(filterName, pressed){
    if(pressed){
      setActualFilters(actualFilters.concat([filterName]))
    }
    else{
      setActualFilters(actualFilters.filter(value => value !== filterName))
    }
  }

  // Call getPopularMovies every time that current page changes
  useEffect(() => {

    getPopularMovies()
    getMovie()

  },[currentPage, actualFilters]);

  useEffect(() => {
    getGenreList()
  }, [])

  return (
    <div className="App">
      <Nav className="NavBar">
        <svg className="navbar-brand" onClick={handleIconClick} width="185" height="24" viewBox="0 0 185 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M129.628 23.8986H172.804C174.372 23.8986 175.924 23.5898 177.373 22.9898C178.822 22.3898 180.138 21.5104 181.246 20.4017C182.355 19.2931 183.234 17.9769 183.834 16.5284C184.434 15.0799 184.743 13.5273 184.743 11.9595C184.746 10.3899 184.439 8.83517 183.84 7.38431C183.241 5.93343 182.362 4.61488 181.254 3.50407C180.145 2.39327 178.828 1.51202 177.378 0.910752C175.928 0.309484 174.374 -2.26215e-06 172.804 0L129.628 0C128.059 -2.26215e-06 126.505 0.309484 125.055 0.910752C123.605 1.51202 122.288 2.39327 121.179 3.50407C120.07 4.61488 119.191 5.93343 118.592 7.38431C117.993 8.83517 117.687 10.3899 117.689 11.9595C117.689 15.1259 118.947 18.1627 121.186 20.4017C123.425 22.6408 126.462 23.8986 129.628 23.8986ZM6.82432 23.9324H12.0946V4.67568H18.9189V0H0V4.66216H6.82432V23.9324ZM25.8108 23.9324H31.0811V5.57432H31.1486L37.1959 23.9189H41.25L47.5 5.57432H47.5676V23.9189H52.8378V0H44.8986L39.3581 15.6081H39.2905L33.7838 0H25.8108V23.9324ZM60.2297 0.0810811H68.1351C69.9756 0.0839098 71.8089 0.310804 73.5946 0.756757C75.2207 1.14253 76.7531 1.85015 78.1013 2.83784C79.4053 3.8183 80.455 5.09735 81.1622 6.56757C81.9616 8.31429 82.3477 10.2218 82.2905 12.1419C82.3271 13.9108 81.9524 15.6641 81.1959 17.2635C80.4916 18.7028 79.4816 19.971 78.2365 20.9797C76.9621 22.0016 75.5065 22.774 73.9459 23.2568C72.2965 23.7805 70.5752 24.0427 68.8446 24.0338H60.2297V0.0810811ZM65.5 19.1351H68.2027C69.3394 19.1429 70.4732 19.0182 71.5811 18.7635C72.5696 18.5629 73.5045 18.1553 74.3243 17.5676C75.1068 16.9754 75.7292 16.1974 76.1351 15.3041C76.6096 14.2234 76.8402 13.0515 76.8108 11.8716C76.8309 10.8144 76.5993 9.76762 76.1351 8.81757C75.7137 7.97564 75.106 7.24082 74.3581 6.66892C73.5809 6.09166 72.7035 5.66328 71.7703 5.40541C70.7411 5.11761 69.6768 4.97435 68.6081 4.97973H65.5V19.1351ZM89.9257 0.0810811H98.8446C99.8913 0.0815914 100.937 0.156101 101.973 0.304054C102.956 0.431393 103.909 0.728608 104.791 1.18243C105.614 1.60955 106.312 2.24276 106.818 3.02027C107.378 3.96905 107.648 5.06142 107.595 6.16216C107.641 7.38791 107.24 8.58865 106.466 9.54054C105.677 10.4551 104.636 11.1177 103.473 11.4459V11.4865C104.221 11.5933 104.947 11.8215 105.622 12.1622C106.245 12.475 106.806 12.8986 107.277 13.4122C107.744 13.9265 108.105 14.5281 108.338 15.1824C108.589 15.8753 108.715 16.6075 108.709 17.3446C108.75 18.4548 108.468 19.553 107.899 20.5068C107.369 21.3369 106.651 22.0312 105.804 22.5338C104.914 23.0684 103.938 23.4455 102.919 23.6486C101.869 23.8739 100.797 23.9871 99.723 23.9865H89.9257V0.0810811ZM95.1959 9.64189H99.0135C99.4183 9.6441 99.822 9.59874 100.216 9.50676C100.593 9.42489 100.952 9.27614 101.277 9.06757C101.594 8.86338 101.856 8.58507 102.041 8.25676C102.238 7.88263 102.336 7.46364 102.324 7.04054C102.346 6.61052 102.243 6.18342 102.027 5.81081C101.817 5.49153 101.532 5.2292 101.196 5.0473C100.819 4.85826 100.416 4.72835 100 4.66216C99.5881 4.58251 99.1696 4.54179 98.75 4.54054H95.1689L95.1959 9.64189ZM95.1959 19.5405H99.9257C100.342 19.5417 100.756 19.4963 101.162 19.4054C101.566 19.3229 101.949 19.1622 102.291 18.9324C102.631 18.7075 102.916 18.4069 103.122 18.0541C103.344 17.6512 103.453 17.1962 103.439 16.7365C103.457 16.2515 103.309 15.7749 103.02 15.3851C102.737 15.0344 102.37 14.7603 101.953 14.5878C101.52 14.4075 101.066 14.2826 100.601 14.2162C100.142 14.1511 99.6797 14.1172 99.2162 14.1149H95.2297L95.1959 19.5405Z" fill="white"/>
</svg>
      </Nav>

      <header className="App-header text-wrap">
        <p className='header-text text-wrap'>
          Milhões de filmes, séries e pessoas para descobrir. Explore já.
        </p>

        {
          isMovieView === true ? (
            <MovieView movieData={movie}></MovieView>
          ) : (
            <FilterList items={Object.keys(filters)} onFilterClick={handleFilterClick}></FilterList>
          )
        }

      </header>

      {
        isMovieView === true ? (
          ''
        ) : (
          <MovieList movies={movies} handleCardClick={() => handleCardClick}></MovieList>
        )
      }

      {
        isMovieView === true ? (""
        ) : (
          <PaginationSystem handlePagination={handlePagination} active={currentPage} numPages={lastPage}></PaginationSystem>
        )
      }

    </div>
  );
}

export default App;
