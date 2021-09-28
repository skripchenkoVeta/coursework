import React from 'react';
import {Card, Col, Image} from "react-bootstrap";

import star from './../assets/star.png';
import {useHistory} from 'react-router-dom';
import {DEVICE_ROUTE} from "../utils/consts";

const DrivingSchoolItem = ({drivingschool}) => {
    const history = useHistory();
    console.log(drivingschool);
    return (
        <Col md={4} className="mt-3" onClick={() => history.push(DEVICE_ROUTE + '/' + drivingschool.id)}>
            <Card
                className="p-2"
                style={{width: 270,cursor: "pointer",height:270}}>
                <Image style={{height:"170px"}} src={process.env.REACT_APP_API_URL + drivingschool.img}/>
                <div>{drivingschool.name}</div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="text-black-70">{drivingschool && drivingschool.brand.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{drivingschool.rating}</div>
                        <Image className="ml-1" src={star} style={{width: "20px", height: "20px"}}/>
                    </div>
                </div>
                
                <div className="text-black-70">{drivingschool && drivingschool.type.name}</div>
            </Card>
        </Col>
    );
};

export default DrivingSchoolItem;
