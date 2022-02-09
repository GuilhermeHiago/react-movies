import { Container, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const FilterList = (props) => {

    const [buttonsTheme, setButtonsTheme] = useState([])

    function handleButtonClick(itemName, index){
        let aux = buttonsTheme

        if(buttonsTheme[index] === "bg-light"){
            aux[index] = "bg-warning"

            setButtonsTheme(aux)
            props.onFilterClick(itemName, true)

        }else{
            aux[index] = "bg-light"

            setButtonsTheme(aux)
            props.onFilterClick(itemName, false)

        }

    }

    useEffect( () => {
        props.items.map(item => setButtonsTheme(buttonsTheme.concat("bg-light")))
    }, [])

    return (

        <Container>
            {props.items.map((item, index) => <Button className={`border-0 m-1 rounded-sm text-dark ${buttonsTheme[index]}`} key={index} onClick={() => handleButtonClick(item, index)}>{item}</Button>)}
        </Container>
    )
}

export default FilterList;