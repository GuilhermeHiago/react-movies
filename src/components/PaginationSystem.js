import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaginationSystem = (props) => {

    // let items = [];
    const [items, setItems] = useState([])

    function updateNumbers(){
      let first = 0;

      var aux = []

      if(props.active === props.numPages){
        first = props.active - 4
      }
      else if(props.active >= 3){
        first = props.active - 2

        if(props.active + 2 >= props.numPages){
          first = props.numPages - 4
        }
      }
      else if(props.active <= 2){
        first = 1
      }
    
      for (let k = first; k <= first+4; k++) {
        aux.push(
          <Pagination.Item className="border-0 bg-light" key={k} active={k === props.active} onClick={() => props.handlePagination(k)}>
            {k}
          </Pagination.Item>
        );
      }

      if(props.numPages > 1){
        aux.push(
          <Pagination.Next onClick={() => props.handlePagination(props.active + 1)} key="nextPage"/>
        );

        aux.push(
          <Pagination.Item onClick={() => props.handlePagination(props.numPages)} key="Última">Última</Pagination.Item>
        );
      }

      setItems(aux)
    }

    // updateNumbers()
    
    useEffect(() => {

      updateNumbers()
  
    }, [props.active]);

    return(
        <Pagination >{items}</Pagination>
    )
}

export default PaginationSystem;