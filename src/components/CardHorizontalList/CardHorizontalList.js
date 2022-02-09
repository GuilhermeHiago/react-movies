import { ListGroup, ListGroupItem } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";

const CardHorizontalList = (props) => {
    return(
        <ListGroup className="" horizontal>
            {props.items.map(item => <ListGroupItem> <MovieCard movieId={item.id} img={item.poster_path} title={item.title} releaseDate={item.release_date} ></MovieCard></ListGroupItem>)}
        </ListGroup>
    )
}

export default CardHorizontalList;