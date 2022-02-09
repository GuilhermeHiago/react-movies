import React from 'react';
import { Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MovieCard = (props) => {

    function configDate(){
        let date = props.releaseDate ? props.releaseDate : ""
        let year = date.substring(0,date.search("-"))
        var rest = date.substring(date.search("-")+1,)
        let month = rest.substring(0,rest.search("-"))
        let day = rest.substring(rest.search("-")+1,)

        return day + "/" + month + "/" + year
    }

    return(
        //p-0
        <Container className='text-dark p-0 d-flex justify-content-center'> 
            <Card className='border-0 bg-light' style={{ width: '9rem' }} onClick={() => props.handleCardClick(props.movieId)}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w400${props.img}`} />
                <Card.Body className='p-1 px-0'>
                    <Card.Title className='fs-6 text'>{props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{configDate()}</Card.Subtitle>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default MovieCard;