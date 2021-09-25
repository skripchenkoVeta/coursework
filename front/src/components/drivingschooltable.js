import React from 'react';
import {Card, Container, Image} from "react-bootstrap";
import {useHistory} from 'react-router-dom';
import {DEVICE_ROUTE} from "../utils/consts";

const DrivingSchoolTable = ({drivingschool}) => {
    const history = useHistory();
    console.log(drivingschool);
    return (
        <Container onClick={() => history.push(DEVICE_ROUTE + '/' + drivingschool.id)}>
            <td>
                <Image width={200} src={process.env.REACT_APP_API_URL + drivingschool.img}/>
                </td>
                <td width={200}>{drivingschool.name}</td>
                <td width={200}>{drivingschool.brand.name}</td>
                <td width={200}>{drivingschool.name}</td>
                <td width={200}>{drivingschool.price}</td>
                <td width={200}>{drivingschool.rating}</td>
              
  </Container>
           
    );
};

export default DrivingSchoolTable;
