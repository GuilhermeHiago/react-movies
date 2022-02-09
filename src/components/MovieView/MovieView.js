import { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import CircleProgressBar from '../CircleProgressBar/CicleProgressBar'
import CardHorizontalList from '../CardHorizontalList/CardHorizontalList'
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';

const MovieView = (props) => {
    var api_key = '129f4b088f4bc0060eab14b4f45b9659'
    const [movieData, setMovieData] = useState([])
    const [ageRating, setAgeRating] = useState([])
    const [cast, setCast] = useState([])
    const [crew, setCrew] = useState([])

    console.log(props.movieData.poster_path)

    let title = props.movieData ? props.movieData.title : ''
    let release_date = configDate()
    let sinopse = props.movieData.overview ? props.movieData.overview : ''

    async function getAgeRating(){
        let url = `https://api.themoviedb.org/3/movie/${props.movieData.id}/release_dates?api_key=${api_key}`

        let resposta = await api.get(url)
        resposta = await resposta.data.results

        // function filterBR(obj){}

        let aux = resposta.filter(e => e.iso_3166_1 === 'BR')
        console.log("releases", resposta)
        console.log("br age: ", aux)

        setAgeRating(aux[0].release_dates[0].certification)
    }

    async function getCredits(){
        let url = props.movieData.id ? `movie/${props.movieData.id}/credits?api_key=${api_key}&language=pt-BR` : ''

        let resposta = await api.get(url)
        resposta = await resposta.data

        console.log("cast: ", resposta)
        setCast(resposta.cast)
        setCrew(resposta.crew)

        return resposta.cast
    }

    function configDate(){
        let date = props.movieData.release_date ? props.movieData.release_date : ''
        let year = date.substring(0,date.search("-"))
        var rest = date.substring(date.search("-")+1,)
        let month = rest.substring(0,rest.search("-"))
        let day = rest.substring(rest.search("-")+1,)

        return day + "/" + month + "/" + year
    }

    function getGenres(){
        let s = ''
        let aux = props.movieData.genres ? props.movieData.genres : []

        aux.map(genre => s += genre.name + ", ")
        // console.log("g enco: ", props.movieData.genres)
        
        return s.substring(0, s.length-2)
    }

    function getDuration(){
        let min = props.movieData.runtime % 60
        let hours = (props.movieData.runtime - min)/60

        return hours + "h " + min + "m"
    }

    useEffect(() => {

        getAgeRating()
        getCredits()
    },[]);

    return(
        <Container>
            {
                props.movieData ? (
                    <Row>
                        <Col>
                            <Image className="p-4" src={`https://image.tmdb.org/t/p/w500${props.movieData.poster_path}`}></Image>
                        </Col>
                        
                        <Col>
                            <h1>{title + ' (' + release_date.substring(release_date.lastIndexOf('/')+1, release_date.length) + ')'}</h1>
                            <p>{ageRating + "anos * " + release_date + " * " + getGenres() + " * " + getDuration()}</p>
                            <Container className="d-flex align-items-center p-0">
                                <CircleProgressBar value={props.movieData.vote_average * 10}></CircleProgressBar>
                                <span className="text-wrap justify-content-center ">Avaliação dos <br/>usuarios</span>
                            </Container>
                            <h3>Sinopse</h3>
                            <p>{sinopse}</p> 
                            <h3>Elenco Original</h3>
                            {/* <CardHorizontalList items={cast}></CardHorizontalList> */}
                        </Col>
                    </Row>
                ) : ''
            }
        </Container>
    )
}

export default MovieView;