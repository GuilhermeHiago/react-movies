import { Row, Col } from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CircleProgressBar.css'

const CircleProgressBar = (props) => {
    
    document.documentElement.style.setProperty('--first-half-percentage', props.value > 50 ? 50 : props.value)
    document.documentElement.style.setProperty('--second-half-percentage', props.value > 50 ? props.value : 0)

    return (
        <Row className="d-flex justify-content-center">
            <Col className="m-1">
                <div className="progress blue"> <span className="progress-left"> <span className="progress-bar"></span> </span> <span className="progress-right"> <span className="progress-bar"></span> </span>
                    <div className="progress-value">{props.value}%</div>
                </div>
            </Col>
        </Row>
    )
}

export default CircleProgressBar