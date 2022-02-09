import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieCard from '../MovieCard/MovieCard';

const MovieList = (props) => {

    return(
        <Container className='text-dark pb-4'>
            <Row>
                {props.movies.length > 0 ? (
                    props.movies.map(movie => <Col className='pt-4 m-0 col-xs-4 col-sm-18 col-md-4 col-lg-2' key={movie.id} xs={6} md={4}><MovieCard movieId={movie.id} img={movie.poster_path} title={movie.title} releaseDate={movie.release_date} handleCardClick={props.handleCardClick(movie.id)}></MovieCard></Col> )
                    // 'col-xs-4 col-sm-1 col-md-4 col-lg-2 pt-4 bg-primary'
                    ) 
                    : ( <div></div> )
                    // : () // else
                }
            </Row>
        </Container>
    )
}

export default MovieList;