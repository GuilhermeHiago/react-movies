import { Container, Button } from "react-bootstrap";

const FilterList = (props) => {

    function handleButtonClick(itemName){

        if(props.currentFilters.indexOf(itemName) === -1) props.onFilterClick(itemName, true)

        else props.onFilterClick(itemName, false)

    }

    return (

        <Container className="mb-4">
            {props.items.map((item, index) => <Button className={`border-0 m-1 rounded-sm text-dark ${props.currentFilters.indexOf(item) !== -1 ? "bg-warning" : "bg-light"}`} key={index} onClick={() => handleButtonClick(item)}>{item}</Button>)}
        </Container>
    )
}

export default FilterList;